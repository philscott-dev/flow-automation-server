import { Resolver, Query, Arg, Mutation } from 'type-graphql'
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
  workflow(@Arg('id') id: string) {
    return this.workflowRepo.findOne(id)
  }

  @Query(() => [Workflow])
  workflows(): Promise<Workflow[]> {
    return this.workflowRepo.find()
  }
}
