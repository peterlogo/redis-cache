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
 * @function checkFormat type definition.
 * @type
 */
export type ICheckFormat = (value: string) => string | Record<string, unknown>;

/**
 * @function checkMultiFormat type definition.
 * @type
 */
export type IMultiCheckFormat = (value: string[]) => Array<string | Record<string, unknown>>;
