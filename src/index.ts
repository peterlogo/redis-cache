import redis from 'redis';
export class Cache {
  client: redis.RedisClient;
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      throw error;
    });
  }
}
