import { Field, ID, InputType } from 'type-graphql'
import { WorkflowNode } from '../entities'

@InputType({ description: 'Create Workflow Node' })
export default class AddWorkflowNodeInput implements Partial<WorkflowNode> {
  @Field(() => ID)
  workflowId!: string

  @Field()
  name!: string

  @Field()
  displayName!: string

  @Field({ nullable: true })
  description!: string

  @Field()
  x!: number

  @Field()
  y!: number

  @Field()
  width!: number

  @Field()
  height!: number

  @Field()
  colorPrimary!: string

  @Field()
  colorSecondary!: string
}
