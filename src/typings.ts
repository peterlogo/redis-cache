import { RedisClient } from 'redis';

/**
 * Redis-Cache Config type definitions.
 * @interface
 */
export interface IRedisCacheConfig {
  host?: string;
  port?: number;
  ttl?: number;
}

/**
 * Redis-Cache type definitions.
 * @interface
 */
export interface IRedisCacheService {
  on: () => RedisClient;
  set: (key: string, value: string) => Promise<string>;
}
