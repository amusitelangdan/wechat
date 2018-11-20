<template>
  <div>
    <el-row class="layout-background" v-for="(item, index) in weekLunch" :key="index">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">{{item.week}}</div>
        <div class="layout-date">{{item.date}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;display: flex">
            <div style="max-width: 5.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
              {{item.foodStaple.length !== 0 ? item.foodStaple[0].foodName : ''}}
            </div>
            <div style="color: #cccccc;margin: 0 .2rem;">|</div>
            <div style="width: 5.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
              {{item.foodStaple[1] ? item.foodStaple[1].foodName : ''}}
            </div>
          </div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;display: flex">
            <div style="max-width: 5.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.foodSupplement.length !== 0 ? item.foodSupplement[0].foodName : ''}}</div>
            <div style="color: #cccccc;margin: 0 .2rem;">|</div>
            <div style="max-width: 5.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.foodSupplement.length !== 0 ? item.foodSupplement[1].foodName : ''}}</div>
          </div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{item.foodSoup.length !== 0 ? item.foodSoup[0].foodName : ''}}</span></div>
        </el-col>
      </el-col>
    </el-row>
    <div style="margin-top: 3rem">
      <img :src="require('../../assets/img/icon/sendReport/QRcode.png')" alt="" style="width: 10rem;height: 10rem;margin: 0 auto;display: block">
      <div style="padding: 1rem 0 2rem;text-align: center;font-size: 12px">长按识别二维码&nbsp;&nbsp;&nbsp;&nbsp;关注袋鼠麻麻</div>
    </div>
  </div>
</template>

<script>
  // import html2canvas from 'html2canvas';
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
        mondayFoods: {},
      };
    },
    props: ['time', 'weekLunch'],
    mounted() {
      console.log(this.weekLunch);
      this.mondayFoods = this.mondayFood;
    },
    // watch: {
    //   mondayFood: [
    //     function mondayFood(oldVal, val) {
    //       debugger;
    //       // this.mondayFood = val;
    //     },
    //   ],
    // },
    methods: {
    },
    created() {
      // 获取当前日期所在周的第几天
      // const weekDay = moment(this.time).format('E');
      // 周一到周五
      this.monday = moment(this.time).isoWeekday(1).format('YYYY.MM.DD');
      this.thursday = moment(this.time).isoWeekday(2).format('YYYY.MM.DD');
      this.wednesday = moment(this.time).isoWeekday(3).format('YYYY.MM.DD');
      this.tuesday = moment(this.time).isoWeekday(4).format('YYYY.MM.DD');
      this.friday = moment(this.time).isoWeekday(5).format('YYYY.MM.DD');
    },
  };
</script>

<style scoped lang="less">
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
    height: 112px;
    width: 23rem;
    margin: 0 auto 1rem;
    /*background-image: url(../../assets/img/icon/parent/teach_background.png);*/
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
    background: #ffffff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border: 1px #ffae00 solid;
    border-radius: 6px;
  }
  .layout-left{
    border-right: 1px #d9d9d9 solid;
    margin: 1rem .8rem .8rem;
    img{
      width: 1rem;
      height: 1rem;
      margin-right: .2rem
    }
    span{
      color: #fd6c19;
      font-size: 12px
    }
    .layout-week{
      color: #fd6c19;
      font-size: 22px;
      padding: 1rem 0;
      margin-left: .15rem;
    }
    .layout-date{
      font-size: 12px;
      color: #808080;
      width: 100%;
      margin-left: .4rem;
    }
  }
  .layout-right{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    padding-top: .7rem;
  }
  .layout-right-title{
    color: #ffffff;
    background: #fd6c19;
    border-radius: 1.2rem;
    margin-right: .5rem;
    width:40px;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center
  }
</style>
