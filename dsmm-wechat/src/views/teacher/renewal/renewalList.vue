<template>
  <div>
    <renewal-fee-child-info v-for="(item, index) in feeFollowList" :key="index" v-bind:renewal="item" v-bind:jump="true"></renewal-fee-child-info>
  </div>
</template>
<script>
  import moment from 'moment';
  import { mapState, mapActions } from 'vuex';
  import RenewalFeeChildInfo from '../../../components/layout/RenewalFeeChildInfo';

  export default {
    data() {
      return {
        feeFollowList: [],
      };
    },
    components: {
      RenewalFeeChildInfo,
    },
    computed: {
      ...mapState({
        teacherSelectedClassId: state => state.teacher.teacherSelectedClassId,
        renewalList: state => state.teacher.renewalList,
      }),
    },
    methods: {
      ...mapActions({
        getFollowList: 'teacher/getFollowList',
      }),
    },
    created() {
      this.getFollowList({
        classId: this.teacherSelectedClassId,
      }).then((res) => {
        this.feeFollowList = res.obj;
        this.feeFollowList.forEach((item) => {
          item.exceed = Math.abs(moment().diff(item.endDate, 'days')) <= 30;
          if (moment().diff(item.endDate, 'days') > 0) {
            item.exceedDate = `-${moment().diff(item.endDate, 'days')}`;
          } else {
            item.exceedDate = Math.abs(moment().diff(item.endDate, 'days'));
          }
        });
      });
    },
  };
</script>
<style lang="less" scoped>
</style>
