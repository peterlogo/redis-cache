import { ICheckFormat, IConvertToArray, IIsJson, IMultiCheckFormat, IToJson } from './typings';

/**
 * Checks if a value is a valid
 * json string.
 * @param value
 */
export const isJson: IIsJson = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Converts a string to a valid
 * json string.
 * @param value
 */
export const toJson: IToJson = (value) => {
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

/**
 * Checks if a string is a valid json-format,
 * and returns the object format of the json string.
 * @param value
 */
export const checkFormat: ICheckFormat = (value) => {
  const validJsonString = isJson(value);
  if (!validJsonString) return value;
  const data = JSON.parse(value);
  return data;
};

/**
 * Checks an array of strings and changes the
 * valid json strings to objects.
 * @param value
 */
export const multiCheckFormat: IMultiCheckFormat = (value) => {
  const data: Array<string | Record<string, unknown>> = [];
  let item: string;
  for (item of value) {
    const validJson: boolean = isJson(item);
    if (!validJson) {
      data.push(item);
      continue;
    }
    const val = JSON.parse(item);
    data.push(val);
  }
  return data;
};

/**
 * Converts an array of objects to a
 * one dimensional array.
 * @param items
 */
export const convertToArray: IConvertToArray = (items) => {
  const data: Array<string> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let item: any;
  for (item of items) {
    const isObject = typeof item.value === 'object';
    if (!isObject) {
      data.push(item.key, item.value);
      continue;
    }
    const value = JSON.stringify(item.value);
    data.push(item.key, value);
  }
  return data;
};
