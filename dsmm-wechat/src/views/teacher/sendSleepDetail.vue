<template>
    <div>
      <div class="card border-b">
        <child-info style="padding: .5rem 0;" :name="teacherSelectedChildInfo.name" :img="teacherSelectedChildInfo.photo"></child-info>
      </div>
      <div class="card card-cell" style="padding-bottom: 0;padding-top: 0;margin: 0;">
        <div style="display: flex">
          <div style="flex: 1;display: flex" @click="modeSelect" class="new-card-cell">
            <div style="flex: 1;">&nbsp;&nbsp;&nbsp;&nbsp;入睡方式:</div>
            <div style="flex: 1;">

              <div style="float:left;">{{daySleepInfoList.items.modeValue ? daySleepInfoList.items.modeValue : '独立入睡'}}</div>
              <img src="../../assets/img/icon/global/arrow-right.png" alt="" style="width: .5rem;height: 1rem;margin-left: 1rem;display:block;margin-top: .2rem;float:left;">
            </div>
          </div>
          <div v-if="daySleepInfoList.items.modeValue !== '拒绝睡觉'" style="flex: 1;display: flex" @click="timeSelect" class="new-card-cell">
            <div style="flex: 1;">&nbsp;&nbsp;&nbsp;&nbsp;入睡时间:</div>
            <div style="flex: 1;">
              <div style="float:left;">{{pickerValue}}</div>
              <img src="../../assets/img/icon/global/arrow-right.png" alt="" style="width: .5rem;height: 1rem;margin-left: 2rem;display:block;margin-top: .2rem;float:left;">
            </div>
          </div>
          <div v-else style="flex: 1;display: flex" class="new-card-cell">
            <div style="flex: 1;">&nbsp;&nbsp;&nbsp;&nbsp;入睡时间:</div>
            <div style="flex: 1;">
              <div style="float:left;">----</div>
              <img src="../../assets/img/icon/global/arrow-right.png" alt="" style="width: .5rem;height: 1rem;margin-left: 2rem;display:block;margin-top: .2rem;float:left;">
            </div>
          </div>
        </div>
      </div>
      <!--入睡时间-->
      <mt-datetime-picker
        :closeOnClickModal=false
        ref="picker"
        type="time"
        v-model="pickerValue"
        :startHour=10
        :endHour=13
        @confirm="successConfirm" @touchmove.prevent>
      </mt-datetime-picker>
      <mt-popup
        :closeOnClickModal=false
        v-model="popupVisible"
        position="bottom" style="width: 100%;" @touchmove.prevent>
        <confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect" @touchmove.prevent></confirmation>
        <mt-picker ref="pickered" :slots="sloted"></mt-picker>
      </mt-popup>

      <div class="card">
        <Temperature class="card-cell"  title="室内温度" v-on:temperature="listenToMyBoy"  v-bind:saveInfo="daySleepInfoList.items.roomTemperature"></Temperature>
        <div class="card-cell" style="border: 0">
          <div style="margin: 0;display: flex;flex-wrap: wrap">
            <Thumbnail v-for="(image, index) in daySleepInfoList.photos" :key="index" v-bind:image="image" v-bind:imageUrlList="daySleepInfoList.photos"  v-on:deleteImage="deleteImage"></Thumbnail>
            <UploadPhotos v-if="daySleepInfoList.photos.length <= 8" v-on:uploaded="uploaded" style="float:left;"></UploadPhotos>
          </div>
        </div>
        <div class="card-cell">
          <textarea rows="4" placeholder="可添加备注信息"
                          style="-webkit-appearance: none;appearance: none;width: 100%;outline: none;border-radius: 5px;padding: .5rem .5rem;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;resize:none"
                          v-model="daySleepInfoList.memo" wrap="hard">

          </textarea>
        </div>
    </div>
    <div  class="button-block_primary" @click="sureSubmit">
      提交
    </div>
      <mt-popup
        v-model="popupSleep"
        popup-transition="popup-fade" style="border-radius: 5px"  @touchmove.prevent>
        <div class="card" style="width:18rem;border-radius: 5px">
          <div style="padding: 1rem 0;font-size: 18px;">入睡消息</div>
          <div class="time" style="padding: .5rem 0;overflow:hidden;">
            <div style="float: left;margin-right: 1rem">入睡时间:</div>
            <div class="color-warning" style="float: left;">{{daySleepInfoList.items.napTime ? this.daySleepInfoList.items.napTime : '11:30'}}</div>
          </div>
          <div class="time" style="padding: .5rem 0;overflow:hidden;">
            <div style="float: left;margin-right: 1rem">入睡方式:</div>
            <div class="color-warning" style="float: left;">{{daySleepInfoList.items.modeValue ? this.daySleepInfoList.items.modeValue : '独立入睡'}}</div>
          </div>
          <div class="time" style="padding: .5rem 0;overflow:hidden;">
            <div style="float: left;margin-right: 1rem">温&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:</div>
            <div class="color-warning" style="float: left;">
              {{daySleepInfoList.items.roomTemperature}}
            </div>
          </div>
          <div class="card-cell" style="display: flex;flex-wrap: wrap;">
            <div style="width: 5.5rem;height: 5.5rem;margin: .2rem;overflow:hidden;"  v-for="(item, index) in daySleepInfoList.photos" :key="index" >
              <img :src="item" alt="" style="height: 5.5rem;">
            </div>
          </div>
          <div style="padding: 1rem 0;font-size: 12px;color: #484848;">
            确认后并发送宝宝圈信息
          </div>
          <div class="button-group">
            <div class="button-return_submit" @click="error">返回修改</div>
            <div class="button-sure_submit" @click="success" v-loading="loading">确认发送</div>
          </div>
        </div>
      </mt-popup>
  </div>
</template>
<script>
  import Confirmation from '../../components/button/PopUpConfirmation';
  import Temperature from '../../components/report/InputTemperature';
  import UploadPhotos from '../../components/button/UploadPhotos';
  import Thumbnail from '../../components/layout/Thumbnail';
  import ChildInfo from '../../components/layout/ChildInfo';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'LunchList',
    data() {
      return {
        // 是否提交成功
//          入睡时长
        durationVisible: false,
//        入睡方式
        popupVisible: false,
//        入睡时长默认值
        pickerValue: '11:30',
//        入睡方式默认值
        modeValue: '独立入睡',
        dish: '',
//        入睡时长
        duration: [
          {
            flex: 1,
            values: ['0-5分钟', '5-10分钟', '10-15分钟', '15-20分钟', '20分钟以上'],
            className: 'slot2',
            textAlign: 'center',
            value: '1',
          },
        ],
//        入睡方式
        sloted: [
          {
            flex: 1,
            values: ['独立入睡', '老师哄睡', '拒绝睡觉'],
            className: 'slot4',
            textAlign: 'center',
            value: '1',
          },
        ],
        childWords: '',
        popupSleep: false,
        imageUrl: '',  // 图片url
        imageUrlList: [], // 多张图片url
        deleteImageUrl: '',
        sleepTemp: '',
      };
    },
//    引入子组件
    components: {
      Temperature,
      UploadPhotos,
      confirmation: Confirmation,
      Thumbnail,
      ChildInfo,
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        daySleepInfoList: state => state.teacher.daySleepInfoList,
        loading: state => state.loading,
      }),
    },
//    通过路由将值传了进来并进行渲染
    created() {
      if (localStorage.getItem('sleepDetail')) {
        const sleepData = JSON.parse(localStorage.getItem('sleepDetail'));
        this.daySleepInfoList.items.napTime = JSON.parse(sleepData.items).napTime;
        this.daySleepInfoList.items.modeValue = JSON.parse(sleepData.items).modeValue;
        this.daySleepInfoList.items.roomTemperature = JSON.parse(sleepData.items).roomTemperature;
        this.daySleepInfoList.photos = JSON.parse(sleepData.photos);
      }
      if (this.daySleepInfoList.items.napTime !== '----' && this.daySleepInfoList.items.napTime !== undefined) {
        this.pickerValue = this.daySleepInfoList.items.napTime;
      }
    },
    methods: {
      ...mapActions({
        postReport: 'teacher/postReport',
      }),
      error() {
        this.popupSleep = false;
      },
      success() {
        console.log('111');
        this.popupSleep = false;
        let data = {};
        if (this.daySleepInfoList.items.modeValue !== '拒绝睡觉') {
          data = {
            napTime: this.pickerValue,  // 入睡时间
            modeValue: this.daySleepInfoList.items.modeValue ? this.daySleepInfoList.items.modeValue : '独立入睡', // 入睡方式
            roomTemperature: this.daySleepInfoList.items.roomTemperature, // 室内温度
            sleepInfo: this.daySleepInfoList.items.sleepInfo, // 睡眠情况
          };
        } else {
          data = {
            napTime: '----',  // 入睡时间
            modeValue: this.daySleepInfoList.items.modeValue ? this.daySleepInfoList.items.modeValue : '独立入睡', // 入睡方式
            roomTemperature: this.daySleepInfoList.items.roomTemperature, // 室内温度
            sleepInfo: this.daySleepInfoList.items.sleepInfo, // 睡眠情况
          };
        }
        const payload = {
          type: 2,
          photos: JSON.stringify(this.daySleepInfoList.photos),
          items: JSON.stringify(data),
          memo: this.daySleepInfoList.memo.replace(/\r\n/g, '\n').replace(/\n/g, '\n').replace(/\s/g, '\n'),
        };
        localStorage.setItem('sleepDetail', JSON.stringify(payload));
        this.postReport(payload);
      },
      timeSelect() {
        this.$refs.picker.open();
        this.durationVisible = true;
      },
      modeSelect() {
        this.popupVisible = true;
      },
      successConfirm(data) {
        this.pickerValue = data;
        this.daySleepInfoList.items.napTime = data;
      },
      durationConfirm() {
        this.daySleepInfoList.items.napTime = this.$refs.pickeres.getSlotValue(0);
        this.durationVisible = false;
      },
      durationSelect() {
        this.durationVisible = false;
      },
      confirmSelect() {
        this.daySleepInfoList.items.modeValue = this.$refs.pickered.getSlotValue(0);
        this.popupVisible = false;
      },
      cancelSelect() {
        this.popupVisible = false;
      },
      listenToMyBoy(someData) {
        this.daySleepInfoList.items.roomTemperature = someData;
      },
      explanation(value) {
        this.daySleepInfoList.items.sleepInfo = value;
      },
      //      提交
      sureSubmit() {
        console.log(this.daySleepInfoList.memo.replace(/\r\n/g, '\n').replace(/\n/g, '\n').replace(/\s/g, '\n'));
        if (this.daySleepInfoList.items.modeValue === '拒绝睡觉') {
          this.daySleepInfoList.items.napTime = '----';
        }
        if (this.daySleepInfoList.items.roomTemperature === undefined) {
          this.$toast('请完善页面信息');
        } else {
          this.popupSleep = true;
        }
      },
      clickToConfirm(value) {
        this.popupSleep = value;
      },
      // 图片上传
      uploaded(index) {
        this.imageUrl = index;
        if (this.daySleepInfoList.photos.length <= 8) {
          this.daySleepInfoList.photos.push(index);
        } else {
          this.$toast('最多可以上传九张图片');
        }
      },
      // 删除图片
      deleteImage(index) {
        let num = 0;
        this.daySleepInfoList.photos.forEach((item, line) => {
          if (item === index) {
            num = line;
            return num;
          }
        });
        this.daySleepInfoList.photos.splice(num, 1);
      },
    },
  };
</script>
<style lang="less" scoped>
</style>
