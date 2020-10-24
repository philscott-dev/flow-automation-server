// src/index.ts

import 'reflect-metadata'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { pubSub } from './config/redis.config'
import { WorkflowResolver } from './resolver'
import typeOrmOptions from './config/db.config'

TypeORM.useContainer(Container)

async function main() {
  await TypeORM.createConnection(typeOrmOptions)
  const schema = await buildSchema({
    resolvers: [WorkflowResolver],
    container: Container,
    pubSub,
  })
  const server = new ApolloServer({
    schema,
    context: () => {},
    subscriptions: {
      onConnect: (connectionParams) => {
        console.log('ws: connected', connectionParams)
      },
      onDisconnect: () => {
        console.log('ws: disconnected')
      },
    },
  })
  const { url, subscriptionsUrl } = await server.listen(4000)
  console.log(
    `Server is running, GraphQL Playground available at ${url} & subscriptions at ${subscriptionsUrl}`,
  )
}

main()
