import { ClientOpts, RedisClient } from 'redis';

/**
 * Redis-Cache Config type definition.
 * @type
 */
export type ICacheConfig = ClientOpts;

/**
 * Redis-Client type definition.
 */
export type ICacheClient = RedisClient;

/**
 * Redis-Cache type definitions.
 * @interface
 */
export interface IRedisCacheService {
  on: () => ICacheClient;
  checkTime: (key: string) => Promise<number | undefined>;
  set: (key: string, value: string, exp?: number) => Promise<string | undefined>;
  get: (key: string) => Promise<string | null>;
  //multiSet: (keys: string[]) => Promise<string | undefined>;
}
