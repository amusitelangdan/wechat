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
  return /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase());
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

