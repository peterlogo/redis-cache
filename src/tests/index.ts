import * as chai from 'chai';
import Cache from './../index';

const assert = chai.assert;

describe('Cache Object', () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
    cache.on();
  });

  describe('Properties', () => {
    it('should have `config` property.', () => {
      assert.property(cache, 'config');
    });

    it('should have `client` property.', () => {
      assert.property(cache, 'client');
    });
  });

  describe('Connection', () => {
    it('should connect to `redis-server`.', () => {
      assert.isOk(cache);
    });
  });

  describe('Set-Method', () => {
    it('should return `OK` when value is saved.', async () => {
      const res = await cache.set('Key1', 'Hello');
      assert.equal(res, 'OK');
    });
    it('should expire after `10 seconds`.', async () => {
      await cache.set('Key3', 'Peter', 10);
      setTimeout(async () => {
        const res = await cache.get('Key3');
        assert.isNull(res);
      }, 10000);
    });
  });

  describe('Get-Method', () => {
    it('should return `value` of the given key.', async () => {
      const value = await cache.get('Key1');
      assert.equal(value, 'Hello');
    });
    it('should return `null` for an invalid key.', async () => {
      const value = await cache.get('Key2');
      assert.isNull(value);
    });
  });
});

// describe('Cache Configuration', () => {
//   let cache: Cache;

//   beforeEach(() => {
//     cache = new Cache({ port: 8080 });
//   });

//   it('should update default `port number`', () => {
//     assert.isDefined(cache.client);
//   });
// });
