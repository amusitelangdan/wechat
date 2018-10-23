<template>
  <div style="overflow:hidden;">
    <img :src="require('../../assets/img/icon/noAccess/welcome_one.png')" alt="" style="width: 20rem;display: block;margin: 8rem auto 2rem;">
    <div class="button-block_primary"  @click="wxPreview">返回公众号</div>
  </div>
</template>
<script>
  export default {
    methods: {
      // 微信链接js-sdk中的分享页面
      wxPreview() {
        wx.ready(() => {
          // 关闭当前网页窗口
          wx.closeWindow();
        });
        wx.error((err) => {
          console.log(err);
        });
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
</style>
