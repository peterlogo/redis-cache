import * as chai from 'chai';
import { Cache } from './../index';

const assert = chai.assert;

describe('Cache Class', () => {
  it('should have a client property', () => {
    const myCache = new Cache();
    assert.property(myCache, 'client');
  });
});
