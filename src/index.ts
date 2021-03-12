import { IRedisCacheService, IRedisCacheConfig } from './typings';
import redis from 'redis';

/**
 * Redis-Cache class
 * @class
 */
export class Cache implements IRedisCacheService {
  client: redis.RedisClient;
  config: IRedisCacheConfig | redis.ClientOpts;
  constructor() {
    this.config = {};
    this.client = redis.createClient(this.config);
  }

  /**
   * Creates a redis client connection,
   * with a live redis-server.
   * @method
   */
  on(): redis.RedisClient {
    return this.client.on('error', function (error) {
      throw error;
    });
  }

  /**
   * Stores a value with its key
   * in redis
   * @method
   * @param key
   * @param value
   */
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
