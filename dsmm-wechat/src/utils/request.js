import is from './type_is';

export const makeUrl = (originUrl, vars) => {
  let destUrl = originUrl;
  Object.keys(vars).forEach((key) => {
    // console.log(key, vars[key]);
    destUrl = destUrl.replace(`{${key}}`, vars[key]);
  });
  return destUrl;
};

export const makeUrlParams = (params) => {
  const paramsArr = [];
  Object.keys(params).forEach((key) => {
    if (typeof params[key] !== 'undefined' && params[key] !== '') {
      paramsArr.push(`${key}=${params[key]}`);
    }
  });

  return paramsArr.join('&');
};

export const removeEmptyParams = (params) => {
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'undefined' || params[key] === '') {
      delete params[key];
    }
  });

  return params;
};

export const processError = (err, cb) => {
  const tempCallback = is(cb, 'function') ? cb : () => {};
  if (is(err, 'error')) {
    console.error(err);
  } else if (is(err, 'string') && err.length) {
    tempCallback(err);
  } else if (is(err, 'object') && is(err.data, 'object')) {
    tempCallback(err.data.msg, err);
  }
};

export const getUrlParams = () => {
  const url = window.location.href;
  const f = url.indexOf('?');
  const e = url.indexOf('#');
  const params = {};
  let paramsList = '';
  if (f > -1) {
    if (e > f) {
      paramsList = url.slice(f + 1, e).split('&');
    } else {
      paramsList = url.slice(f + 1).split('&');
    }
    paramsList.forEach((item) => {
      const p = item.indexOf('=');
      const name = item.substring(0, p);
      const value = item.substring(p + 1);
      params[name] = decodeURIComponent(value);
    });
  }
  return params;
};
