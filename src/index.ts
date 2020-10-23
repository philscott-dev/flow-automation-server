// src/index.ts

import 'reflect-metadata'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { WorkflowResolver } from './resolver'
import typeOrmOptions from './db.config'

TypeORM.useContainer(Container)

async function main() {
  await TypeORM.createConnection(typeOrmOptions)
  const schema = await buildSchema({
    resolvers: [WorkflowResolver],
    container: Container,
  })
  const server = new ApolloServer({ schema, context: () => {} })
  await server.listen(4000)
  console.log('Server has started! Listening on 4000')
}

main()
