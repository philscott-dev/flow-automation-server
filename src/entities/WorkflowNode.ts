import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  RelationId,
} from 'typeorm'
import { ObjectType, Field, ID, Float } from 'type-graphql'
import Workflow from './Workflow'

@Entity('workflowNode')
@ObjectType()
export default class WorkflowNode extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: string

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  parentId?: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  displayName!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field()
  @Column()
  colorPrimary!: string

  @Field()
  @Column()
  colorSecondary!: string

  @Field(() => Float)
  @Column({ type: 'float' })
  x!: number

  @Field(() => Float)
  @Column({ type: 'float' })
  y!: number

  @Field(() => Float)
  @Column()
  width!: number

  @Field(() => Float)
  @Column()
  height!: number

  @Field()
  @CreateDateColumn()
  createdDate!: Date

  @Field()
  @UpdateDateColumn()
  updatedDate!: Date

  /**
   * Relationships
   */

  @ManyToOne(() => Workflow)
  workflow!: Workflow
  @RelationId((workflowNode: WorkflowNode) => workflowNode.workflow)
  workflowId!: string
}
