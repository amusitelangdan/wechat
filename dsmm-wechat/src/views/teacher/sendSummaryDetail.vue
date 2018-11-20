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
      <Shit class="card-cell" v-on:solve="defecate" v-bind:saveInfo="daySummaryInfoList.items.shit"></Shit>
      <Emotion class="card-cell" title="离园情绪" v-on:emotion="depart" v-bind:saveInfo="daySummaryInfoList.items.feeling"></Emotion>
      <Water class="card-cell" v-on:drink="drink" v-bind:saveInfo="daySummaryInfoList.items.drinkWater"></Water>
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
          <div v-if="daySummaryInfoList.items.feeling === '开心' || daySummaryInfoList.items.feeling === '超开心'" class="color-warning"
               style="float: left;line-height: 1.2rem;overflow:hidden;">
            <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_excietment.png')"
                 alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
            <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: 1rem">超开心</span>
          </div>
          <div v-else-if="daySummaryInfoList.items.feeling === '一般' || daySummaryInfoList.items.feeling === '很一般'" class="color-warning"
               style="float: left;line-height: 1.2rem;overflow:hidden;">
            <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_general.png')"
                 alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
            <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: 1rem">很一般</span>
          </div>
          <div v-else-if="daySummaryInfoList.items.feeling === '难过' || daySummaryInfoList.items.feeling === '略低落'" class="color-warning"
               style="float: left;line-height: 1.2rem;overflow:hidden;">
            <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_noHappy.png')"
                 alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
            <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: 1rem">略低落</span>
          </div>
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
  import Temperature from '../../components/report/InputTemperature';
  import Shit from '../../components/report/SelectShit';
  import Emotion from '../../components/report/SelectEmotion';
  import Water from '../../components/report/SelectDrink';
  import ChildInfo from '../../components/layout/ChildInfo';
  import Confirmation from '../../components/button/PopUpConfirmation';
  import { mapActions, mapState } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'SummaryDetail',
    data() {
      return {
        flag: true,
        issActive: false,
        isChange: true,
        show: '',
        drinkWater: '',
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
      };
    },
    components: {
      Temperature,
      Shit,
      Emotion,
      Water,
      ChildInfo,
      Confirmation,
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        daySummaryInfoList: state => state.teacher.daySummaryInfoList,
        loading: state => state.loading,
      }),
    },
    methods: {
      ...mapActions({
        postReport: 'teacher/postReport',
      }),
      //        利用$on $emit将温度读取到，将情绪状态获取到
      // 温度
      listenToMyBoy(someData) {
        this.daySummaryInfoList.items.bodyTemperature = someData;
      },
      // 是否大便
      defecate(value) {
        this.daySummaryInfoList.items.shit = value;
      },
      // 饮水情况
      drink(value) {
        this.daySummaryInfoList.items.drinkWater = value;
      },
      // 离园情绪
      depart(value) {
        let data = '超开心';
        if (value === '难过') {
          data = '略低落';
        } else if (value === '一般') {
          data = '很正常';
        }
        this.daySummaryInfoList.items.feeling = data;
      },
      //      提交
      sureSubmit() {
        if (this.daySummaryInfoList.items.bodyTemperature !== '' && this.daySummaryInfoList.items.feeling !== '' && this.moveTime !== ''
          && this.daySummaryInfoList.items.drinkWater !== '' && this.daySummaryInfoList.items.shit !== '') {
          this.popupSubmit = true;
        } else {
          this.$toast('请完善页面相应信息');
        }
      },
      success() {
        // this.popupSubmit = false;
        const data = JSON.stringify({
          bodyTemperature: this.daySummaryInfoList.items.bodyTemperature,  // 体温
          feeling: this.daySummaryInfoList.items.feeling,   // 情绪
          leaveTime: this.moveTime, // 离开时间
          drinkWater: this.daySummaryInfoList.items.drinkWater,  // 饮水情况
          relationPn: this.daySummaryInfoList.items.relationPn ? this.daySummaryInfoList.items.relationPn : '妈妈',  // 接走宝宝的人的关系
          relation: this.daySummaryInfoList.items.relationValue ? this.daySummaryInfoList.items.relationValue : 'mother',
          shit: this.daySummaryInfoList.items.shit,   // 大便情况
          show: this.show,   // 今日表现
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
  @import '../../assets/css/global';

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
