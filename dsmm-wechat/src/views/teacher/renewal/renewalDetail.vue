<template>
  <div style="padding-bottom: 90px;">
    <renewal-fee-child-info v-bind:childInfo="renewal" v-bind:isJump="false" style="margin-bottom: 10px"></renewal-fee-child-info>
    <div v-if="followInfo">
      <div class="card-nav" v-for="(item, index) in renewalData" :key="index">
        <div class="card-cell layout-memo">
          <div>
            <span>跟进人</span>
            <span>{{item.staff.name}}</span>
          </div>
          <div class="date">{{item.createDate}}</div>
        </div>
        <div class="card-cell">
          <div style="color: #999999;">
            跟进备注
          </div>
          <div style="padding-top: 1rem">
            {{item.memo}}
          </div>
        </div>
      </div>
    </div>
    <div v-else style="overflow:hidden;">
      <img src="../../../assets/img/img/page/kongyemian.png" alt="" style="width: 15rem;margin: 3rem auto 1rem;display: block;">
      <div style="color: #999999;text-align: center">暂无续费跟进记录</div>
    </div>
    <div class="button-block_primary button" @click="addPraise">添加跟进信息</div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import RenewalFeeChildInfo from '../../../components/layout/RenewalFeeChildInfo';

  export default {
    data() {
      return {
        id: '',
        renewal: {},
        renewalData: [],
        followInfo: true,
      };
    },
    components: {
      RenewalFeeChildInfo,
    },
    computed: {
      ...mapState({
        teacherFeeFollowList: state => state.teacher.teacherFeeFollowList,
        renewalList: state => state.teacher.renewalList,
      }),
    },
    methods: {
      ...mapActions({
        getFollowDetail: 'teacher/getFollowDetail',
      }),
      addPraise() {
        this.$router.push({
          path: '/teacher/add/renewal',
          query: {
            id: this.id,
          },
        });
      },
    },
    created() {
      this.id = this.$route.query.id;
      this.teacherFeeFollowList.forEach((item) => {
        item.exceed = Math.abs(moment().diff(item.endDate, 'days')) <= 30;
        item.exceedDate = Math.abs(moment().diff(item.endDate, 'days'));
        if (this.id.toString() === item.id.toString()) {
          this.renewal = item;
        }
      });
      this.getFollowDetail({
        orderId: this.id,
      }).then((res) => {
        if (res.obj.length !== 0) {
          res.obj.forEach((item) => {
            item.createDate = moment(item.createTime).format('YYYY-MM-DD a h:ss');
          });
          this.renewalData = res.obj;
        } else {
          this.followInfo = false;
        }
      });
    },
  };
</script>
<style lang="less" scoped>
  .card-nav{
    padding: 0 1rem;
    background: #fff;
    margin-bottom: 5px;
  }
  .layout-memo{
    width: 100%;
    /*padding-top: .5rem;*/
    /*padding-bottom: .5rem;*/
    overflow: hidden;
    div{
      float: left;
      span:first-child{
        color: #9b9b9b;
      }
    }
    .date{
      float: right;
      text-align: right;
      color: #999999;
    }
  }
  .button{
    width: 22rem;
    position: fixed;
    bottom: 2rem;
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
