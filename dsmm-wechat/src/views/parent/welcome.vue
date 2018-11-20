<template>
  <div class="layout" style="overflow: hidden">
    <el-row style="margin-top: 25px">
      <el-col :span="5" style="overflow:hidden;">
        <img src="../../assets/img/icon/noAccess/bell.png" alt="" style="width: 50px;height: 50px;display: block;float: right;">
      </el-col>
      <el-col :span="29" style="padding: 1rem 0 0 11px;">
        你的手机号码未在托育园登记过
        <br>
        此页面是托育园区内部宝宝家校互动平台
      </el-col>
    </el-row>
    <div class="card-layout">
      <img src="../../assets/img/icon/noAccess/childWelcome.png" alt="" style="margin: 1rem auto 0;display: block" ref="imgWidth">
      <div style="margin-top: 1rem">
        <div style="margin-bottom: 10px;color: #6d6d6d">如果你家宝宝在园区学习成长</div>
        <div class="button-block_primary" style="margin: 0"  @click="backtrack('/parent/acceptInvitation')">绑定宝宝信息</div>
      </div>
      <div style="margin-top: 2rem">
        <div style="margin-bottom: 10px;color: #6d6d6d">如果你家宝宝想体验托育服务</div>
        <div class="button-block_primary" style="margin: 0" @click="backtrack('/reserve/inputInfo')">预约体验</div>
      </div>
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
      this.clientWidth = `${document.documentElement.clientWidth - 73}`;
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
    background-image: url(../../assets/img/icon/noAccess/grid.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .card-layout{
    padding: 0 35px;
  }
</style>
