import { ICacheProp } from './../typings';
import { IConvertToArray } from './typings';

export const convertToArray: IConvertToArray = (items) => {
  const data: string[] = [];
  let item: ICacheProp;
  for (item of items) {
    data.push(item.key, item.value);
  }
  return data;
};
