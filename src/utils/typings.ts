import { ICacheProp } from './../typings';

/**
 * @function convertToArray type definition.
 * @type
 */
export type IConvertToArray = (items: ICacheProp[]) => Array<string>;

/**
 * @function isJson type definition.
 * @type
 */
export type IIsJson = (value: string) => boolean;

/**
 * @function convertToJson type definition.
 * @type
 */
export type IConvertToJson = (value: Record<string, unknown>) => string;

/**
 * @function convertToObject type definition.
 * @type
 */
export type IConvertToObject = (value: string) => Record<string, unknown>;

/**
 * @function checkFormat type definition.
 * @type
 */
export type ICheckFormat = (value: string) => string | Record<string, unknown>;

/**
 * @function checkMultiFormat type definition.
 * @type
 */
export type ICheckMultiFormat = (value: string[]) => Array<string | Record<string, unknown>>;
