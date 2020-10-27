import { PubSubEngine } from 'graphql-subscriptions'
import { Repository } from 'typeorm'
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

    console.log(workflow)
    await this.workflowRepo.save(workflow)
    return newNode
  }

  @Mutation(() => WorkflowNode)
  @UseMiddleware(ErrorInterceptor)
  async updateWorkflowNode(
    @Arg('input') workflowNodeInput: WorkflowNodeInput,
  ): Promise<WorkflowNode> {
    const { workflowId, ...node } = workflowNodeInput
    const workflow = await this.workflowRepo.findOne(workflowId, {
      relations: ['workflowNodes'],
    })

    if (!workflow) {
      throw new Error('invalid workflow ID')
    }

    const newNode = this.workflowNodeRepo.create({ ...node, workflow })
    workflow.workflowNodes?.push(newNode)

    await this.workflowRepo.save(newNode)
    return newNode
  }

  /**
   * Testing Subscriptions
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
