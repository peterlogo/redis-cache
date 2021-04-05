import * as chai from 'chai';
import * as sinon from 'sinon';
import sinonTest from 'sinon-test';
import Cache from '../index';

const { assert, expect } = chai;
const test = sinonTest(sinon);

describe('Cache Object:', () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
    cache.on();
  });

  describe('Properties', () => {
    it('should have `config` property.', () => {
      expect(cache).to.have.property('config');
    });

    it('should have `client` property.', () => {
      expect(cache).to.have.property('client');
    });
  });

  describe('Connection', () => {
    it(
      'should connect to `redis-server`.',
      test(() => {
        const on = sinon.stub(cache, 'on');
        expect(on).to.not.throw();
      })
    );
  });

  describe('Set-Method', () => {
    it(
      'should return `OK` when value is saved.',
      test(async () => {
        const set = sinon.stub(cache, 'set').resolves('OK');
        const res = await cache.set('Key1', 'Hello');

        sinon.assert.calledWith(set, 'Key1', 'Hello');
        sinon.assert.calledOnce(set);
        expect(res).to.equal('OK');
      })
    );
  });

  describe('CheckTime-Method', () => {
    it('should expire after `10 seconds`.', async () => {
      await cache.set('Key3', 'Peter', 10);
      setTimeout(async () => {
        const res = await cache.get('Key3');
        assert.isNull(res);
      }, 10000);
    });
    it('should return the `time left` before expiring.', async () => {
      await cache.set('Key3', 'Logo', 10);
      setTimeout(async () => {
        const timeLeft = await cache.checkTime('Key3');
        assert.isNumber(timeLeft);
      }, 5000);
    });
    it('should return `-2` for non-existing key.', async () => {
      const timeLeft = await cache.checkTime('Key5');
      assert.equal(timeLeft, -2);
    });
  });

  describe('Get-Method', () => {
    it('should return `value` of the given key.', async () => {
      await cache.set('Key1', 'Hello');
      const value = await cache.get('Key1');
      assert.equal(value, 'Hello');
    });
    it('should return `null` for an invalid key.', async () => {
      const value = await cache.get('Key2');
      assert.isNull(value);
    });
  });

  describe('Del-Method', () => {
    it('should return `1` after deleting a key.', async () => {
      await cache.set('myKey', 'Peter');
      const res = await cache.del('myKey');
      assert.equal(res, 1);
    });
    it('should return `null` for trying to get a deleted key.', async () => {
      const res = await cache.get('myKey');
      assert.equal(res, null);
    });
  });

  describe('MultiSet-Method', () => {
    it('should return `OK` when keys and values are saved.', async () => {
      const keys = [
        { key: 'myKey', value: 'San' },
        { key: 'myNextKey', value: 'Paul' },
        { key: 'myLastKey', value: 'Magaret' }
      ];
      const res = await cache.multiSet(keys);
      assert.equal(res, 'OK');
    });
    it('should return the value:`San` with given key:`myKey`.', async () => {
      const value = await cache.get('myKey');
      assert.equal(value, 'San');
    });
    it('should return the value:`Paul` with given key:`myNextKey`.', async () => {
      const value = await cache.get('myNextKey');
      assert.equal(value, 'Paul');
    });
    it('should return the value:`Magaret` with given key:`myLastKey`.', async () => {
      const value = await cache.get('myLastKey');
      assert.equal(value, 'Magaret');
    });
  });

  describe('MultiGet-Method', () => {
    it('should return an `array of values` of each respective key.', async () => {
      const keys = ['myKey', 'myNextKey'];
      const actual = await cache.multiGet(keys);
      assert.isArray(actual);
    });
  });

  describe('MultiDel-Method', () => {
    it('should return `number of deleted keys` after deleting the keys.', async () => {
      const keys = ['myKey', 'myNextKey'];
      const res = await cache.multiDel(keys);
      assert.equal(res, keys.length);
    });
  });
});
