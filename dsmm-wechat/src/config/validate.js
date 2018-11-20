/**
 * 验证相关配置文件
 */
import { hasVal } from '../utils/validate';

function isRequired(errorMessage) {
  return {
    type: 'function',
    rule(val) {
      return hasVal(val);
    },
    errorMessage,
  };
}
export default {
  evaluate: [
    {
      type: 'regExp',
      rule: /^[12]{1}$/i,
      errorMessage: '请选择好评类型',
    },
  ],
  evaluateTime: [
    isRequired('请设置好评时间'),
  ],
  evaluatePhotos: [
    {
      type: 'function',
      rule: val => Array.isArray(val) && val.length > 0,
      errorMessage: '请上传照片',
    },
  ],
  email: [
    isRequired(''),
    {
      type: 'regExp',
      rule: /^\w(?:[-_.+]?\w+)*@[\w-]+\.\w+$/i,
      errorMessage: '',
    },
  ],
  phone: [
    {
      type: 'regExp',
      rule: /^(13|14|15|17|18|19)\d{9}$/g,
      errorMessage: '',
    },
  ],
};
