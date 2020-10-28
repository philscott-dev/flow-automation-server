import { Field, ID, InputType } from 'type-graphql'
import { WorkflowNode } from '../entities'

@InputType({ description: 'Create Workflow Node' })
export default class WorkflowNodePositionInput
  implements Partial<WorkflowNode> {
  @Field(() => ID)
  workflowId!: number

  @Field(() => ID)
  id!: number

  @Field()
  x!: number

  @Field()
  y!: number
}
