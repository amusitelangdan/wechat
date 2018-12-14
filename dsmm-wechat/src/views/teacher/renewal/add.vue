<template>
  <div>
    <renewal-fee-child-info v-bind:childInfo="renewal" v-bind:isJump="false" style="margin-bottom: 10px"></renewal-fee-child-info>
    <div class="card">
      <textarea rows="10" placeholder="可添加备注信息" v-model="submitData.memo"></textarea>
    </div>
    <div class="button-block_primary button" @click="addPraise">提交</div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import RenewalFeeChildInfo from '../../../components/layout/RenewalFeeChildInfo';
  import rule from '../../../config/validate';
  import onValidate from '../../../utils/validate';

  const { memo } = rule;
  const ruleObj = {
    memo,
  };

  export default {
    data() {
      return {
        renewal: {},
        flag: true,
        submitData: {
          id: '',
          memo: '',
        },
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
        const list = Object.keys(ruleObj).map(item => onValidate(this.submitData[item], ruleObj[item]))
          .filter(item => !item.valid);
        if (list.length > 0) {
          this.$toast(list[0].errorMessage);
          return;
        }
        if (this.flag) {
          this.flag = false;
          this.postFollowAdd({
            orderId: this.submitData.id,
            memo: this.submitData.memo,
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
      this.submitData.id = this.$route.query.id;
      this.teacherFeeFollowList.forEach((item) => {
        item.exceed = Math.abs(moment().diff(item.endDate, 'days')) <= 30;
        item.exceedDate = Math.abs(moment().diff(item.endDate, 'days'));
        if (this.submitData.id.toString() === item.id.toString()) {
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
    margin-top: 3rem;
  }
</style>
