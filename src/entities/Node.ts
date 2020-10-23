import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity()
@ObjectType()
export default class Node extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string

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
}
