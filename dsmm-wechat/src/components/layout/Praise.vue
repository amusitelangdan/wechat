<template>
  <div>
    <div>
      <div class="expand card head">
        <div>{{praise[0].year}}年{{praise[0].month}}月</div>
      </div>
      <div v-if="praise[0].status">
        <div class="expand card border-t nav" v-for="(item, line) in praise" :key="line" @touchstart="openReview(line)" @touchend="review(item)" @touchmove="moveReview" :class="{changeBackground: change === line}">
          <div v-if="item.status.toString() === '10' || item.status.toString() === '15'" class="circle" style="background: #F5A626"></div>
          <div v-if="item.status.toString() === '20'" class="circle" style="background: #1DB562"></div>
          <div v-if="item.status.toString() === '30'" class="circle" style="background: #FF5024"></div>
          <div class="time">{{item.create_time}}</div>
          <div class="status reviewSuccess" v-if="item.status.toString() === '20'">审核通过</div>
          <div class="status reviewing" v-if="item.status.toString() === '10' || item.status.toString() === '15'">审核中</div>
          <div class="status reviewFail" v-if="item.status.toString() === '30'">审核未通过</div>
        </div>
      </div>
      <div class="border-t" v-else>
        <div class="no">无提交记录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        touchPraise: true,
        change: '',
      };
    },
    props: ['praise', 'praiseKey'],
    created() {
      this.praise.forEach((item) => {
        item.create_time = moment(item.createTime).format('YYYY年MM月DD日');
      });
    },
    methods: {
      openReview(line) {
        /*
        * event.currentTarget : 事件绑定的位置
        * event.target : 实际触发的位置
        * */
        this.change = line;
        this.touchPraise = true;
      },
      moveReview() {
        this.touchPraise = false;
      },
      review(item) {
        this.change = '';
        if (this.touchPraise) {
          this.$router.push({
            path: '/teacher/praise/detail',
            query: {
              id: item.id,
            },
          });
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .expand{
    background-color: rgba(0,0,0,0);
    padding: 1rem;
    display: flex;
    margin: 0 auto;
    .circle{
      width: 5px;
      height: 5px;
      border-radius: 100%;
      margin: 7px auto;
    }
    .time{
      flex: 1;
      padding-left: 1rem;
      text-align: left;
    }
    .status{
      text-align: right;
    }
  }
  .head{
    font-size: 12px;
    color: #666666;
    padding-top: 8px;
    padding-bottom: 5px;
  }
  .no{
    text-align: left;
    color: #b3b3b3;
    margin-left: 1rem;
    padding: 1rem 0;
  }
  .reviewSuccess {
    color: #1db562;
  }
  .reviewFail{
    color: #ff3300;
  }
  .reviewing {
    color: #f5a626;
  }
  .changeBackground{
    background: rgba(0,0,0,0.1);
  }
</style>
