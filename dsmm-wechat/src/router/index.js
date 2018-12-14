import Vue from 'vue';
import Router from 'vue-router';

// 结构报表
const StructureReport = () => import('../views/parent/structureReport/structureReport.vue');
// CSS示例页面
const CSS = () => import('../views/css_template.vue');

Vue.use(Router);

export default new Router({
  routes: [
    // 通用
    {
      path: '/login',
      name: '登录',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/login.vue'),
    },
    {
      path: '/loginBlank',
      name: '登录空页面',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/loginBlank.vue'),
    },
    // 老师端
    {
      path: '/teacher/noStaff',
      name: '非员工欢迎页',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/welcome/noStaff.vue'),
    },
    {
      path: '/teacher/noClass',
      name: '员工没有班级',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/welcome/noClass.vue'),
    },
    {
      path: '/teacher/index',
      name: '老师工作台',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/index.vue'),
    },
    {
      path: '/teacher/sendList',
      name: '今日报告发送列表',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/childrenList/sendList.vue'),
    },
    {
      path: '/teacher/student/list',
      name: '在读学员列表',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/childrenList/studentList.vue'),
    },
    {
      path: '/teacher/history/report/list',
      name: '历史报告发送列表',
      meta: {
        requireAuth: true,
        keepAlive: true,
        share: false,
      },
      component: () => import('../views/teacher/history/historyReportList.vue'),
    },
    {
      path: '/teacher/history/list',
      name: '历史报告列表',
      meta: {
        requireAuth: true,
        keepAlive: true,
        share: false,
      },
      component: () => import('../views/teacher/history/historyReportInfoList.vue'),
    },
    {
      path: '/teacher/dayCheck/sendDetail',
      name: '发送入园晨检',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendCheckDetail.vue'),
    },
    {
      path: '/teacher/dayLunch/sendDetail',
      name: '发送午餐通知',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendLunchDetail.vue'),
    },
    {
      path: '/teacher/daySleep/sendDetail',
      name: '发送午睡信息',
      meta: {
        requireAuth: true,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendSleepDetail.vue'),
    },
    {
      path: '/teacher/daySummary/sendDetail',
      name: '发送日总结',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendSummaryDetail.vue'),
    },
    {
      path: '/teacher/dayTeach/sendDetail',
      name: '发送每日课程',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendTeachDetail.vue'),
    },
    {
      path: '/teacher/customize/select',
      name: '自定义信息',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/selectCustomize.vue'),
    },
    {
      path: '/teacher/customize/sendDetail',
      name: '自定义信息发送',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/submitDetails/sendCustomizeDetail.vue'),
    },
    // 老师个人中心
    {
      path: '/teacher/personal',
      name: '个人信息',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/personal/index.vue'),
    },
    {
      path: '/teacher/personal/phone',
      name: '修改号码',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/personal/changePhone.vue'),
    },
    // 老师--我的好评
    {
      path: '/teacher/praise',
      name: '我的好评',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/praise/index.vue'),
    },
    {
      path: '/teacher/add/praise',
      name: '添加好评',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/praise/add.vue'),
    },
    {
      path: '/teacher/praise/commit',
      name: '提交成功',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/praise/commitSuccess.vue'),
    },
    {
      path: '/teacher/praise/detail',
      name: '好评详情',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/praise/detail.vue'),
    },
    // 我的评分
    {
      path: '/teacher/scoreList',
      name: '我的评分',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/score/scoreList.vue'),
    },
    {
      path: '/teacher/scoreDetail',
      name: '评分详情',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/score/scoreDetail.vue'),
    },
    // 续费跟进
    {
      path: '/teacher/renewalList',
      name: '续费跟进',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/renewal/renewalList.vue'),
    },
    {
      path: '/teacher/renewalDetail',
      name: '续费跟进详情页',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/renewal/renewalDetail.vue'),
    },
    {
      path: '/teacher/add/renewal',
      name: '添加续费跟进',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/renewal/add.vue'),
    },
    // 班级标准动作统计
    {
      path: '/teacher/statistical/list',
      name: '标准动作统计列表页',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/lookStatistical/statisticalList.vue'),
    },
    {
      path: '/teacher/statistical/detail',
      name: '标准动作统计详情页',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/teacher/lookStatistical/statisticalDetail.vue'),
    },
    // 用户调研
    {
      path: '/research/index',
      name: '用户调研',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/research/index.vue'),
    },
    {
      path: '/research/success',
      name: '用户提交成功',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/research/submitSuccess.vue'),
    },
    // 家长端
    {
      path: '/parent/index',
      name: '宝宝动态首页',
      meta: {
        requireAuth: true,
        keepAlive: true,
        share: false,
      },
      component: () => import('../views/parent/index.vue'),
    },
    {
      path: '/parent/welcome',
      name: '欢迎页面',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/welcome/welcome.vue'),
    },
    {
      path: '/parent/payment',
      name: '有关联宝宝但无缴费',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/welcome/welcomeBrowsing.vue'),
    },
    {
      path: '/parent/acceptInvitation',
      name: '绑定宝宝',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/invite/acceptInvitation'),
    },
    {
      path: '/service/notice',
      name: '入园须知',
      component: () => import('../views/service/notice.vue'),
    },
    {
      path: '/parent/list',
      name: '宝宝家人',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/invite/parents'),
    },
    {
      path: '/parent/invite',
      name: '邀请家人',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: true,
      },
      component: () => import('../views/parent/invite/invitationCode.vue'),
    },
    {
      path: '/parent/invite/success',
      name: '邀请家人成功分享出去的',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: true,
      },
      component: () => import('../views/parent/invite/inviteSuccess.vue'),
    },
    {
      path: '/dayInfo',
      name: '报告详情',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/reportPush/reportDetail.vue'),
    },
    // 服务中心
    {
      path: '/service/index',
      name: '服务中心首页',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/index.vue'),
    },
    {
      path: '/service/phoneBook',
      name: '服务电话',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/phoneBook.vue'),
    },
    {
      path: '/service/feedback',
      name: '意见反馈',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/feedback.vue'),
    },
    {
      path: '/service/complaint',
      name: '投诉举报',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/complaint.vue'),
    },
    {
      path: '/success',
      name: '反馈成功提交',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/feedbackSuccess'),
    },
    {
      path: '/service/personal',
      name: '个人中心',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/personal.vue'),
    },
    // 选择宝宝
    {
      path: '/service/select/child',
      name: '选择宝宝',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/service/selectChild.vue'),
    },
    // 每日结构报表
    {
      path: '/day/structure/report',
      name: '每日结构报表',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: true,
      },
      component: StructureReport,
    },
    // 预约咨询
    {
      path: '/reserve/inputInfo',
      name: '预约咨询填写信息',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: true,
      },
      component: () => import('../views/reserve/inputInfo.vue'),
    },
    {
      path: '/reserve/inputPhone',
      name: '预约咨询获取验证码',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/reserve/inputPhone.vue'),
    },
    {
      path: '/reserve/success',
      name: '预约咨询成功',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/reserve/reserveSuccess.vue'),
    },
    // leads是否已经试托成功
    {
      path: '/trusteeship/success',
      name: '已经试托',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/reserve/trusteeshipSuccess.vue'),
    },
    {
      path: '/commitment/visit',
      name: '还没有试托',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/reserve/commitmentToVisit.vue'),
    },
    {
      path: '/toShop/verify',
      name: '确认到店--已交定金',
      meta: {
        requireAuth: true,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/reserve/earnestMoney.vue'),
    },
    // 园区地址
    {
      path: '/address',
      name: '园区地址',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: true,
      },
      component: () => import('../views/address/index.vue'),
    },
    // 袋鼠服务
    {
      path: '/tourist/browsing',
      name: '游客浏览袋鼠',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: true,
      },
      component: () => import('../views/parent/reserve/touristBrowsing.vue'),
    },
    // 绑定成功
    {
      path: '/binding/success',
      name: '绑定成功',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/invite/bindingSuccess.vue'),
    },
    // 袋鼠服务中心分享
    {
      path: '/service/center',
      name: '袋鼠服务中心',
      meta: {
        requireAuth: false,
        keepAlive: false,
        share: false,
      },
      component: () => import('../views/parent/service.vue'),
    },
    // CSS示例页面
    {
      path: '/css_template',
      name: 'CSS',
      component: CSS,
    },
  ],
});
