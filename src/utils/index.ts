import { ICheckFormat, ICheckMultiFormat, IConvertToArray, IConvertToJson, IConvertToObject, IIsJson } from './typings';

/**
 * Checks if string is a valid
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
 * Converts object to json string.
 * @param value
 */
export const convertToJson: IConvertToJson = (value) => {
  const data = JSON.stringify(value);
  return data;
};

/**
 * Converts json string to object.
 * @param value
 */
export const convertToObject: IConvertToObject = (value) => {
  const data = JSON.parse(value);
  return data;
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
export const checkMultiFormat: ICheckMultiFormat = (value) => {
  const data: Array<string | Record<string, unknown>> = [];
  let item: string;
  for (item of value) {
    const validJson: boolean = isJson(item);
    if (!validJson) {
      data.push(item);
      continue;
    }
    const val = JSON.parse(item);
    data.push(JSON.parse(val));
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
