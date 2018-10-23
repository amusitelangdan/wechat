<template>
  <div class="back-white">
    <div class="card" style="padding-top: 8rem;">
      <div style="text-align: center">
        <img src="../../assets/img/icon/global/success_primary.png" class="success-img">
        <div v-if="type === '投诉举报'">
          <div class="success-title">
            您的投诉已收到
          </div>
          <div class="success-text" >
            抱歉，我们的服务没有做好。
            <br>
            我们会非常重视每一个投诉。
            <br>
            客户服务中心工作人员会尽快和您联系，
            <br>
            了解您遇到的问题。
          </div>
        </div>
        <div v-if="type === '意见反馈'">
          <div class="success-title">
            您的投诉已收到
          </div>
          <div class="success-text">
            我们期待把更好的服务带给您。
          </div>
        </div>
      </div>
      <div class="button-block_white" style="margin: 4rem auto; width: 116px;font-size: 18px;" @click="back">返回</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: '',
      };
    },
    methods: {
      back() {
        this.$router.go(-2);
      },
      init() {
        this.type = this.$route.query.type;
      },
    },
    created() {
      this.init();
    },
  };
</script>

<style lang="less" scoped>
  @import "../../assets/css/global";
  .success-img {
    width: 80px;
  }
  .success-title {
    text-align: center;
    font-size: 1.5rem;
    margin: 2rem;
  }
  .success-text {
    text-align: center;
    font-size: 1rem;
    line-height: 1.5rem;
    color: @color-info;
  }
</style>
