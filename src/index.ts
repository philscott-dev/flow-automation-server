// src/index.ts

import 'reflect-metadata'
import * as TypeORM from 'typeorm'
import { Container } from 'typedi'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { redisOptions } from './config/redis.config'
import { WorkflowResolver } from './resolver'
import typeOrmOptions from './config/db.config'
import Redis from 'ioredis'

TypeORM.useContainer(Container)

async function main() {
  await TypeORM.createConnection(typeOrmOptions)

  const schema = await buildSchema({
    resolvers: [WorkflowResolver],
    globalMiddlewares: [],
    container: Container,
    pubSub: new RedisPubSub({
      publisher: new Redis(redisOptions),
      subscriber: new Redis(redisOptions),
    }),
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
