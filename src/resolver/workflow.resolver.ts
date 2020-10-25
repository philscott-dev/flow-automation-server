import { PubSubEngine } from 'graphql-subscriptions'
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  PubSub,
  Subscription,
} from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Workflow } from '../entities'
import { WorkflowInput } from '../input'

@Resolver(Workflow)
export default class WorkflowResolver {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepo: Repository<Workflow>,
  ) {}

  @Mutation(() => Workflow)
  addWorkflow(
    @Arg('workflow') workflowInput: WorkflowInput,
  ): Promise<Workflow> {
    const workflow = this.workflowRepo.create({ ...workflowInput })
    return this.workflowRepo.save(workflow)
  }

  @Query(() => Workflow)
  async workflow(@Arg('id') id: string): Promise<Workflow | undefined> {
    return this.workflowRepo.findOne(id)
  }

  @Query(() => [Workflow])
  workflows(): Promise<Workflow[]> {
    return this.workflowRepo.find()
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
