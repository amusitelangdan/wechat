/* 是否是公司邮箱 */
export function isWscnEmail(str) {
  const reg = /^\w(?:[-_.+]?\w+)*@[\w-]+\.\w+$/i;
  return reg.test(str.trim());
}
export function phone(phoneNumber) {
  return phoneNumber.search(/^(13|14|15|17|18|19)\d{9}$/g) !== -1;
}
export function isWeixin() {
  return window.navigator.userAgent.search(/MicroMessenger/i) !== -1;
}
export function isIos() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

export function isAndroid() {
  return window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1;
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

export function hasVal(val) {
  // trim 删除两边空格
  return val && val.trim && val.trim().length;
}


/**
 * 根据对应的验证对象验证结果
 * @param  {Object} agrn        验证对象
 * @param  {Function|RegExp}    agrn.rule   具体验证主体
 * @param  {String} agrn.type   验证类型(支持Function|RegExp)
 * @param  {Object} agrn        验证对象
 * @param  {String|Boolean}     value 需要被验证的结果
 * @return {Boolean}            验证结果
 */
function validate(agrn, value) {
  let flag = false;
  const { rule, type } = agrn;
  switch (type) {
    case 'regExp':
      flag = rule.test(value);
      break;
    case 'function':
      flag = rule(value);
      break;
    default:
      break;
  }
  return flag;
}
function validByArray(rules, value) {
  const result = { valid: true, errorMessage: '' };
  for (let i = 0; i < rules.length; i += 1) {
    const { errorMessage } = rules[i];
    if (!validate(rules[i], value)) {
      result.valid = false;
      result.errorMessage = errorMessage || '';
      break;
    }
  }
  return result;
}

/**
 * 验证 value 是否通过 rules验证数组 验证
 * @param  {String|Boolean} value
 * @param  {Array|Object} rules    验证规则(Array:数组中交集 &&,Object:对象中为并集 || )
 * @return {Object} result
 * @return {Boolean} result.valid  验证结果:true通过/false未通过
 * @return {String} result.errorMessage    报错信息
 */
export default function onValidate(value, rules) {
  let result = {};
  if (rules instanceof Array) {
    result = validByArray(rules, value);
  } else if (Object.values(rules).length > 0) {
    Object.values(rules).forEach((item) => {
      if (!result.valid) {
        result = validByArray(item, value);
      }
    });
  }
  result.type = '';
  return result;
}
