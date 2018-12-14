<template>
  <div style="overflow:hidden;">
    <div class="banner">
      <img src="../../../assets/img/img/statistical.png" alt="">
    </div>
    <div class="card-head">
      <div class="history">{{classInfo.store.name}} {{classInfo.name}}</div>
    </div>
    <div v-if="statisticalList.length !== 0">
      <div class="card layout-changeBackground" style="overflow:hidden;" v-for="(statistical, index) in statisticalList" :key="index" @touchstart="openDetail(index)" @touchend="detail(statistical)" @touchmove="moveDetail">
        <div class="list-left">
          <div>{{statistical.year}}年{{statistical.month}}月</div>
          <div>班级已发布量</div>
        </div>
        <div class="list-right">
          <span class="layout-fraction">{{statistical.count}}</span>
          <span style="font-size: 12px">条</span>
          <i class="iconfont icon-angle-right" style="color: #D8D8D8;"></i>
        </div>
      </div>
      <div class="load">已加载全部</div>
    </div>
    <Blank v-if="statisticalList.length === 0" title="暂无数据~"></Blank>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import Blank from '../../../components/layout/Blank';

  export default {
    data() {
      return {
        statisticalList: [],
        classInfo: {
          store: {
            name: '',
          },
          name: '',
        },
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
        getStatisticalList: 'teacher/getStatisticalList',
      }),
      openDetail() {
        this.touchDetail = true;
      },
      moveDetail() {
        this.touchDetail = false;
      },
      detail(statistical) {
        if (this.touchDetail) {
          this.$router.push({
            path: '/teacher/statistical/detail',
            query: {
              year: statistical.year,
              month: statistical.month,
            },
          });
        }
      },
      init() {
        this.getStatisticalList().then((res) => {
          this.classInfo = res.obj.classInfo;
          this.statisticalList = res.obj.list;
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
    margin: 5px 5px 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .card-head{
    padding: .8rem 1rem;
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
