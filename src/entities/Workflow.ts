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
import { Lazy } from '../helpers/lazy'
import Node from './Node'

@Entity()
@ObjectType()
export default class WorkFlow extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string

  @Field({ description: 'The title of the workflow.' })
  @Column({ nullable: false })
  title!: string

  @Field({ description: 'Short summary of the workflow.' })
  @Column({ nullable: false })
  description!: string

  @Field({ description: 'Node ID that the workflow starts on.' })
  @Column()
  startId?: string

  @Field({ description: 'Node ID that the workflow terminates on.' })
  @Column()
  endId?: string

  @Field(() => [Node], { description: 'List of Nodes in the workflow.' })
  @OneToMany(() => Node, (node) => node.id, { lazy: true })
  nodes!: Lazy<Node[]>

  @Field({ description: 'Date the workflow was created.' })
  @CreateDateColumn()
  createdDate!: Date

  @Field({ description: 'Date the workflow was last updated.' })
  @UpdateDateColumn()
  updatedDate!: Date
}
