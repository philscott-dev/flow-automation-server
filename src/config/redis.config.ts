import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

export const options: Redis.RedisOptions = {
  host: 'localhost',
  port: 6379,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}
export const pubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})
