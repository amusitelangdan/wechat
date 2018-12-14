<template>
  <div class="summary">
    <div class="card border-b">
      <child-info style="padding: .5rem 0;" :name="teacherSelectedChildInfo.name"
                :img="teacherSelectedChildInfo.photo"></child-info>
    </div>
    <div class="card border-b" style="margin:.8rem 0 0;">
      <div class="card-cell" style="overflow:hidden;" @click="relation">
        <div style="float: left">接宝宝的家长</div>
        <div style="float: right;color: #a8a8a8;"><span v-if="daySummaryInfoList.items.relationPn">{{daySummaryInfoList.items.relationPn}}</span><span v-else>妈妈</span>&nbsp;&nbsp;&nbsp;>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top: 0">
      <Temperature class="card-cell" title="离园体温" v-on:temperature="listenToMyBoy"
                   v-bind:saveInfo="daySummaryInfoList.items.bodyTemperature"></Temperature>
      <dw-shit-enum class="card-cell" v-model="daySummaryInfoList.items.shit"></dw-shit-enum>
      <dw-emotion-enum class="card-cell" title="离园情绪" v-model="daySummaryInfoList.items.feeling"></dw-emotion-enum>
      <dw-drink-enum class="card-cell" v-model="daySummaryInfoList.items.drinkWater"></dw-drink-enum>
      <div class="card-cell">
        <div style="padding: 1rem 0;text-align: center">
          每日寄语
        </div>
        <textarea rows="4" placeholder="可添加备注信息"
                  style="-webkit-appearance: none;appearance: none;width: 100%;outline: none;border-radius: 5px;padding: .5rem .5rem;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;resize:none"
                  v-model="daySummaryInfoList.memo" wrap="hard"></textarea>
      </div>
      <!--每日寄语结束-->
    </div>
    <div class="button-block_primary" @click="sureSubmit">
      提交
    </div>

    <!--弹出提交模态框-->
    <mt-popup
      v-model="popupSubmit"
      popup-transition="popup-fade" style="border-radius: 5px;" @touchmove.prevent>
      <div class="card" style="width:22rem;border-radius: 5px;" @touchmove.prevent>
        <div class="old-card-cell" style="padding-top: 1rem;">
          <div class="timeLeft" style="float: left;margin-right: 1rem">离校时间:</div>
          <div class="color-warning" style="float: left;">{{moveTime}}</div>
        </div>
        <div class="old-card-cell">
          <div class="timeLeft" style="float: left;margin-right: 1rem">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温:
          </div>
          <div class="color-warning" style="float: left;">{{daySummaryInfoList.items.bodyTemperature}}</div>
        </div>
        <div class="old-card-cell">
          <div class="timeLeft" style="float: left;margin-right: 1rem">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;便:
          </div>
          <div class="color-warning" style="float: left;">{{daySummaryInfoList.items.shit}}</div>
        </div>
        <div class="old-card-cell">
          <div class="timeLeft" style="float: left;margin-right: 1rem">情绪状况:</div>
          <i class="iconfont" :class="selectType.moodIcon" :style="{color: `${selectType.moodIconColor}`}"></i>
          <span style="color: #E6A23C;">{{daySummaryInfoList.items.feeling}}</span>
        </div>
        <div class="old-card-cell">
          <div class="timeLeft" style="float: left;margin-right: 1rem">饮水情况:</div>
          <div class="color-warning" style="float: left;">{{daySummaryInfoList.items.drinkWater}}</div>
        </div>
        <div class="old-card-cell">
          <div class="timeLeft" style="float: left;margin-right: 1rem">老师寄语:</div>
          <div class="color-warning" style="float: left;">{{daySummaryInfoList.memo}}</div>
        </div>
        <div style="padding: 1rem 0;">
          确认后并发送宝宝圈信息
        </div>
        <div class="button-group">
          <div class="button-return_submit" @click="error" style="line-height: 100%">返回修改</div>
          <div class="button-sure_submit" @click="success" v-loading="loading">确认发送</div>
        </div>
      </div>
    </mt-popup>
    <!--宝宝关系模态框-->
    <mt-popup
      v-model="parentRelation"
      position="bottom"
      style="width: 100%" @touchmove.prevent>
      <confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect" @touchmove.prevent></confirmation>
      <mt-picker ref="picker" :slots="slots" value-key="name"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import Temperature from '../../../components/report/InputTemperature';
  import ChildInfo from '../../../components/layout/ChildInfo';
  import Confirmation from '../../../components/button/PopUpConfirmation';
  import { mapActions, mapState } from 'vuex';
  import moment from 'moment';
  // 新组件
  import SelectShit from '../../../components/report/newReportDetailComponents/SelectShit';
  import SelectEmotion from '../../../components/report/newReportDetailComponents/SelectEmotion';
  // 全局方法
  import constant from '../../../config/constant';
  // 重构组件
  import DwDrinkEnum from '../../../components/planning/base/input/DrinkEnum';
  import DwEmotionEnum from '../../../components/planning/base/input/EmotionEnum';
  import DwShitEnum from '../../../components/planning/base/input/ShitEnum';

  export default {
    name: 'SummaryDetail',
    data() {
      return {
        flag: true,
        popupSubmit: false,
        parentRelation: false,
        relationPn: '',
        relationValue: '',
        moveTime: '',
        slots: [
          {
            flex: 1,
            values: [
              { name: '爸爸', value: 'father' },
              { name: '妈妈', value: 'mother' },
              { name: '爷爷', value: 'grandpa' },
              { name: '奶奶', value: 'grandma' },
              { name: '外公', value: 'grandfather' },
              { name: '外婆', value: 'grandmother' },
              { name: '其他', value: 'other' },
            ],
            className: 'slot4',
            textAlign: 'center',
            value: '1',
          },
        ],
        selectType: {
          SelectShitType: '',
          moodType: '',
          moodIcon: '',
          moodIconColor: '',
        },
      };
    },
    components: {
      Temperature,
      ChildInfo,
      Confirmation,
      SelectShit,
      SelectEmotion,
      DwDrinkEnum,
      DwEmotionEnum,
      DwShitEnum,
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        daySummaryInfoList: state => state.teacher.daySummaryInfoList,
        loading: state => state.loading,
      }),
    },
    // watch: {
    //   drinkEnum(val) {
    //     console.log(val);
    //   },
    // },
    methods: {
      ...mapActions({
        postReport: 'teacher/postReport',
      }),
      //        利用$on $emit将温度读取到，将情绪状态获取到
      // 温度
      listenToMyBoy(someData) {
        this.daySummaryInfoList.items.bodyTemperature = someData;
      },
      // 是否大便(新组件)
      shitType(index) {
        this.selectType.SelectShitType = index;
      },
      // 离园情绪（新组件）
      selectMood(index) {
        this.daySummaryInfoList.items.feeling = index;
      },
      //      提交
      sureSubmit() {
        constant.SELECTSHIT.forEach((item) => {
          if (this.selectType.SelectShitType === item.type) {
            this.daySummaryInfoList.items.shit = item.label;
          }
        });
        constant.LEAVEMOODSTATUS.forEach((item) => {
          if (this.daySummaryInfoList.items.feeling === item.label) {
            this.daySummaryInfoList.items.feeling = item.label;
            this.selectType.moodIcon = item.icon;
            this.selectType.moodIconColor = item.color;
          }
        });
        if (this.daySummaryInfoList.items.bodyTemperature !== '' && this.daySummaryInfoList.items.feeling !== '' && this.moveTime !== ''
          && this.daySummaryInfoList.items.drinkWater !== '' && this.daySummaryInfoList.items.shit !== '') {
          this.popupSubmit = true;
        } else {
          this.$toast('请完善页面相应信息');
        }
      },
      success() {
        this.popupSubmit = false;
        const data = JSON.stringify({
          bodyTemperature: this.daySummaryInfoList.items.bodyTemperature,  // 体温
          feeling: this.daySummaryInfoList.items.feeling,   // 情绪
          leaveTime: this.moveTime, // 离开时间
          drinkWater: this.daySummaryInfoList.items.drinkWater,  // 饮水情况
          relationPn: this.daySummaryInfoList.items.relationPn ? this.daySummaryInfoList.items.relationPn : '妈妈',  // 接走宝宝的人的关系
          relation: this.daySummaryInfoList.items.relationValue ? this.daySummaryInfoList.items.relationValue : 'mother',
          shit: this.daySummaryInfoList.items.shit,   // 大便情况
        });
        if (this.flag) {
          this.flag = false;
          this.postReport({
            type: 5,
            items: data,
            memo: this.daySummaryInfoList.memo.replace(/\r\n/g, '\n').replace(/\n/g, '\n').replace(/\s/g, '\n'), // 每日寄语
          }).catch(() => {
            this.flag = true;
          });
        }
        localStorage.setItem('summaryDetail', data);
      },
      error() {
        this.popupSubmit = false;
      },
      confirmSelect() {
        this.daySummaryInfoList.items.relationPn = this.$refs.picker.getSlotValue(0).name;
        this.daySummaryInfoList.items.relationValue = this.$refs.picker.getSlotValue(0).value;
        this.parentRelation = false;
      },
      cancelSelect() {
        this.parentRelation = false;
      },
      relation() {
        this.parentRelation = true;
      },
      init() {
        if (localStorage.getItem('summaryDetail')) {
          const summaryData = JSON.parse(localStorage.getItem('summaryDetail'));
          this.daySummaryInfoList.items.bodyTemperature = summaryData.bodyTemperature;
          this.daySummaryInfoList.items.feeling = summaryData.feeling;
          this.daySummaryInfoList.items.drinkWater = summaryData.drinkWater;
          this.daySummaryInfoList.items.relationPn = summaryData.relationPn;
          this.daySummaryInfoList.items.relationValue = summaryData.relation;
          this.daySummaryInfoList.items.shit = summaryData.shit;
        }
      },
    },
    //    通过路由将值传了进来并进行渲染
    created() {
      this.init();
      const d = new Date();
      this.moveTime = moment(d).format('a h:mm');
    },
  };
</script>
<style lang="less" scoped>
  @import '../../../assets/css/global';

  .selectRight {
    background: #b2e799;
    color: #ffffff;
  }

  .old-card-cell {
    padding: 0 0 1rem 0;
    overflow: hidden;
    position: relative;
    a {
      text-decoration: none;
    }
    .card-row-container {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
