import { Field, InputType } from 'type-graphql'
import { MaxLength, Length } from 'class-validator'
import { Workflow } from '../entities'

@InputType({ description: 'Initial workflow' })
export default class AddWorkflowInput implements Partial<Workflow> {
  @Field()
  @MaxLength(30)
  title!: string

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string
}
