<template>
  <div class="like">
    <div class="card border-b">
      <child-info style="padding: .5rem 0;" v-bind:name="teacherSelectedChildInfo.name" :img="teacherSelectedChildInfo.photo"></child-info>
    </div>
    <div class="card">
      <div>
        <temperature class="card-cell" title="体温" v-on:temperature="listenToMyBoy" v-bind:saveInfo="dayCheckInfoList.items.bodyTemperature"></temperature>
        <dw-emotion-enum class="card-cell" title="情绪状态" v-model="dayCheckInfoList.items.feeling"></dw-emotion-enum>
        <div>
          <dw-radio title="手口情况" :options="checkInfo.headAndMouth"  v-model="dayCheckInfoList.items.headAndMouth" style="margin: 1rem 0"></dw-radio>
          <dw-radio title="肢体情况" :options="checkInfo.limbInfo"  v-model="dayCheckInfoList.items.bodyCondition" style="margin-bottom: 1rem"></dw-radio>
          <dw-radio title="指甲情况" :options="checkInfo.nailInfo"  v-model="dayCheckInfoList.items.nail" style="margin-bottom: 1rem"></dw-radio>
        </div>
        <div class="memo">
          <textarea rows="4" placeholder="可添加备注信息"
                    style="-webkit-appearance: none;appearance: none;width: 100%;outline: none;border-radius: 5px;padding: .8rem .6rem;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;resize:none"
                    v-model="dayCheckInfoList.memo"  wrap="hard"></textarea>
        </div>
      </div>
    </div>
    <div  class="button-block_primary" @click="sureSubmit">
      提交
    </div>
    <dw-dialog v-model="popupVisible"  widthPercent="70%" v-on:confirm="success">
      <div slot="popup-content">
        <div style="padding: .8rem 0 1rem;">{{teacherSelectedChildInfo.name}}</div>
        <div class="border-b" style="padding-bottom: 1rem">
          <div style="padding: 5px 0;">
            <span>入校时间:</span>
            <span class="color-warning">{{dayTime}}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温:</span>
            <span class="color-warning">{{dayCheckInfoList.items.bodyTemperature}}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>情绪状态:</span>
            <i class="iconfont" :class="eventInfo.moodIcon" :style="{color: `${eventInfo.moodIconColor}`}"></i>
            <span style="color: #E6A23C;">{{dayCheckInfoList.items.feeling}}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>手口情况:</span>
            <span class="color-warning">{{dayCheckInfoList.items.headAndMouth}}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>肢体擦伤:</span>
            <span class="color-warning">{{dayCheckInfoList.items.bodyCondition}}</span>
          </div>
          <div style="padding: 5px 0;">
            <span>指甲情况:</span>
            <span class="color-warning">{{dayCheckInfoList.items.nail}}</span>
          </div>
          <div style="overflow: hidden;padding: .5rem 0 0;">
            <div class="timeLeft" style="float: left;margin-right: 1rem">备注信息:</div>
            <div class="color-warning" style="float: left;">
              {{dayCheckInfoList.memo}}
            </div>
          </div>
        </div>
        <div style="height:45px;line-height: 45px;font-size: 12px;color: #484848;">
          确认后并发送宝宝圈信息
        </div>
      </div>
    </dw-dialog>
  </div>
</template>
<script>
  import Temperature from '../../../components/report/InputTemperature';
  import ChildInfo from '../../../components/layout/ChildInfo';
  import moment from 'moment';
  import { mapActions, mapState } from 'vuex';
  // 新的组件
  import SelectEmotion from '../../../components/report/newReportDetailComponents/SelectEmotion';
  import SelectCheckInfo from '../../../components/report/newReportDetailComponents/SelectCheckInfo';
  // 全局定义的文案
  import constant from '../../../config/constant';
  // 重构组件
  import DwRadio from '../../../components/planning/base/input/Radio';
  import DwEmotionEnum from '../../../components/planning/base/input/EmotionEnum';
  import DwTemperature from '../../../components/planning/base/input/Temperature';
  import DwDialog from '../../../components/planning/base/layout/Dialog';

  export default {
    data() {
      return {
        emotion: '情绪状态',
        popupVisible: false,
        dayTime: '',
        memo: '', // 备注信息
        // 手口情况和肢体情况
        data: {},
        flag: true,
        checkType: {
          headAndMouth: [],
          limbInfo: [],
          nailInfo: [],
        },
        checkInfo: {
          headAndMouth: ['正常', '有疱疹'],
          limbInfo: ['正常', '有擦伤'],
          nailInfo: ['正常', '略长'],
        },
        eventInfo: {
          moodType: '',
          moodIcon: '',
          moodIconColor: '',
        },
      };
    },
    mounted() {
      this.getTime();
    },
    watch: {
      testData(val) {
        console.log(val);
      },
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        dayCheckInfoList: state => state.teacher.dayCheckInfoList,
        loading: state => state.loading,
      }),
    },
    methods: {
      ...mapActions({
        postReport: 'teacher/postReport',
      }),
      error() {
        this.popupVisible = false;
      },
      success() {
        this.popupVisible = false;
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.data = JSON.stringify({
          bodyTemperature: this.dayCheckInfoList.items.bodyTemperature,
          headAndMouth: this.dayCheckInfoList.items.headAndMouth,
          bodyCondition: this.dayCheckInfoList.items.bodyCondition,
          feeling: this.dayCheckInfoList.items.feeling,
          entranceTime: this.dayTime,
          nail: this.dayCheckInfoList.items.nail, // 指甲情况
          time: date, // 发送日期
        });
        localStorage.setItem('checkDetail', this.data);
        if (this.flag) {
          this.flag = false;
          this.postReport({
            type: 1,
            items: this.data,
            memo: this.dayCheckInfoList.memo.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' '),
          }).catch(() => {
            this.flag = true;
          });
        }
      },
//        利用$on $emit将温度读取到，将情绪状态获取到
      listenToMyBoy(someData) {
        this.dayCheckInfoList.items.bodyTemperature = someData;
      },
      // 情绪状态（新组件）
      selectMood(index) {
        this.dayCheckInfoList.items.feeling = index;
      },
      sureSubmit() {
        constant.LEAVEMOODSTATUS.forEach((item) => {
          if (this.dayCheckInfoList.items.feeling === item.label) {
            this.eventInfo.moodIcon = item.icon;
            this.eventInfo.moodIconColor = item.color;
          }
        });
        if (this.dayCheckInfoList.items.bodyTemperature === '' || this.dayCheckInfoList.items.headAndMouth === '' || this.dayCheckInfoList.items.bodyCondition === '' || this.dayCheckInfoList.items.feeling === '' || this.dayCheckInfoList.items.nail === '') {
          this.$toast('请完善页面相关信息');
        } else {
          this.popupVisible = true;
        }
      },
      getTime() {
        this.dayTime = moment().format('HH:mm');
      },
      init() {
        if (localStorage.getItem('checkDetail')) {
          const checkData = JSON.parse(localStorage.getItem('checkDetail'));
          this.dayCheckInfoList.items.bodyTemperature = checkData.bodyTemperature;
          this.dayCheckInfoList.items.headAndMouth = checkData.headAndMouth;
          this.dayCheckInfoList.items.bodyCondition = checkData.bodyCondition;
          this.dayCheckInfoList.items.feeling = checkData.feeling;
          this.dayCheckInfoList.items.nail = checkData.nail;
        }
      },
    },
    created() {
      this.init();
      this.checkType.headAndMouth = constant.HEADANDANDMOUTH;
      this.checkType.limbInfo = constant.LIMBINFO;
      this.checkType.nailInfo = constant.NAILINFO;
    },
    components: {
      Temperature,
      ChildInfo,
      SelectEmotion,
      SelectCheckInfo,
      DwRadio,
      DwEmotionEnum,
      DwTemperature,
      DwDialog,
    },
  };
</script>
<style lang="less" scoped>
</style>
