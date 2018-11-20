<template>
  <div>
    <div class="card-head">
      <div class="history">历史评分</div>
    </div>
    <div class="card" style="overflow:hidden;" v-for="(score, index) in scoreList" :key="index" @touchstart="openDetail(index)" @touchend="detail(score)" @touchmove="moveDetail" :class="{changeBackground: change === index}">
      <div class="list-left">
        <div>{{score.year}}年{{score.month}}月</div>
        <div>我的评分</div>
      </div>
      <div class="list-right">
        <span class="layout-fraction">{{Number.isInteger(parseFloat(score.avgScore)) ? parseFloat(score.avgScore) : parseFloat(score.avgScore).toFixed(1)}}</span>
        <span style="font-size: 12px">分</span>
      </div>
    </div>
    <div class="load">已加载全部</div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        scoreList: [],
        touchDetail: true,
        change: '',
      };
    },
    computed: {
    },
    methods: {
      ...mapActions({
        getScoreList: 'teacher/getScoreList',
      }),
      openDetail(index) {
        this.change = index;
        this.touchDetail = true;
      },
      moveDetail() {
        this.touchDetail = false;
      },
      detail(score) {
        this.change = '';
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
  .changeBackground{
    background: rgba(0,0,0,0.1);
  }
  .load{
    padding: 1rem 0;
    text-align: center;
    color: #999999;
    font-size: 12px
  }
</style>
