<template>
  <div>
    <div class="card" style="overflow:hidden;margin-bottom: 10px">
      <div class="list-left">
        <div>{{year}}年{{month}}月</div>
        <div>我的评分</div>
      </div>
      <div class="list-right">
        <span class="layout-fraction">{{Number.isInteger(parseFloat(scoreDetails.avgScore)) ? parseFloat(scoreDetails.avgScore) : parseFloat(scoreDetails.avgScore).toFixed(1)}}</span>
        <span>分</span>
      </div>
    </div>
    <div class="layout-quality">
      <div class="border-r layout-small">
        <div>教学质量</div>
        <div>
          <span>{{Number.isInteger(parseFloat(scoreDetails.staffTeachingQualityScore)) ? parseFloat(scoreDetails.staffTeachingQualityScore) : parseFloat(scoreDetails.staffTeachingQualityScore).toFixed(1)}}</span>
          <span>分</span>
        </div>
      </div>
      <div class="border-r layout-small">
        <div>服务质量</div>
        <div>
          <span>{{Number.isInteger(parseFloat(scoreDetails.staffServiceQualityScore)) ? parseFloat(scoreDetails.staffServiceQualityScore) : parseFloat(scoreDetails.staffServiceQualityScore).toFixed(1)}}</span>
          <span>分</span>
        </div>
      </div>
      <div class="layout-small">
        <div>互动沟通</div>
        <div>
          <span>{{Number.isInteger(parseFloat(scoreDetails.staffCommunicationScore)) ? parseFloat(scoreDetails.staffCommunicationScore) : parseFloat(scoreDetails.staffCommunicationScore).toFixed(1)}}</span>
          <span>分</span>
        </div>
      </div>
    </div>
    <div class="card" style="margin: 0;"  v-if="scoreDetails.memoList && scoreDetails.memoList.length !== 0">
      <div style="padding: .5rem 0 0;font-weight: bold">当月所有家长匿名建议</div>
      <div>
        <div class="card-cell" v-for="(suggest, index) in scoreDetails.memoList" :key="index">
          {{suggest !== '' ? suggest : '无'}}
        </div>
      </div>
    </div>
    <div v-if="scoreDetails.memoList && scoreDetails.memoList.length === 0">
      <div  style="overflow:hidden;">
        <img src="../../../assets/img/img/page/kongyemian.png" alt="" style="width: 15rem;margin: 3rem auto 1rem;display: block;">
        <div style="color: #999999;text-align: center">本月无家长匿名建议</div>
      </div>
    </div>
  </div>
</template>
<script>
 import { mapState, mapActions } from 'vuex';

 export default {
   data() {
     return {
       id: '',
       scoreDetails: {},
       year: '',
       month: '',
     };
   },
   computed: {
     ...mapState({
       scoreList: state => state.teacher.scoreList,
     }),
   },
   methods: {
     ...mapActions({
       getScoreDetail: 'teacher/getScoreDetail',
     }),
     init() {
       this.year = this.$route.query.year;
       this.month = this.$route.query.month;
       this.getScoreDetail({
         year: this.year,
         month: this.month,
       }).then((res) => {
         this.scoreDetails = res.obj;
       });
     },
   },
   created() {
     this.init();
   },
 };
</script>
<style lang="less" scoped>
  .list-left{
    padding: .5rem 0;
    float: left;
    div:first-child {
      color: #1a1a1a;
      font-weight: bold;
    }
    div:nth-child(2) {
      color: #999999;
      font-size: 12px;
    }
  }
  .list-right{
    float: right;
    color: #f5a623;
    padding: 1.2rem 0;
    .layout-fraction{
      font-weight: bold;
      font-size: 16px;
    }
  }
  .card{
    padding: .5rem 1rem;
    margin: 0 0 .5rem;
  }
  .layout-quality{
    display: flex;
    background-color: #fff;
    padding: 10px 0;
    margin-bottom: 5px;
    div{
      flex: 1;
      text-align: center;
      padding-top: .5rem;
      div:first-child {
        color: #1a1a1a;
      }
      div:last-child {
        color: #f5a623;
        span:first-child {
          font-weight: bold;
          font-size: 18px;
        }
        span:last-child {
          font-size: 12px;
        }
      }
    }
  }
  .layout-small{
    padding: 6px 0;
  }
  .card-cell {
    color: #797979;
  }
</style>
