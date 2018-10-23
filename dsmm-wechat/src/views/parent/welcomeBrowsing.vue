<template>
  <div style="overflow:hidden;">
    <img src="../../assets/img/icon/noAccess/welcome_two.png" alt="" style="width: 100%;position: fixed;top: 0;left: 0;z-index: -1" ref="homePage">
    <div class="button-block_primary"  style="width:20rem;position: absolute;top: 50%;left: 50%;transform: translate(-55%, 50%)" @click="backtrack">了解更多袋鼠麻麻</div>
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
        this.$refs.homePage.style.height = `${index}px`;
      },
      backtrack() {
        window.location.href = 'https://v.xiumi.us/board/v5/3FxZD/106379774';
      },
    },
  };
</script>
<style lang="less" scoped>

</style>
