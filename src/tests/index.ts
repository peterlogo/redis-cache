import * as chai from 'chai';
import { Cache } from './../index';

const assert = chai.assert;

describe('Cache Object', () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
    cache.on();
  });

  describe('Properties', () => {
    it('should have `config` property', () => {
      assert.property(cache, 'config');
    });

    it('should have `client` property', () => {
      assert.property(cache, 'client');
    });
  });

  describe('Connection', () => {
    it('should connect to `redis-server`', () => {
      assert.isOk(cache);
    });
  });

  describe('Set-Method', () => {
    it('should return `OK`', async () => {
      const res = await cache.set('Key1', 'Hello');
      assert.equal(res, 'OK');
    });
  });
});
