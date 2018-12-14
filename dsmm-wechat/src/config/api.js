/**
 * api 接口相关 配置文件
 */
const TestHost = '接口地址';
// const TestHost = 'http://192.168.31.67:8889';
const ProdHost = 'https://接口地址-gateway.接口地址.com';
// 前端页面
const TestFrontUrl = 'https://接口地址-test.接口地址.com/#/';
const ProdFrontUrl = 'https://接口地址.接口地址.com/#/';
// 公众号地址
const wechatUrl = 'https://mp.接口地址.qq.com/mp/profile_ext?action=home&__biz=接口地址==&scene=123#wechat_redirect';
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
