import { IRedisCacheService, IRedisCacheConfig } from './typings';
import redis from 'redis';

/**
 * Redis-Cache class
 * @class
 */
export class Cache implements IRedisCacheService {
  client: redis.RedisClient;
  config: IRedisCacheConfig;
  constructor() {
    this.config = {};
    this.client = redis.createClient(this.config);
  }

  on(): redis.RedisClient {
    return this.client.on('error', function (error) {
      throw error;
    });
  }

  set(key: string, value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}
