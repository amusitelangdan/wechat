// import 'babel-polyfill';
// import 'core-js/es5';
import 'core-js/es7/object';
import 'core-js/es6/promise';
import 'core-js/es7/promise';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 样式适应处理
import Rem from './utils/rem';
// mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
// 将时间转换为中文
import 'moment/locale/zh-cn';
// 点击按钮复制文本
import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);
// element-ui
import { Icon, Card, Row, Col, Tag, Slider, Progress, Input, InputNumber, Select, Option, OptionGroup, Loading } from 'element-ui';

// 播放器
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';

require('vue-video-player/src/custom-theme.css');

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';


Vue.use(VideoPlayer);
Vue.use(Loading);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Slider);
Vue.use(MintUI);
Vue.use(Progress);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
// 自定义样式
require('./assets/css/global.less');

// 拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.token) {
    next({
      path: '/login',
      query: {
        sourcePathName: to.name,
      },
    });
  } else {
    next();
  }
});
router.afterEach((to, from, next) => {
  const u = navigator.userAgent;
  const IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (IOS) {
    store.dispatch('getWxConfig', {
      url: window.location.href,
    }).then((res) => {
      if (to.path === '/teacher/index') {
        wx.config(res.obj);
        if (to.meta.share === false) {
          wx.ready(() => {
            wx.hideAllNonBaseMenuItem({
              success() {
                console.log('IOS禁止接口成功');
              },
            });
          });
        }
      } else {
        wx.config(res.obj);
      }
    });
  } else {
    store.dispatch('getWxConfig', {
      url: window.location.href,
    }).then((res) => {
      wx.config(res.obj);
      if (to.meta.share === false) {
        wx.ready(() => {
          wx.hideAllNonBaseMenuItem({
            success() {
              console.log('Android禁止接口成功');
            },
          });
        });
      }
    });
  }
});

Vue.config.productionTip = false;

// console.log(`123${process.env.NODE_ENV === 'development'}`);
// console.log(process.env);
// 使用sentry对错误日志进行监控
if (process.env.NODE_ENV === 'development') {
  Raven
    .config('http://358eabfd9312408b9d50239f2e64e61d@172.16.56.66:9000/8')
    .addPlugin(RavenVue, Vue)
    .install();
} else {
  Raven
    .config('http://7f45a85a2e8f4a29b8c3501bdf850e3b@172.16.56.66:9000/11')
    .addPlugin(RavenVue, Vue)
    .install();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

Rem.setFontSize();

