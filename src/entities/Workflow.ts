import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import WorkflowNode from './WorkflowNode'

@Entity('workflow')
@ObjectType()
export default class Workflow extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: string

  @Field({ description: 'The title of the workflow.' })
  @Column({ nullable: false })
  title!: string

  @Field({ description: 'Short summary of the workflow.' })
  @Column({ nullable: false })
  description!: string

  @Field({
    nullable: true,
    description: 'Node ID that the workflow starts on.',
  })
  @Column({ nullable: true })
  startId?: string

  @Field({
    nullable: true,
    description: 'Node ID that the workflow terminates on.',
  })
  @Column({ nullable: true })
  endId?: string

  @Field({ description: 'Date the workflow was created.' })
  @CreateDateColumn()
  createdDate!: Date

  @Field({ description: 'Date the workflow was last updated.' })
  @UpdateDateColumn()
  updatedDate!: Date

  /**
   * Relationships
   */

  @Field(() => [WorkflowNode], {
    description: 'List of  Workflow Nodes in the workflow.',
    nullable: false,
  })
  @OneToMany(() => WorkflowNode, (workflowNode) => workflowNode.workflow, {
    cascade: true,
  })
  workflowNodes!: WorkflowNode[]
}
