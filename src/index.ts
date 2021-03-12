import { IRedisCacheService, ICacheConfig, ICacheClient } from './typings';
import redis from 'redis';

/**
 * Redis-Cache class
 * @class
 */
export default class Cache implements IRedisCacheService {
  client: ICacheClient;
  config: ICacheConfig;
  constructor(options: ICacheConfig = {}) {
    this.config = options;
    this.client = redis.createClient(this.config);
  }

  /**
   * Creates a redis client connection,
   * with a live redis-server.
   * @method
   */
  on(): ICacheClient {
    return this.client.on('error', function (error) {
      throw error;
    });
  }

  /**
   * Stores a value with its key
   * in redis.
   * @method
   * @param key
   * @param value
   */
  set(key: string, value: string, exp?: number): Promise<string | undefined> {
    if (exp) {
      return new Promise((resolve, reject) => {
        this.client.set(key, value, 'EX', exp, function (err, reply) {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      });
    } else {
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

  /**
   * Gets a value with its key.
   * @method
   * @param key
   */
  get(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.client.get(key, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}
