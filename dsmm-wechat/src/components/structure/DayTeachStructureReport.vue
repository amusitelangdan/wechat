<template>
  <div>
    <el-row class="layout-background" style="position: relative;">
      <img v-if="weekTime === '星期一'" src="../../assets/img/icon/sendReport/today_logo.png" alt="" style="position: absolute;top: 0;left: 2px;width: 6.5rem;height: 1.4rem;">
      <el-col :span="6" class="layout-left">
        <div class="layout-week">星期一</div>
        <div class="layout-date">{{monday}}</div>
      </el-col>
      <el-col :span="18" style="margin: 1.2rem 0 1rem;display: flex;flex-direction: column">
        <el-col :span="24" class="layout-right" style="padding-top: 0;flex: 1;" v-for="(item, index) in course.mondayLesson" :key="index">
          <div style="margin-right: 1rem">{{item.time}}</div>
          <div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{item.className}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 1rem;position: relative;">
      <img v-if="weekTime === '星期二'" src="../../assets/img/icon/sendReport/today_logo.png" alt="" style="position: absolute;top: 0;left: 2px;width: 6.5rem;height: 1.4rem;">
      <el-col :span="6" class="layout-left">
        <div class="layout-week">星期二</div>
        <div class="layout-date">{{thursday}}</div>
      </el-col>
      <el-col :span="18" style="margin: 1.2rem 0 1rem;display: flex;flex-direction: column">
        <el-col :span="24" class="layout-right" style="padding-top: 0" v-for="(item, index) in course.thursdayLesson" :key="index">
          <div style="margin-right: 1rem">{{item.time}}</div>
          <div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{item.className}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 1rem;position: relative;">
      <img v-if="weekTime === '星期三'" src="../../assets/img/icon/sendReport/today_logo.png" alt="" style="position: absolute;top: 0;left: 2px;width: 6.5rem;height: 1.4rem;">
      <el-col :span="6" class="layout-left">
        <div class="layout-week">星期三</div>
        <div class="layout-date">{{wednesday}}</div>
      </el-col>
      <el-col :span="18" style="margin: 1.2rem 0 1rem;display: flex;flex-direction: column">
        <el-col :span="24" class="layout-right" style="padding-top: 0" v-for="(item, index) in course.wednesdayLesson" :key="index">
          <div style="margin-right: 1rem">{{item.time}}</div>
          <div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{item.className}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 1rem;position: relative;">
      <img v-if="weekTime === '星期四'" src="../../assets/img/icon/sendReport/today_logo.png" alt="" style="position: absolute;top: 0;left: 2px;width: 6.5rem;height: 1.4rem;">
      <el-col :span="6" class="layout-left">
        <div class="layout-week">星期四</div>
        <div class="layout-date">{{tuesday}}</div>
      </el-col>
      <el-col :span="18" style="margin: 1.2rem 0 1rem;display: flex;flex-direction: column">
        <el-col :span="24" class="layout-right" style="padding-top: 0" v-for="(item, index) in course.wednesdayLesson" :key="index">
          <div style="margin-right: 1rem">{{item.time}}</div>
          <div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{item.className}}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 1rem;position: relative;">
      <img v-if="weekTime === '星期五'" src="../../assets/img/icon/sendReport/today_logo.png" alt="" style="position: absolute;top: 0;left: 2px;width: 6.5rem;height: 1.4rem;">
      <el-col :span="6" class="layout-left">
        <div class="layout-week">星期五</div>
        <div class="layout-date">{{friday}}</div>
      </el-col>
      <el-col :span="18" style="margin: 1.2rem 0 1rem;display: flex;flex-direction: column">
        <el-col :span="24" class="layout-right" style="padding-top: 0" v-for="(item, index) in course.fridayLesson" :key="index">
          <div style="margin-right: 1rem">{{item.time}}</div>
          <div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">{{item.className}}</div>
        </el-col>
        <!--<el-col :span="24" class="layout-right" style="padding-bottom: 0">-->
          <!--<div style="margin-right: 1rem">{{course.fridayLesson[2].time}}</div>-->
          <!--<div style="flex: 1;color: #ffae00;white-space:nowrap;overflow:hidden;text-overflow: ellipsis;">游戏 ·{{course.fridayLesson[2].className}}</div>-->
        <!--</el-col>-->
      </el-col>
    </el-row>
    <div style="margin-top: 1.5rem">
      <img src="../../assets/img/icon/sendReport/teach_report_notice.png" alt="" style="width: 100%">
    </div>
    <div style="margin-top: 1.2rem">
    <img :src="require('../../assets/img/icon/sendReport/QRcode.png')" alt="" style="width: 10rem;height: 10rem;margin: 0 auto;display: block">
    <div style="padding: 1rem 0 2rem;text-align: center;font-size: 12px">长按识别二维码&nbsp;&nbsp;&nbsp;&nbsp;关注袋鼠麻麻</div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        image: '',
        monday: '',
        thursday: '',
        wednesday: '',
        tuesday: '',
        friday: '',
      };
    },
    mounted() {
      // this.drawLine();
    },
    props: ['course', 'time', 'weekTime'],
    methods: {
    },
    created() {
      this.monday = moment(encodeURIComponent(this.time)).isoWeekday(1).format('YYYY.MM.DD');
      this.thursday = moment(encodeURIComponent(this.time)).isoWeekday(2).format('YYYY.MM.DD');
      this.wednesday = moment(encodeURIComponent(this.time)).isoWeekday(3).format('YYYY.MM.DD');
      this.tuesday = moment(encodeURIComponent(this.time)).isoWeekday(4).format('YYYY.MM.DD');
      this.friday = moment(encodeURIComponent(this.time)).isoWeekday(5).format('YYYY.MM.DD');
    },
  };
</script>

<style scoped lang="less">
  .class-font{
    padding: 2.5rem 0;
    text-align: center;
    height:8rem
  }
  .card-lunch{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-left: 2rem;
    margin-bottom: .4rem;
  }
  .card-lunch-font{
    padding: .4rem;
    border-radius: 100%;
    background: #f5a627;
    color: #ffffff;
    margin-right: .4rem
  }
  .layout-background{
    display: flex;
    /*background: #ffffff;*/
    height: 82px;
    width: 323px;
    margin: 0 auto 1rem;
    border: 1px #ffae00 solid;
    border-radius: 6px;
  }
  .layout-left{
    margin: 1rem .8rem .8rem;
    /*img{*/
      /*width: 1rem;*/
      /*height: 1rem;*/
      /*margin-right: .2rem*/
    /*}*/
    span{
      color: #fd6c19;
      font-size: 12px
    }
    .layout-week{
      color: #ffad00;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      padding: 1.2rem 0 .4rem ;
    }
    .layout-date{
      /*margin-top:.8rem;*/
      padding: .2rem .3rem;
      line-height: .9rem;
      font-size: 12px;
      color: #ffffff;
      width: 4.8rem;
      height: .8rem;
      background: #ffae00;
      border-radius: 1.5rem;
      text-align: center
    }
  }
  .layout-right{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    padding-top: 1rem;
    padding-bottom: .5rem;
    padding-right: 1.2rem;
    line-height: 1.5rem;
  }
  .layout-right-title{
    color: #ffffff;
    background: #fd6c19;
    border-radius: 1.2rem;
    margin-right: 1rem;
    width:40px;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center
  }
</style>
