import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Lazy } from '../helpers/lazy'
import Workflow from './Workflow'

@Entity()
@ObjectType()
export default class Node extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id!: string

  @Field()
  @Column()
  parentId?: string

  @Field()
  @Column()
  title!: string

  @Field()
  @CreateDateColumn()
  createdDate!: Date

  @Field()
  @UpdateDateColumn()
  updatedDate!: Date

  @ManyToOne(() => Workflow, { lazy: true })
  workflow!: Lazy<Workflow>
}
