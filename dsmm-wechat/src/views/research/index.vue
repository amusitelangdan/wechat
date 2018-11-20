<template>
  <div>
    <div class="layout-expired" v-if="expired" style="display: flex;">
      <div style="width: 40%;overflow:hidden;">
        <div style="width: 16px;height: 16px;background-repeat: no-repeat;background-size: cover;margin-right: .5rem;float: right" :style="{backgroundImage: `url(${require('../../assets/img/icon/defaultAvatar/error.png')})`}"></div>
      </div>
      <div style="flex: 1;text-align: left">该调研已过期</div>
    </div>
    <div>
      <img src="../../assets/img/icon/month/1.png" alt="" style="width: 100%" v-if="month.toString() === '1'">
      <img src="../../assets/img/icon/month/2.png" alt="" style="width: 100%" v-if="month.toString() === '2'">
      <img src="../../assets/img/icon/month/3.png" alt="" style="width: 100%" v-if="month.toString() === '3'">
      <img src="../../assets/img/icon/month/4.png" alt="" style="width: 100%" v-if="month.toString() === '4'">
      <img src="../../assets/img/icon/month/5.png" alt="" style="width: 100%" v-if="month.toString() === '5'">
      <img src="../../assets/img/icon/month/6.png" alt="" style="width: 100%" v-if="month.toString() === '6'">
      <img src="../../assets/img/icon/month/7.png" alt="" style="width: 100%" v-if="month.toString() === '7'">
      <img src="../../assets/img/icon/month/8.png" alt="" style="width: 100%" v-if="month.toString() === '8'">
      <img src="../../assets/img/icon/month/9.png" alt="" style="width: 100%" v-if="month.toString() === '9'">
      <img src="../../assets/img/icon/month/10.png" alt="" style="width: 100%" v-if="month.toString() === '10'">
      <img src="../../assets/img/icon/month/11.png" alt="" style="width: 100%" v-if="month.toString() === '11'">
      <img src="../../assets/img/icon/month/12.png" alt="" style="width: 100%" v-if="month.toString() === '12'">
    </div>
    <div class="card teacherScore">老师评分</div>
    <div v-for="(item, index) in staffList" :key="index">
      <div class="card border-b teacherNav">
        <div class="avatar" v-if="item.photo" :style="{backgroundImage: `url(${item.photo})`}" style="background-repeat: no-repeat;background-size: cover"></div>
        <div class="avatar" v-else :style="{backgroundImage: `url(${require('../../assets/img/icon/defaultAvatar/teacher_default_avator.png')})`}" style="background-repeat: no-repeat;background-size: cover"></div>
        <div class="teacherName">
          <div>{{item.name}}</div>
          <div>{{item.staffType.name}}</div>
        </div>
        <div class="className">
          {{store.name}}
        </div>
      </div>
      <div class="card" style="margin: 0;">
        <div class="score">
          <div style="margin-bottom: .8rem">
            <div class="selectValue">
              <div class="assess">1.本月，对于{{item.name}}老师对宝宝的教学服务，您满意吗?</div>
              <div>{{item.value1}}分</div>
            </div>
            <div class="block">
              <el-slider id="score1" v-model="item.value1"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>
            </div>
          </div>
          <div style="margin-bottom: .8rem">
            <div class="selectValue">
              <div class="assess">2.本月，对于{{item.name}}老师对宝宝的服务质量，您满意吗?</div>
              <div>{{item.value2}}分</div>
            </div>
            <div class="block">
              <el-slider id="score2" v-model="item.value2"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>
            </div>
          </div>
          <div>
            <div class="selectValue">
              <div class="assess">3.本月，对于{{item.name}}老师对宝宝的交流互动，您满意吗?</div>
              <div>{{item.value3}}分</div>
            </div>
            <div class="block">
              <el-slider id="score3" v-model="item.value3"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>
            </div>
          </div>
          <div>
            <textarea rows="8" placeholder="请为我的工作提点建议吧~" v-model="item.memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="card teacherScore" style="margin-top: 5px">园区评分</div>
    <div>
      <div class="card border-b teacherNav">
        <div class="avatar" :style="{backgroundImage: `url(${require('../../assets/img/icon/global/address_photo.png')})`}" style="background-repeat: no-repeat;background-size: cover"></div>
        <div class="teacherName" style="line-height: 2.2rem">
          {{store.name}}
        </div>
      </div>
      <div class="card" style="margin: 0;">
        <div class="score">
          <div style="margin-bottom: .8rem">
            <div class="selectValue">
              <div class="assess">1.本月，对于宝宝所在园区的卫生环境，您满意吗？</div>
              <div>{{store.value1}}分</div>
            </div>
            <div class="block">
              <el-slider id="score1" v-model="store.value1"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>
            </div>
          </div>
          <div style="margin-bottom: .8rem">
            <div class="selectValue">
              <div class="assess">2.本月，对于宝宝所在园区的安全措施，您满意吗？</div>
              <div>{{store.value2}}分</div>
            </div>
            <div class="block">
              <el-slider id="score2" v-model="store.value2"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>
            </div>
          </div>
          <!--<div>-->
            <!--<div class="selectValue">-->
              <!--<div class="assess">3.本月，对于宝宝的餐饮口味和营养配比，您满意吗？</div>-->
              <!--<div>{{store.value3}}分</div>-->
            <!--</div>-->
            <!--<div class="block">-->
              <!--<el-slider id="score3" v-model="store.value3"  :min="0" :max="10" :show-stops="true" @change="selectScore"></el-slider>-->
            <!--</div>-->
          <!--</div>-->
          <div>
            <textarea rows="8" placeholder="请为我的工作提点建议吧~" v-model="store.memo"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div  class="button-block_primary" @click="sureSubmit" v-if="!expired">
      匿名提交
    </div>
    <div  class="button-block_primary" style="background: #D9D9D9" v-if="expired">
      匿名提交
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        storeId: '',
        staffId: [],
        expired: true,
        month: '',
        staffList: [],
        store: {},
        teacherSurveyScoreFormList: [],
        storeSurveyScoreForm: {},
        flag: true,
        childId: '',
      };
    },
    methods: {
      ...mapActions({
        getStoreInfo: 'getStoreInfo',
        postSurvey: 'postSurvey',
      }),
      selectScore(index) {
      },
      sureSubmit() {
        this.teacherSurveyScoreFormList = [];
        this.staffList.forEach((item) => {
          const obj = {};
          obj.staffId = item.id;
          obj.staffTeachingQualityScore = item.value1;
          obj.staffServiceQualityScore = item.value2;
          obj.staffCommunicationScore = item.value3;
          obj.memo = item.memo;
          obj.childId = parseInt(this.childId, 10);
          this.teacherSurveyScoreFormList.push(obj);
        });
        console.log(this.teacherSurveyScoreFormList);
        this.storeSurveyScoreForm.storeId = this.store.id;
        this.storeSurveyScoreForm.storeEnvironmentScore = this.store.value1;
        this.storeSurveyScoreForm.storeSecurityScore = this.store.value2;
        // this.storeSurveyScoreForm.storeFoodScore = this.store.value3;
        this.storeSurveyScoreForm.memo = this.store.memo;
        this.storeSurveyScoreForm.childId = parseInt(this.childId, 10);
        if (this.flag) {
          this.flag = false;
          this.postSurvey({
            storeSurveyScoreForm: this.storeSurveyScoreForm,
            teacherSurveyScoreFormList: this.teacherSurveyScoreFormList,
          }).then(() => {
            this.$router.replace('/research/success');
          }).catch(() => {
            this.$toast('提交失败，请重新提交');
            this.flag = true;
          });
        }
      },
    },
    created() {
      this.storeId = this.$route.query.storeId;
      this.staffId = this.$route.query.staffId;
      this.childId = this.$route.query.childId;
      if (this.storeId !== undefined || this.staffId !== '') {
        const r1 = JSON.parse(this.staffId);
        this.getStoreInfo({
          storeId: this.storeId,
          staffIds: r1.join(','),
        }).then((res) => {
          res.obj.staffList.forEach((item) => {
            item.value1 = 0;
            item.value2 = 0;
            item.value3 = 0;
            item.memo = '';
          });
          res.obj.store.memo = '';
          res.obj.store.value1 = 0;
          res.obj.store.value2 = 0;
          res.obj.store.value3 = 0;
          this.staffList = res.obj.staffList;
          this.store = res.obj.store;
        });
      } else {
        this.$toast('缺少必须参数');
      }
      this.month = moment().subtract(1, 'months').format('MM');
      const startMonth = moment().startOf('month').format('YYYY-MM-DD');
      if (Math.abs(moment('2018-11-01').diff(startMonth, 'days')) < 5) {
        this.expired = false;
      }
    },
  };
</script>
<style lang="less" scoped>
  .assess{
    font-size: 12px;
  }
  .teacherScore{
    background: #FFECCC;
    color: #F5A623;
    text-align: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
    margin-top: 1rem;
  }
  .teacherNav{
    padding-top: .5rem;
    padding-bottom: .5rem;
    display: flex;
    .avatar{
      width: 35px;
      height: 35px;
      border-radius: 100%;
    }
    .teacherName{
      text-align: left;
      padding-left: .8rem;
      div:last-child{
        color: #666666;
        font-size: 12px;
      }
    }
    .className{
      flex: 1;
      color: #B3B3B3;
      font-size: 12px;
      text-align: right;
    }
  }
  .score{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .block{
    width: 24rem;
    box-sizing: border-box;
    padding: .5rem 1.4rem;
    border-radius: 5px;
    margin: 0 auto;
    border: 1px #cccccc solid;
  }
  .selectValue{
    display: flex;
    padding-bottom: .6rem;
    div:first-child{
      flex: 1;
      text-align: left;
    }
    div:last-child{
      text-align: right;
      color: #F5A623;
    }
  }
  textarea{
    width: 90%;
    border: 1px #cccccc solid;
    border-radius: 5px;
    padding: .8rem;
    outline: none;
    display: block;
    margin:  2rem auto 0;
  }
  .button-block_primary{
    margin: 2rem 1rem;
  }
  .layout-expired{
    padding: 1.5rem;
    text-align: center;
    margin-bottom: .5rem;
    background: #999999;
    color: #fff;
  }
</style>
