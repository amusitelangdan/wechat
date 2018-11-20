/**
 * api 接口相关 配置文件
 */
const TestHost = 'https://api-gateway-test.daishumm.com';
// const TestHost = 'http://192.168.31.67:8889';
const ProdHost = 'https://api-gateway.daishumm.com';
// 前端页面
const TestFrontUrl = 'https://wechat-test.daishumm.com/#/';
const ProdFrontUrl = 'https://wechat.daishumm.com/#/';
// 公众号地址
const wechatUrl = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNTg3MzI1MA==&scene=123#wechat_redirect';
// 根据环境判断
const baseUrl = process.env.API_HOST === 'ProdHost' ? ProdHost : TestHost;
const baseFrontUrl = process.env.API_HOST === 'ProdHost' ? ProdFrontUrl : TestFrontUrl;
// 返回值
const config = {
  baseUrl,
  baseFrontUrl,
  wechatUrl,
};
export default config;
