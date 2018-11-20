import axios from 'axios';
import defaultsDeep from 'lodash.defaultsdeep';
import { apiConfig } from '../config';
import store from '../store/index';
import { Toast } from 'mint-ui';

// 获取及配置header
const getTokenHeader = (needToken) => {
  const token = store.state.token;
  let header;
  if (needToken) {
    if (!token) {
      // do something
      header = {};
    } else {
      header = {
        'w-token': token,
      };
    }
  } else {
    header = {};
  }
  return header;
};
const getDefaultHeaders = ({ token = true }) => Object.assign(getTokenHeader(token));

// 默认axios配置
const request = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus(status) {
    return status >= 200 && status < 1000;
  },
});
// 配置可获取原始报文
const processResponse = (res, options) => {
  let result = res.data;
  if (options && options.returnRawResponse) {
    result = res;
  }
  return result;
};

// 请求包装方法
const requestMap = (method, url, data, axiosConfig, options) => method(url, data, defaultsDeep(axiosConfig || {}, {
  headers: getDefaultHeaders(options || {}),
})).then(res => processResponse(res, options));

// 各种method包装
const get = (url, params, config, options) => request.get(url, defaultsDeep(config || {}, {
  headers: getDefaultHeaders(options || {}),
  params,
})).then(res => processResponse(res, options));
const del = (url, data, config, options) => request.delete(url, defaultsDeep(config || {}, {
  headers: getDefaultHeaders(options || {}),
})).then(res => processResponse(res, options));
const post = (url, data, config, options) => requestMap(request.post, url, data, config, options);
const put = (url, data, config, options) => requestMap(request.put, url, data, config, options);


// 请求拦截
request.interceptors.request.use((req) => {
  store.state.loading = true;
  if (req.method === 'post' || req.method === 'POST') {
    store.state.postLoading = true;
  }
  return req;
}, error => Promise.reject(error));

// 响应拦截
request.interceptors.response.use((response) => {
  store.state.loading = false;
  if (response.config.method === 'post' || response.config.method === 'POST') {
    store.state.postLoading = false;
  }
  return new Promise((resolve, reject) => {
    if (response.data.code === 200) {
      resolve(response);
    } else {
      Toast(response.data.msg);
      reject(response);
    }
  }, (error) => {
    const errRes = error.response;
    return new Promise((resolve, reject) => {
      if (!errRes || typeof errRes.status === 'undefined') {
        Toast(error.toString());
        reject(error.toString());
      } else {
        Toast(errRes.data.msg);
        reject(errRes);
      }
    });
  });
});

export {
  get,
  post,
  put,
  del,
};
