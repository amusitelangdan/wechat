import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api/';
import { Toast } from 'mint-ui';
import moment from 'moment';
import router from '../router/index';
import OSS from 'ali-oss';
import teacher from './modules/teacher';
import parent from './modules/parent';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 通用
    loading: false,
    ossClient: '',
    uploading: false,
    token: localStorage.getItem('w-token') ? localStorage.getItem('w-token') : '',
    weekLunch: {},
    saveScroll: 0,
    lessonList: [],
    reserveInfo: {},
    playerOptions: {
      autoplay: false,
      height: 200,
      muted: false,
      loop: false,
      preload: 'metadata',
      language: 'zh-CN',
      // aspectRatio: '16:9',
      fluid: false,
      sources: [],
      notSupportedMessage: '此视频暂无法播放，请稍后再试',
      controlBar: {
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: false,
        fullscreenToggle: !navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端,  // 全屏按钮
      },
    },
    parseTime(time) {
      return moment(time).fromNow();
    },
    parseBirthday(date) {
      if (date) {
        // 年数
        const years = moment.duration(moment().diff(date)).years();
        // 月数
        const months = moment.duration(moment().diff(date)).months();
        return months ? `${years}岁${months}个月` : `${years}岁`;
      }
    },
    lifeTime(time) {
      let result = '';
      // 年数
      const years = moment.duration(moment().diff(time)).years();
      result += years ? `${years}年` : '';
      // 月数
      const months = moment.duration(moment().diff(time)).months();
      result += months ? `${months}个月` : '';
      // 天数
      const days = moment.duration(moment().diff(time)).days();
      result += days ? `${days}天` : '';
      return result;
    },
  },
  mutations: {
    logout(state) {
      state.token = '';
      localStorage.setItem('w-token', '');
      localStorage.removeItem('phone');
      Toast('退出登录成功');
      router.go(-1);
    },
    savePositionScroll(state, payload) {
      state.saveScroll = payload;
    },
    saveReserveInfo(state, payload) {
      state.reserveInfo = payload;
    },
  },
  actions: {
    // 通用
    getOssConfig({ state }) {
      api.getOssConfig().then((res) => {
        state.ossClient = new OSS.Wrapper(res.obj);
      }).catch((err) => {

      });
    },
    // 预约
    postReserve({ state }, data) {
      return new Promise((resolve, reject) => {
        api.postReserve(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 上传图片
    uploadPhoto({ state }, { fileName, fileRaw }) {
      state.uploading = true;
      return new Promise((resolve, reject) => {
        state.ossClient.multipartUpload(fileName, fileRaw).then((result) => {
          state.uploading = false;
          const url = result.res.requestUrls[0].slice(0, result.res.requestUrls[0].indexOf('?') > 0 ? result.res.requestUrls[0].indexOf('?') : (result.res.requestUrls[0].length));
          resolve(url);
          console.log(url);
        }).catch((err) => {
          state.uploading = false;
          Toast('上传图片失败');
          reject(err);
        });
      });
    },
    // 上传视频
    uploadVideo({ state }, { fileName, fileRaw }) {
      state.uploading = true;
      return new Promise((resolve, reject) => {
        state.ossClient.multipartUpload(fileName, fileRaw).then((result) => {
          state.uploading = false;
          const url = result.res.requestUrls[0].slice(0, result.res.requestUrls[0].indexOf('?') > 0 ? result.res.requestUrls[0].indexOf('?') : (result.res.requestUrls[0].length));
          resolve(url);
        }).catch((err) => {
          state.uploading = false;
          Toast('上传视频失败');
          reject(err);
        });
      });
    },
    // 结构列表
    uploadPhotoCanvas({ state }, { fileName, data }) {
      state.uploading = true;
      return new Promise((resolve, reject) => {
        const buffer = new OSS.Buffer(data);
        state.ossClient.put(fileName, buffer).then((result) => {
          state.uploading = false;
          const url = result.res.requestUrls[0].slice(0, result.res.requestUrls[0].indexOf('?') > 0 ? result.res.requestUrls[0].indexOf('?') : (result.res.requestUrls[0].length));
          resolve(url);
        }).catch((err) => {
          state.uploading = false;
          Toast('上传图片失败');
        });
      });
    },
    // 获取微信jssdk
    getWxConfig({ state }, payload) {
      return new Promise((resolve, reject) => {
        api.getWxConfig(payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 刷新token
    refreshToken({ state }) {
      return new Promise((resolve, reject) => {
        api.refreshToken().then((res) => {
          state.token = res.obj['w-token'];
          state.code = res.code;
          state.msg = res.msg;
          localStorage.setItem('w-token', state.token);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取手机验证码
    getPhoneVerificationCode({ state }, queryRules) {
      return new Promise((resolve, reject) => {
        api.getPhoneVerificationCode(queryRules).then((res) => {
          resolve(res);
          Toast(res.obj.smsMsg);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取微信code
    getWechatCode({ state }, payload) {
      return new Promise((resolve, reject) => {
        api.getWechatCode(payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 登录获取token
    postLoginToken({ state }, payload) {
      return new Promise((resolve, reject) => {
        api.postLoginToken(payload).then((res) => {
          state.token = res.obj['w-token'];
          localStorage.setItem('w-token', state.token);
          resolve(res);
        }).catch((err) => {
          reject(err);
          Toast(err.msg);
        });
      });
    },
    // 获取单个学生信息
    getChildInfo({ state }, urlVars) {
      return new Promise((resolve, reject) => {
        api.getChildInfo(urlVars).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 查看报告详情
    getReportDetail({ state }, data) {
      return new Promise((resolve, reject) => {
        api.getReportDetail(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 点赞功能
    postReportLike({ state }, data) {
      return new Promise((resolve, reject) => {
        api.postReportLike(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 宝宝动态提交评论
    postReportComment({ state }, data) {
      return new Promise((resolve, reject) => {
        api.postReportComment(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 反馈
    postFeedback({ state }, data) {
      return new Promise((resolve, reject) => {
        api.postFeedback(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取本周午餐数据
    getWeekLunch({ state }, data) {
      return new Promise((resolve, reject) => {
        api.getWeekLunch(data).then((res) => {
          state.weekLunch = res.obj;
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取本周课程数据
    getWeekLesson({ state }, UrlVals) {
      return new Promise((resolve, reject) => {
        api.getWeekLesson(UrlVals).then((res) => {
          const data = [];
          state.lessonList = [];
          data.push(JSON.parse(res.obj.monday));
          data.push(JSON.parse(res.obj.tuesday));
          data.push(JSON.parse(res.obj.wednesday));
          data.push(JSON.parse(res.obj.thursday));
          data.push(JSON.parse(res.obj.friday));
          data.forEach((item) => {
            item.forEach((index) => {
              if (index.time === '10:30-11:00') {
                state.lessonList.push(index);
              }
            });
          });
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    },
    // 获取当前日期及之前6天的报告
    getHistoryReport({ state }, data) {
      return new Promise((resolve, reject) => {
        api.getHistoryReport(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  modules: {
    teacher,
    parent,
  },
});

export default store;
