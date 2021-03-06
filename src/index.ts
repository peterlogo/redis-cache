import { checkFormat, convertToArray, toJson } from './utils';
import { IRedisCacheService, ICacheConfig, ICacheClient, ICacheProp } from './typings';
import redis from 'redis';

/**
 * Redis-Cache class
 * @class
 */
class Cache implements IRedisCacheService {
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
   * Checks the remaining time left for a key,
   * with an expiry time.
   * @method
   * @param key
   */
  checkTime(key: string): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this.client.ttl(key, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Stores a value with its key
   * in redis.
   * @method
   * @param key
   * @param value
   */
  set(key: string, value: string | Record<string, unknown>, exp?: number): Promise<string | undefined> {
    const data = toJson(value);
    if (exp) {
      return new Promise((resolve, reject) => {
        this.client.set(key, data, 'EX', exp, function (err, reply) {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.client.set(key, data, function (err, reply) {
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
  get(key: string): Promise<string | Record<string, unknown> | null> {
    return new Promise((resolve, reject) => {
      this.client.get(key, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          const data = checkFormat(reply);
          resolve(data);
        }
      });
    });
  }

  /**
   * Deletes a key from redis.
   * @param key
   */
  del(key: string): Promise<string | number> {
    return new Promise((resolve, reject) => {
      this.client.del(key, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Stores multiple keys and values in redis.
   * @method
   * @param items
   */
  multiSet(items: ICacheProp[]): Promise<string | boolean> {
    return new Promise((resolve, reject) => {
      const data = convertToArray(items);
      this.client.mset(data, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Gets values of multiple keys from
   * redis.
   * @method
   * @param keys
   */
  multiGet(keys: string[]): Promise<string | string[]> {
    return new Promise((resolve, reject) => {
      this.client.mget(keys, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  /**
   * Deletes multiple keys from
   * redis.
   * @method
   * @param keys
   */
  multiDel(keys: string[]): Promise<string | number> {
    return new Promise((resolve, reject) => {
      this.client.del(keys, function (err, reply) {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

export default Cache;
