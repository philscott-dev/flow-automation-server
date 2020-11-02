import { PubSubEngine } from 'graphql-subscriptions'
import { DeleteResult, Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { WorkflowNode, Workflow } from '../entities'
import { WorkflowInput, WorkflowNodeInput } from '../input'
import { ErrorInterceptor } from '../middleware/ErrorInterceptor'
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  PubSub,
  Subscription,
  UseMiddleware,
} from 'type-graphql'
import WorkflowNodePositionInput from '../input/WorkflowNodePositionInput'
import WorkflowNodeParentInput from '../input/WorkflowNodeParentInput'

@Resolver(Workflow)
export default class WorkflowResolver {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepo: Repository<Workflow>,

    @InjectRepository(WorkflowNode)
    private readonly workflowNodeRepo: Repository<WorkflowNode>,
  ) {}

  /**
   * Queries
   */

  @Query(() => Workflow)
  @UseMiddleware(ErrorInterceptor)
  async workflow(@Arg('id') id: number): Promise<Workflow> {
    const workflow = await this.workflowRepo.findOne(id, {
      relations: ['workflowNodes'],
    })
    if (!workflow) {
      throw new Error('invalid workflow ID')
    }
    return workflow
  }

  @Query(() => [Workflow])
  @UseMiddleware(ErrorInterceptor)
  workflows(): Promise<Workflow[]> {
    return this.workflowRepo.find()
  }

  /**
   * Mutations
   */

  @Mutation(() => Workflow)
  @UseMiddleware(ErrorInterceptor)
  addWorkflow(@Arg('input') workflowInput: WorkflowInput): Promise<Workflow> {
    const workflow = this.workflowRepo.create({ ...workflowInput })
    return this.workflowRepo.save(workflow)
  }

  @Mutation(() => WorkflowNode)
  @UseMiddleware(ErrorInterceptor)
  async addWorkflowNode(
    @Arg('input') workflowNodeInput: WorkflowNodeInput,
  ): Promise<WorkflowNode> {
    const { workflowId, ...node } = workflowNodeInput
    const workflow = await this.workflowRepo.findOne(workflowId, {
      relations: ['workflowNodes'],
    })

    if (!workflow) {
      throw new Error('invalid workflow ID')
    }

    const newNode = this.workflowNodeRepo.create({
      workflow,
      workflowId,
      ...node,
    })

    if (workflow.workflowNodes) {
      workflow.workflowNodes.push(newNode)
    } else {
      workflow.workflowNodes = [newNode]
    }

    await this.workflowRepo.save(workflow)
    return newNode
  }

  // update position
  @Mutation(() => WorkflowNode)
  @UseMiddleware(ErrorInterceptor)
  async updateWorkflowNodePosition(
    @Arg('input') workflowNodePositionInput: WorkflowNodePositionInput,
  ): Promise<WorkflowNode> {
    const { workflowId, id, x, y } = workflowNodePositionInput

    const workflow = await this.workflowRepo.findOne(workflowId, {
      relations: ['workflowNodes'],
    })

    if (!workflow) {
      throw new Error('invalid workflow ID')
    }

    const { workflowNodes } = workflow
    let index = undefined
    const node = workflowNodes.find((node, i) => {
      index = i
      // TODO: bug fix needed. one of these is a number for some reason
      return String(node.id) === String(id)
    })

    if (!node || index == undefined) {
      throw new Error('invalid Node ID')
    }

    node.x = x
    node.y = y

    workflow.workflowNodes = [
      ...workflowNodes.slice(0, index),
      node,
      ...workflowNodes.slice(index + 1),
    ]

    await this.workflowRepo.save(workflow)
    return node
  }

  // parentId connector
  @Mutation(() => WorkflowNode)
  @UseMiddleware(ErrorInterceptor)
  async updateWorkflowNodeParent(
    @Arg('input') workflowNodeParentInput: WorkflowNodeParentInput,
  ): Promise<WorkflowNode> {
    const { workflowId, id } = workflowNodeParentInput

    const workflow = await this.workflowRepo.findOne(workflowId, {
      relations: ['workflowNodes'],
    })

    if (!workflow) {
      throw new Error('invalid workflow ID')
    }

    const { workflowNodes } = workflow
    let index = undefined
    const node = workflowNodes.find((node, i) => {
      index = i
      return String(node.id) === String(id)
    })

    if (!node || index == undefined) {
      throw new Error('invalid Node ID')
    }

    if (workflowNodeParentInput.parentId) {
      console.log(id, workflowNodeParentInput.parentId)
    }
    node.parentId = workflowNodeParentInput.parentId

    workflow.workflowNodes = [
      ...workflowNodes.slice(0, index),
      node,
      ...workflowNodes.slice(index + 1),
    ]

    await this.workflowRepo.save(workflow)
    return node
  }

  // Delete Workflow
  @Mutation(() => Workflow)
  @UseMiddleware(ErrorInterceptor)
  async deleteWorkflow(@Arg('id') id: number): Promise<DeleteResult> {
    return this.workflowRepo.delete(id)
  }

  // Delete Node
  @Mutation(() => WorkflowNode)
  @UseMiddleware(ErrorInterceptor)
  async deleteWorkflowNode(@Arg('id') id: number): Promise<WorkflowNode> {
    const deleteNode = await this.workflowNodeRepo.findOne(id)

    if (!deleteNode) {
      throw new Error('invalid Node ID')
    }

    const nodes = await this.workflowNodeRepo.find({
      where: [{ parentId: deleteNode.id }],
    })

    nodes.forEach((n) => (n.parentId = undefined))
    await this.workflowNodeRepo.save(nodes)

    await this.workflowNodeRepo.delete(id)
    return deleteNode
  }

  /**
   * Subscriptions
   */

  @Mutation(() => Boolean)
  async pubSubMutation(@PubSub() pubSub: PubSubEngine): Promise<boolean> {
    await pubSub.publish('NOTIFICATIONS', { message: 'connected' })
    return true
  }

  @Subscription(() => Boolean, {
    topics: 'JOB_COMPLETE',
  })
  workflowJobComplete() {
    return true
  }
}
