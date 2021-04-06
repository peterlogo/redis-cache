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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IIsJson = (value: any) => boolean;

/**
 * @function toJson type definition.
 * @type
 */
export type IToJson = (value: string | Record<string, unknown>) => string;

/**
 * @function checkFormat type definition.
 * @type
 */
export type ICheckFormat = (value: string) => string | Record<string, unknown>;

/**
 * @function checkMultiFormat type definition.
 * @type
 */
export type IMultiCheckFormat = (value: string[]) => Array<string | Record<string, unknown>>;
