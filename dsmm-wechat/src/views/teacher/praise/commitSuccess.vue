<template>
  <div style="background-color: #fff;height: 100%;overflow:hidden;">
    <div class="icon" style="margin-top: 6rem;"></div>
    <div>
      <h3>您的好评已收到</h3>
      <div class="font">
        请耐心等待审核结果
        <br>
        可在我的好评查阅审核情况
      </div>
    </div>
    <div class="button-block_white" style="margin: 4rem auto; width: 120px;" @click="back">返回</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      back() {
        this.$router.go(-2);
      },
    },
  };
</script>

<style lang="less" scoped>
  .icon{
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background-image: url(../../../assets/img/icon/global/success_primary.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 auto 1rem;
  }
  h3{
    text-align: center;
  }
  .font{
    text-align: center;
    line-height: 18px;
  }
</style>
