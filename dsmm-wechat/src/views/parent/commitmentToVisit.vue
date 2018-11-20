<template>
  <div class="layout" style="overflow: hidden">
    <el-row style="margin-top: 25px;margin-bottom: 25px">
      <el-col :span="5" style="overflow:hidden;">
        <img src="../../assets/img/icon/noAccess/bell.png" alt="" style="width: 50px;height: 50px;display: block;float: right;">
      </el-col>
      <el-col :span="29" style="padding: 1rem 0 0 11px;">
        您已经预约了袋鼠麻麻的服务
      </el-col>
    </el-row>
    <div style="width: 20rem;margin-left: 6rem">
      <div style="margin-top: 1rem">
        <div style="margin: 10px auto;">
          您预约的时间是: {{preserveTime}}
          <br>
          别忘了带宝宝来体验哦
        </div>
        <div style="margin: 10px auto;">您正式入园后，老师会帮您开通宝宝动态</div>
      </div>
    </div>
    <img src="../../assets/img/icon/noAccess/trusteeshipFailed.png" alt="" style="margin: 3rem auto 0;display: block" ref="imgWidth">
  </div>
</template>
<script>
  import { mapState } from 'vuex';

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
    computed: {
      ...mapState({
        preserveTime: state => state.parent.loginTips.preserveTime,
      }),
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
