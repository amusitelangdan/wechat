<template>
  <div style="padding: 1rem 1rem">
    <el-row :gutter="14">
      <el-col :span="12">
        <div @click="toPath('/service/notice')" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <img src="../../assets/img/icon/service/notice.png" style="height: 24px; margin-bottom: 1rem">
          <br>
          入园须知
        </div>
      </el-col>
      <el-col :span="12">
        <div @click="toPath('/service/phoneBook')" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <img src="../../assets/img/icon/service/phone.png" style="height: 24px; margin-bottom: 1rem">
          <br>
          服务电话
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="14" style="margin-top: 1rem; margin-bottom: 1rem">
      <el-col :span="12">
        <div @click="toPath(`/service/feedback?childId=${selectedChildId}&className=${encodeURIComponent(selectedClassName)}`)" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <img src="../../assets/img/icon/service/feedback.png" style="height: 24px; margin-bottom: 1rem">
          <br>
          意见反馈
        </div>
      </el-col>
      <el-col :span="12">
        <div @click="toPath(`/service/complaint?childId=${selectedChildId}&className=${encodeURIComponent(selectedClassName)}`)" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <img src="../../assets/img/icon/service/complain.png" style="height: 24px; margin-bottom: 1rem">
          <br>
          投诉举报
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div @click="toPath(`/service/personal?childId=${selectedChildId}`)"  style="padding-top: 2rem; padding-bottom: 2rem;background: #ffffff;text-align: center;">
          <img src="../../assets/img/icon/service/personal.png" style="height: 24px; margin-bottom: 1rem">
          <br>
          个人中心
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        selectedChildId: state => state.parent.selectedChildId,
        selectedClassName: state => state.parent.selectedClassName,
      }),
    },
    methods: {
      ...mapActions({
      }),
      toPath(value) {
        this.$router.push(value);
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>

</style>
