<template>
  <div style="overflow:hidden;">
    <div v-if="scoreList && scoreList.length !== 0" key="score">
      <div class="banner">
        <img src="../../../assets/img/img/scoreList.png" alt="">
      </div>
      <div class="card layout-changeBackground" style="overflow:hidden;" v-for="(score, index) in scoreList" :key="index" @touchstart="openDetail(index)" @touchend="detail(score)" @touchmove="moveDetail">
        <div class="list-left">
          <div>{{score.year}}年{{score.month}}月</div>
          <div>我的评分</div>
        </div>
        <div class="list-right">
          <span class="layout-fraction">{{Number.isInteger(parseFloat(score.avgScore)) ? parseFloat(score.avgScore) : parseFloat(score.avgScore).toFixed(1)}}</span>
          <span style="font-size: 12px">分</span>
          <i class="iconfont icon-angle-right" style="color: #D8D8D8;"></i>
        </div>
      </div>
      <div class="load">已加载全部</div>
    </div>
    <blank v-else-if="scoreList && scoreList.length === 0" key="score" text="目前暂无评分记录~"></blank>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import Blank from '../../../components/layout/Blank';

  export default {
    data() {
      return {
        scoreList: [],
        touchDetail: false,
        change: '',
      };
    },
    computed: {
    },
    components: {
      Blank,
    },
    methods: {
      ...mapActions({
        getScoreList: 'teacher/getScoreList',
      }),
      openDetail() {
        this.touchDetail = true;
      },
      moveDetail() {
        this.touchDetail = false;
      },
      detail(score) {
        if (this.touchDetail) {
          this.$router.push({
            path: '/teacher/scoreDetail',
            query: {
              id: 1,
              year: score.year,
              month: score.month,
            },
          });
        }
      },
      init() {
        this.getScoreList().then((res) => {
          this.scoreList = res.obj;
        });
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style lang="less" scoped>
  .banner{
    margin: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .card-head{
    padding: 1rem;
    display: flex;
    .history{
      flex: 1;
      line-height: 1.7rem;
      color: #999999;
    }
    .issue{
      padding: .2rem .5rem;
      color: #ccc;
      border-radius: 100%;
      border: 1px #cccccc solid;
      text-align: center;
    }
  }
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
      font-size: 18px;
    }
  }
  .card{
    margin: 0 0 .5rem;
  }
  .layout-changeBackground:active{
    background: rgba(0,0,0,0.05);
  }
  .load{
    padding: 1rem 0;
    text-align: center;
    color: #999999;
    font-size: 12px
  }
</style>
