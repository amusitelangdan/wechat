<template>
  <div class="layout" style="overflow: hidden">
    <el-row style="margin-top: 25px;margin-bottom: 25px">
      <el-col :span="5" style="overflow:hidden;">
        <img src="../../../assets/img/icon/noAccess/bell.png" alt="" style="width: 50px;height: 50px;display: block;float: right;">
      </el-col>
      <el-col :span="29" style="padding: 1rem 0 0 11px;">
        您已经体验过袋鼠麻麻的服务
        <br>
        对袋鼠麻麻的服务感受如何呢？
      </el-col>
    </el-row>
    <div class="card-layout">
      <div style="margin-top: 1rem">
        <div class="button-block_primary" style="margin: 0"  @click="backtrack('/service/feedback')">反馈体验感受</div>
        <div style="margin: 10px auto;text-align: center">您正式入园后，老师会帮您开通宝宝动态</div>
      </div>
      <img src="../../../assets/img/img/page/trusteeshipSuccess.png" alt="" style="margin: 3rem auto 0;display: block" ref="imgWidth">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        clientHeight: '',
        clientWidth: '',
      };
    },
    mounted() {
      this.clientWidth = `${document.documentElement.clientWidth - 150}`;
      this.$refs.imgWidth.style.width = `${this.clientWidth}px`;
    },
    methods: {
      backtrack(e) {
        this.$router.push(e);
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
  .layout{
    height: 100%;
    background-image: url(../../../assets/img/icon/noAccess/grid.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .card-layout{
    padding: 0 35px;
  }
</style>
