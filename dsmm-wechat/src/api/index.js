import { get,
  post,
} from './request';
import { makeUrl } from '../utils';

// 微信相关
// 获取微信JS-SDK配置
export const getWxConfig = data => post('config/js/sdk/configuration', data);
// 获取微信code
export const getWechatCode = data => get('/config/wechat/authentication/url', data);

// 通用非业务
// 获取OSS配置
export const getOssConfig = data => get('config/oss-config', data);
// 刷新token
export const refreshToken = data => post('/wechat/user/refresh/token', data);
// 获取手机验证码
export const getPhoneVerificationCode = data => get('/notify/erp/send-random-code', data);
// 登录获取token
export const postLoginToken = data => post('/wechat/user/login', data);

// 通用业务
// 获取单个学员信息
export const getChildInfo = urlVars => get(makeUrl('/wechat/enter/park/child/info/{childId}', urlVars));
// 宝宝动态点赞功能
export const postReportLike = data => post('/wechat/child/report/like', data);
// 宝宝动态提交评论
export const postReportComment = data => post('/wechat/child/report/comment', data);
// 查看报告详情
export const getReportDetail = data => get('wechat/child/report/detail', data);
// 获取本周午餐数据
export const getWeekLunch = data => get('wechat/daily/current/week/lunch', data);
// 获取本周课程表
export const getWeekLesson = data => get('wechat/daily/current/week/lesson', data);
// 获取当前日期及当前日期之前的7天的发送的报告内容
export const getHistoryReport = data => get('wechat/enter/park/history/data', data);
// 反馈及投诉
export const postFeedback = data => post('/wechat/feedback', data);

// 老师端
// 获取token内带的老师信息
export const getTokenTeacherInfo = data => get('/wechat/enter/park/staff/info', data);
// 获取老师关联的班级信息
export const getTokenClassInfoList = data => get('/wechat/enter/park/class/info/list', data);
// 获取今日的午餐及课程安排
export const getTodaySchedule = data => get('/wechat/enter/park/today/report', data);
// 获取今日报告发送情况
export const getTodayReportCount = urlVars => get(makeUrl('/wechat/daily/today/report/count/{classId}', urlVars));
// 获取本班学生在读列表
export const getClassReadingChildList = data => get('/wechat/enter/park/child/info/list', data);
// 历史发送报告列表
export const getClassHistoryReportList = data => get('wechat/enter/park/history/report/list', data);
// 获取已发送报告的学生信息(进入列表页)
export const getTodayReportedChildList = (urlVars, data) => get(makeUrl('/wechat/daily/sent/report/data/{classId}/{type}', urlVars, data));
// 发送报告
export const postReport = data => post('/wechat/daily/send/report', data);

// 家长端
// 获取学校通讯录列表
export const getTeacherInfoList = data => get('/wechat/teacher/phone/list', data);
// 家长端邀请码绑定
export const acceptInvitation = data => post('/wechat/parent/relatedInviteCode', data);
// 获取家长关联的宝宝
export const getParentChildList = data => get('/wechat/parent/child/info/list', data);
// 获取宝宝动态信息
export const getReportList = data => get('/wechat/child/report/list', data);
// 家长端生成邀请码
export const getInviteCode = data => get('wechat/parent/inviteCode', data);

// 其他
// 预约试托
export const postReserve = data => post('erp/activity/source/leads', data);
