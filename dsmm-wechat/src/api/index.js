import { get,
  post,
} from './request';
import { makeUrl } from '../utils';

// 微信相关
// 接口
export const getWxConfig = data => post('config/js/sdk/configuration', data);
