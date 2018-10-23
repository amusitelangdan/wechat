<template>
  <div>
    <!--<div>{{course}}</div>-->
    <el-row class="layout-background">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">星期一</div>
        <div class="layout-date">{{monday}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;"><span>{{mondayFood.mondayFoodStaple.length !== 0 ? mondayFood.mondayFoodStaple[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{mondayFood.mondayFoodStaple.length !== 0 ? mondayFood.mondayFoodStaple[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;"><span>{{mondayFood.mondayFoodSupplement.length !== 0 ? mondayFood.mondayFoodSupplement[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{mondayFood.mondayFoodSupplement.length !== 0 ? mondayFood.mondayFoodSupplement[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{mondayFood.mondayFoodSoup.length !== 0 ? mondayFood.mondayFoodSoup[0].foodName : ''}}</span></div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 2rem">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">星期二</div>
        <div class="layout-date">{{thursday}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;"><span>{{thursdayFood.thursdayFoodStaple.length !== 0 ? thursdayFood.thursdayFoodStaple[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{thursdayFood.thursdayFoodStaple.length !== 0 ? thursdayFood.thursdayFoodStaple[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;"><span>{{thursdayFood.thursdayFoodSupplement.length !== 0 ? thursdayFood.thursdayFoodSupplement[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{thursdayFood.thursdayFoodSupplement.length !== 0 ? thursdayFood.thursdayFoodSupplement[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{thursdayFood.thursdayFoodSoup.length !== 0 ? thursdayFood.thursdayFoodSoup[0].foodName : ''}}</span></div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 2rem">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">星期三</div>
        <div class="layout-date">{{wednesday}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;"><span>{{wednesdayFood.wednesdayFoodStaple.length !== 0 ? wednesdayFood.wednesdayFoodStaple[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{wednesdayFood.wednesdayFoodStaple.length !== 0 ? wednesdayFood.wednesdayFoodStaple[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;"><span>{{wednesdayFood.wednesdayFoodSupplement.length !== 0 ? wednesdayFood.wednesdayFoodSupplement[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{wednesdayFood.wednesdayFoodSupplement.length !== 0 ? wednesdayFood.wednesdayFoodSupplement[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{wednesdayFood.wednesdayFoodSoup.length !== 0 ? wednesdayFood.wednesdayFoodSoup[0].foodName : ''}}</span></div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 2rem">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">星期四</div>
        <div class="layout-date">{{tuesday}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;"><span>{{tuesdayFood.tuesdayFoodStaple.length !== 0 ? tuesdayFood.tuesdayFoodStaple[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{tuesdayFood.tuesdayFoodStaple.length !== 0 ? tuesdayFood.tuesdayFoodStaple[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;"><span>{{tuesdayFood.tuesdayFoodSupplement.length !== 0 ? tuesdayFood.tuesdayFoodSupplement[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{tuesdayFood.tuesdayFoodSupplement.length !== 0 ? tuesdayFood.tuesdayFoodSupplement[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{tuesdayFood.tuesdayFoodSoup.length !== 0 ? tuesdayFood.tuesdayFoodSoup[0].foodName : ''}}</span></div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="layout-background" style="margin-top: 2rem">
      <el-col :span="6" class="layout-left">
        <div>
          <img src="../../assets/img/icon/sendDetailComponents/lunch-logo.png" alt="">
          <span>菜谱明细</span>
        </div>
        <div class="layout-week">星期五</div>
        <div class="layout-date">{{friday}}</div>
      </el-col>
      <el-col :span="16" style="margin: 1.3rem 0;">
        <el-col :span="24" class="layout-right" style="padding-top: 0">
          <div class="layout-right-title">主食</div>
          <div style="padding: .2rem 0;"><span>{{fridayFood.fridayFoodStaple.length !== 0 ? fridayFood.fridayFoodStaple[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{fridayFood.fridayFoodStaple.length !== 0 ? fridayFood.fridayFoodStaple[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #2ecb5a;">辅食</div>
          <div style="padding: .2rem 0;"><span>{{fridayFood.fridayFoodSupplement.length !== 0 ? fridayFood.fridayFoodSupplement[0].foodName : ''}}</span><span style="color: #cccccc;margin: 0 .5rem;">|</span><span>{{fridayFood.fridayFoodSupplement.length !== 0 ? fridayFood.fridayFoodSupplement[1].foodName : ''}}</span></div>
        </el-col>
        <el-col :span="24" class="layout-right">
          <div class="layout-right-title" style="background: #ffd71d;">汤</div>
          <div style="padding: .2rem 0;"><span>{{fridayFood.fridayFoodSoup.length !== 0 ? fridayFood.fridayFoodSoup[0].foodName : ''}}</span></div>
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
      };
    },
    props: ['mondayFood', 'time', 'thursdayFood', 'wednesdayFood', 'tuesdayFood', 'fridayFood'],
    mounted() {
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
    margin-right: 1rem;
    width:40px;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center
  }
</style>
