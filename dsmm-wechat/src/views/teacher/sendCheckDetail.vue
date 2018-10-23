<template>
  <div class="like">
    <div class="card border-b">
      <child-info style="padding: .5rem 0;" v-bind:name="teacherSelectedChildInfo.name" :img="teacherSelectedChildInfo.photo"></child-info>
    </div>
    <div class="card">
      <div>
        <temperature class="card-cell" title="体温" v-on:temperature="listenToMyBoy" v-bind:saveInfo="dayCheckInfoList.items.bodyTemperature"></temperature>
        <emotion class="card-cell" :title="emotion" v-on:emotion="emotionalState" v-bind:saveInfo="dayCheckInfoList.items.feeling"></emotion>
        <div>
          <HandCondition v-on:handCondition="handCondition" v-bind:issDate="dayCheckInfoList.items.headAndMouth"></HandCondition>
          <PhysicalCondition v-on:physicalCondition="physicalCondition" v-bind:issDate="dayCheckInfoList.items.bodyCondition"></PhysicalCondition>
          <Fingernail v-on:fingernail="fingernail" v-bind:issDate="dayCheckInfoList.items.nail"></Fingernail>
        </div>
        <div class="memo">
          <textarea rows="4" placeholder="可添加备注信息"
                    style="-webkit-appearance: none;appearance: none;width: 100%;outline: none;border-radius: 5px;padding: .8rem .6rem;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;resize:none"
                    v-model="dayCheckInfoList.memo"  wrap="hard"></textarea>
        </div>
      </div>
    </div>
    <div class="button-block_primary"  @click="sureSubmit">
      提交
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" style="border-radius: .25rem;background: #fff;" @touchmove.prevent :lock-scroll="true">
      <div class="card" style="border-radius:.25rem" @touchmove.prevent>
        <div style="width:20rem;">
          <div style="padding: .8rem 0 1rem;">{{teacherSelectedChildInfo.name}}</div>
          <div class="card-cell">
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">入校时间:</div>
              <div class="color-warning" style="float: left;">{{dayTime}}</div>
            </div>
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温:</div>
              <div class="color-warning" style="float: left;">{{dayCheckInfoList.items.bodyTemperature}}</div>
            </div>
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">情绪状态:</div>
              <div v-if="dayCheckInfoList.items.feeling === '开心'" class="color-warning">
                <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_excietment.png')" alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
                <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: .5rem">欢乐兴奋</span>
              </div>
              <div v-else-if="dayCheckInfoList.items.feeling === '一般'" class="color-warning">
                <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_general.png')" alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
                <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: .5rem">一般开心</span>
              </div>
              <div v-else-if="dayCheckInfoList.items.feeling === '难过'" class="color-warning">
                <img :src="require('../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_noHappy.png')" alt="" style="width: 1.2rem;height: 1.2rem;display: block;float: left;">
                <span style="line-height: 1.2rem;font-size: 14px;display: block;float:left;margin-left: .5rem">不开心</span>
              </div>
            </div>
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">手口情况:</div>
              <div class="color-warning" style="float: left;">{{dayCheckInfoList.items.headAndMouth}}</div>
            </div>
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">肢体擦伤:</div>
              <div class="color-warning" style="float: left;">{{dayCheckInfoList.items.bodyCondition}}</div>
            </div>
            <div style="overflow: hidden;padding: .5rem 0 0;">
              <div class="timeLeft" style="float: left;margin-right: 1rem">指甲情况:</div>
              <div class="color-warning" style="float: left;">{{dayCheckInfoList.items.nail}}</div>
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
          <div class="button-group">
            <div class="button-return_submit" @click="error">返回修改</div>
            <div class="button-sure_submit" @click="success">确认发送</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import HandCondition from '../../components/report/HandCondition';
  import PhysicalCondition from '../../components/report/PhysicalCondition';
  import Fingernail from '../../components/report/FingernailInfo';
  import Temperature from '../../components/report/InputTemperature';
  import Emotion from '../../components/report/SelectEmotion';
  import ChildInfo from '../../components/layout/ChildInfo';
  import moment from 'moment';
  import { mapActions, mapState } from 'vuex';

  export default {
    data() {
      return {
        emotion: '情绪状态',
        popupVisible: false,
        dayTime: '',
        memo: '', // 备注信息
        // 手口情况和肢体情况
        data: {},
      };
    },
    mounted() {
      this.getTime();
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        dayCheckInfoList: state => state.teacher.dayCheckInfoList,
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
        this.postReport({
          type: 1,
          items: this.data,
          memo: this.dayCheckInfoList.memo.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' '),
        });
      },
//        利用$on $emit将温度读取到，将情绪状态获取到
      listenToMyBoy(someData) {
        this.dayCheckInfoList.items.bodyTemperature = someData;
      },
      emotionalState(index) {
        this.dayCheckInfoList.items.feeling = index;
      },
      clickToConfirm(value) {
        this.popupVisible = value;
      },
//      手口情况
      handCondition(index) {
        this.dayCheckInfoList.items.headAndMouth = index;
      },
//      肢体擦伤
      physicalCondition(physical) {
        this.dayCheckInfoList.items.bodyCondition = physical;
      },
      // 指甲情况
      fingernail(index) {
        this.dayCheckInfoList.items.nail = index;
      },
      sureSubmit() {
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
      },
    },
    created() {
      this.init();
    },
    components: {
      Temperature,
      emotion: Emotion,
      ChildInfo,
      HandCondition,
      PhysicalCondition,
      Fingernail,
    },
  };
</script>
<style lang="less" scoped>
</style>
