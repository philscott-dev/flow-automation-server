import { Field, ID, InputType } from 'type-graphql'
import { WorkflowNode } from '../entities'

@InputType({ description: 'Workflow Node connector' })
export default class WorkflowNodeParentInput implements Partial<WorkflowNode> {
  @Field(() => ID)
  workflowId!: string

  @Field(() => ID, { nullable: true })
  parentId?: string

  @Field(() => ID)
  id!: string
}
