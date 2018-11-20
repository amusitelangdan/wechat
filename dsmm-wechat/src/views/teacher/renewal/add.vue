<template>
  <div>
    <renewal-fee-child-info v-bind:renewal="renewal" v-bind:jump="false" style="margin-bottom: 10px"></renewal-fee-child-info>
    <div class="card">
      <textarea rows="10" placeholder="可添加备注信息" v-model="memo"></textarea>
    </div>
    <div class="button-block_primary button" @click="addPraise">提交</div>
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
        memo: '',
        flag: true,
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
        postFollowAdd: 'teacher/postFollowAdd',
      }),
      addPraise() {
        if (!this.memo) {
          this.$toast('请填写相关备注信息');
        } else if (this.flag) {
          this.flag = false;
          this.postFollowAdd({
            orderId: this.id,
            memo: this.memo,
          }).then(() => {
            this.$toast('跟进记录已提交成功');
            this.memo = '';
            setTimeout(() => {
              this.$router.go(-2);
            }, 1000);
          }).catch(() => {
            this.flag = true;
          });
        }
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
    },
  };
</script>
<style lang="less" scoped>
  .card {
    padding: .5rem 1rem;
    display: flex;
    margin: 0 0 .5rem;
  }
  textarea{
    border-radius: 5px;
    outline: none;
    width: 100%;
    resize:none;
    padding: .5rem;
    margin: 20px 0;
    border: 1px #999999 solid;
    resize:none; // 禁止textarea拉伸
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
