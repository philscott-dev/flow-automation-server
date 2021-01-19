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

  @Field(() => [ID])
  @Column({ type: 'simple-array' })
  parentIds!: string[]

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

// const param = {
//   name: 'ipAddress',
//   type: 'string',
//   fieldType: null,
//   options: [
//     {
//       id: 1,
//       value: '1.1.1.1',
//       default: 'always' | 'initial',
//     },
//   ],
// }

/**
 * since field type is null, i can assume it's just an <input />,
 * I'd always check options no matter what, and now you could keep your
 * Model pretty small for what a Param is
 */
