import { Field, InputType } from 'type-graphql'
import { MaxLength } from 'class-validator'
import { Workflow } from '../entities'

@InputType({ description: 'Initial workflow' })
export default class AddWorkflowInput implements Partial<Workflow> {
  @Field()
  @MaxLength(30)
  title!: string

  @Field({ nullable: true })
  @MaxLength(255)
  description!: string
}
