// 业务统一数据
const FAMILY = [
  {
    key: 'father',
    en: 'father',
    cn: '爸爸',
  },
  {
    key: 'mother',
    en: 'mother',
    cn: '妈妈',
  },
  {
    key: 'grandpa',
    en: 'grandpa',
    cn: '爷爷',
  },
  {
    key: 'grandma',
    en: 'grandma',
    cn: '奶奶',
  },
  {
    key: 'grandfather',
    en: 'grandfather',
    cn: '外公',
  },
  {
    key: 'grandmother',
    en: 'grandmother',
    cn: '外婆',
  },
  {
    key: 'other',
    en: 'other',
    cn: '家长',
  },
];
// 基础门店数据
const STORELIST = [
  {
    value: '1',
    label: '云山中心',
    coordinates: '',
  },
  {
    value: '2',
    label: '双桥中心',
    coordinates: '',
  },
  {
    value: '3',
    label: '民生中心',
    coordinates: '',
  },
  {
    value: '4',
    label: '博兴中心',
    coordinates: '',
  },
  {
    value: '5',
    label: '三林中心',
    coordinates: '',
  },
  {
    value: '6',
    label: '陈春中心',
    coordinates: '',
  },
  {
    value: '7',
    label: '凤城中心',
    coordinates: '',
  },
  {
    value: '8',
    label: '株洲中心',
    coordinates: '',
  },
  {
    value: '10',
    label: '博山中心',
    coordinates: '',
  },
  {
    value: '12',
    label: '军体中心',
    coordinates: '',
  },
  {
    value: '13',
    label: '秀沿中心',
    coordinates: '',
  },
  {
    value: '14',
    label: '天山中心',
    coordinates: '',
  },
  {
    value: '15',
    label: '都市路中心',
    coordinates: '',
  },
];
// 通用基础数据
const GENDERADIO = [
  {
    value: '1',
    label: '男',
  },
  {
    value: '2',
    label: '女',
  },
];
// 业务统一数据
const EATSTATUS = [
  {
    label: '独立进食',
    type: 0,
  },
  {
    label: '老师喂食',
    type: 1,
  },
  {
    label: '拒绝吃饭',
    type: 2,
  },
  {
    label: '辅助进食',
    type: 3,
  },
];
// 业务统一数据
const SLEEPTIMESTATUS = [
  {
    label: '0-5分钟',
    type: 0,
  },
  { label: '5-10分钟',
    type: 1,
  },
  { label: '10-15分钟',
    type: 2,
  },
  { label: '15-20分钟',
    type: 3,
  },
  { label: '20分钟以上',
    type: 4,
  },
];
// 业务统一数据
const SLEEPMODESTATUS = [
  {
    label: '独立入睡',
    type: 0,
  },
  {
    label: '老师哄睡',
    type: 1,
  },
  {
    label: '拒绝睡觉',
    type: 2,
  },
];
// 业务统一数据
const LEAVEMOODSTATUS = [
  {
    label: '超开心',
    type: 0,
  },
  {
    label: '难过',
    type: 1,
  },
  {
    label: '略低落',
    type: 2,
  },
  {
    label: '一般',
    type: 3,
  },
  {
    label: '很正常',
    type: 4,
  },
];
// 好评选项
export const HIGNOPINION = [
  {
    type: 1,
    label: '锦旗',
  },
  {
    type: 2,
    label: '好评',
  },
];
export default {
  FAMILY,
  STORELIST,
  GENDERADIO,
  EATSTATUS,
  SLEEPTIMESTATUS,
  SLEEPMODESTATUS,
  LEAVEMOODSTATUS,
  HIGNOPINION,
};

