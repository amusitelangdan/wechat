import is from './type_is';
import { makeUrl, makeUrlParams, removeEmptyParams, processError, getUrlParams } from './request';
import { DateFormat, dateToString } from './date';
import { isAndroid, isIos } from './validate';

export {
  is,

  makeUrl,
  makeUrlParams,
  removeEmptyParams,
  processError,
  getUrlParams,

  DateFormat,
  dateToString,

  isAndroid,
  isIos,
};
