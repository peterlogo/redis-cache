import * as chai from 'chai';
import { checkFormat, convertToArray, isJson, multiCheckFormat, toJson } from '../utils';
const expect = chai.expect;

describe('Utility Functions:', () => {
  describe('IsJson function', () => {
    it('should return `true` if string is a valid JSON string.', () => {
      const json = '{"key":true, "value":42}';
      const result = isJson(json);
      expect(result).to.equal(true);
    });
    it('should return `false` if string is not a valid JSON string.', () => {
      const json = '{key:true, value:42}';
      const result = isJson(json);
      expect(result).to.equal(false);
    });
  });

  describe('ToJson function', () => {
    it('should return a `string` if value is a string.', () => {
      const actual = toJson('Hello');
      const expected = 'Hello';
      expect(actual).to.be.equal(expected);
    });
    it('should return a `JSON string` if value is an object.', () => {
      const value = { key: true, value: 42 };
      const actual = toJson(value);
      const expected = JSON.stringify(value);
      expect(actual).to.be.equal(expected);
    });
  });

  describe('CheckFormat function', () => {
    it('should return the `string value` if value is a string.', () => {
      const data = 'Hello';
      const result = checkFormat(data);
      expect(result).to.equal(data);
    });
    it('should return an `object` if value is a JSON string.', () => {
      const data = '{"key":true, "value":42}';
      const actual = checkFormat(data);
      const expected = { key: true, value: 42 };
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('MultiCheckFormat function', () => {
    it('should return the correct data format.', () => {
      const data = ['Hello', '{"key":true, "value":42}'];
      const actual = multiCheckFormat(data);
      const expected = ['Hello', { key: true, value: 42 }];
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('ConvertToArray function', () => {
    it('should return an `array of strings`.', () => {
      const obj = { name: 'My name', skills: ['Javascript', 'Python'] };
      const data = [
        { key: 'Key1', value: 'Hello' },
        { key: 'Key2', value: obj }
      ];
      const actual = convertToArray(data);
      const expected = ['Key1', 'Hello', 'Key2', JSON.stringify(obj)];
      expect(actual).to.deep.equal(expected);
    });
  });
});
