import { RedisOptions } from 'ioredis'

export const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000)
  },
}
