<template>
  <div class="layout" style="overflow: hidden;"  ref="homePage4">
    <div style="overflow:hidden;position: fixed;z-index: 12;top: 73%;left: 50%;transform: translateX(-50%)">
      <div class="button-block_primary"  style="width: 17rem;background: #FFD203" @click="backtrack('/reserve/inputInfo')">预约活动</div>
      <div style="width: 8rem;text-align: center;margin-left: 6.5rem;font-size: 12px;color: #ffffff;height: 14px;" @click="wxPreview">返回公众号</div>
    </div>
    <mt-swipe :auto="0" :prevent="true" :continuous="false">
      <mt-swipe-item style="overflow:hidden;background: #26C881">
        <div style="width: 100%;position: relative;">
          <img src="../../../assets/img/img/touristBrowsing/browsing_one.png" alt="" style="transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" ref="homePage1">
        </div>
      </mt-swipe-item>
      <mt-swipe-item style="overflow:hidden;background: #3EC4E9">
        <div style="width: 100%;position: relative;">
          <img src="../../../assets/img/img/touristBrowsing/browsing_two.png" alt="" style="transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" ref="homePage2">
        </div>
      </mt-swipe-item>
      <mt-swipe-item style="overflow:hidden;background: #FFAB33">
        <div style="width: 100%;position: relative;">
          <img src="../../../assets/img/img/touristBrowsing/browsing_three.png" alt="" style="transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" ref="homePage3">
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        clientHeight: '',
        picScroll: '',
      };
    },
    created() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      clientHeight() {
        this.changFixed(this.clientHeight);
      },
    },
    methods: {
      changFixed(index) {
        this.$refs.homePage1.style.height = `${index}px`;
        this.$refs.homePage2.style.height = `${index}px`;
        this.$refs.homePage3.style.height = `${index}px`;
        this.$refs.homePage4.style.height = `${index}px`;
      },
      backtrack(e) {
        this.$router.push(e);
      },
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
  };
</script>
<style lang="less" scoped>
  .pic-wrapper{
    padding-bottom: 18px;
    width: 100%;
    overflow: hidden;
    .pic-list{
      font-size: 0;
      white-space: nowrap;
      .pic-item{
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
        &:last-child{
          margin-right: 0;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
