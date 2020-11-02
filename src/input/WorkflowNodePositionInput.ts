import { Field, ID, InputType } from 'type-graphql'
import { WorkflowNode } from '../entities'

@InputType({ description: 'Create Workflow Node' })
export default class WorkflowNodePositionInput
  implements Partial<WorkflowNode> {
  @Field(() => ID)
  workflowId!: string

  @Field(() => ID)
  id!: string

  @Field()
  x!: number

  @Field()
  y!: number
}
