import * as api from '../../api/';
// import { Toast } from 'mint-ui';
import router from '../../router/index';
// import { Toast } from 'mint-ui';

const store = {
  namespaced: true,
  state: {
    // 家长端
    selectedChildId: '',
    selectedChildPhoto: '',
    selectedChildName: '',
    selectedClassId: '',
    selectedClassName: '',
    childList: [],
    loginTips: {
      preserveTime: '',
    },
  },
  mutations: {
    switchSelectedChildId(state, payload) {
      state.selectedChildId = payload;
      state.childList.forEach((child) => {
        if (child.id === state.selectedChildId) {
          state.selectedChildName = child.name;
          state.selectedChildPhoto = child.photo;
        }
      });
    },
    switchSelectedClassId(state, payload) {
      state.selectedClassId = payload;
      state.childList.forEach((child) => {
        if (child.id === state.selectedChildId) {
          child.classList.forEach((classItem) => {
            if (classItem.id === state.selectedClassId) {
              state.selectedClassName = classItem.name;
            }
          });
        }
      });
    },
  },
  actions: {
    // 家长端
    // 获取家长关联的宝宝列表
    getParentChildList({ state }) {
      return new Promise((resolve, reject) => {
        api.getParentChildList().then((res) => {
          // 先记录原始的childList
          state.childList = res.obj;
          // 根据情况跳转不同欢迎页面
          if (res.obj.length === 0) {
            router.replace('/parent/welcome');
          } else if (res.obj.length !== 0) {
            // 筛选有班级的孩子
            const hasClassChildList = [];
            res.obj.forEach((item) => {
              if (item.classList.length !== 0) {
                hasClassChildList.push(item);
              }
            });
            if (hasClassChildList.length !== 0) {
              if (state.selectedChildId === '') {
                state.selectedChildId = hasClassChildList[0].id;
                state.selectedChildName = hasClassChildList[0].name;
                state.selectedChildPhoto = hasClassChildList[0].photo;
              }
              if (state.selectedClassId === '') {
                state.selectedClassId = hasClassChildList[0].classList[0].id;
                state.selectedClassName = hasClassChildList[0].classList[0].name;
              }
            } else {
              // 预约试托数组
              const r1 = [];
              // 有没有试托
              res.obj.forEach((item) => {
                if (item.followStatus === 21 || item.followStatus === 22) {
                  r1.push(item);
                }
              });
              // 诺访数组
              const r2 = [];
              // 有没有诺访
              res.obj.forEach((item) => {
                if (item.followStatus === 20) {
                  r2.push(item);
                }
              });
              // 确认到店--已交定金数组
              const r3 = [];
              res.obj.forEach((item) => {
                if (item.followStatus === 23) {
                  r3.push(item);
                }
              });
              if (r1.length !== 0) {
                // 已经预约试托
                router.replace('/trusteeship/success');
              } else if (r3.length !== 0) {
                // 确认到店--已交定金
                router.replace('/toShop/verify');
              } else if (r2.length !== 0) {
                // 已经诺访的
                state.loginTips.preserveTime = r2[0].preserveTime;
                router.replace('/commitment/visit');
              } else {
                // 其他所有情况
                // Toast('您的信息正在被处理，请稍等片刻~');
                router.replace('/parent/welcome');
              }
            }
            resolve(res);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取老师通讯录列表
    getTeacherInfoList({ state }, payload) {
      return new Promise((resolve, reject) => {
        api.getTeacherInfoList(payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 家长端绑定邀请码
    acceptInvitation({ state }, data) {
      return new Promise((resolve, reject) => {
        api.acceptInvitation(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 获取宝宝动态信息
    getReportList({ state }, data) {
      return new Promise((resolve, reject) => {
        api.getReportList(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 家长端生成邀请码
    getInviteCode({ state }, data) {
      return new Promise((resolve, reject) => {
        api.getInviteCode(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};

export default store;
