<template>
  <div>
    <div class="card" style="margin: 0;height: 180px;position: relative;background: #F5F5F5">
      <img src="../../assets/img/icon/service/teach.png" alt="" style="height: 180px;transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" @click="openLink('https://v.xiumi.us/board/v5/3FxZD/106379774')">
    </div>
    <div class="card" style="margin: 0;height: 180px;position: relative;background: #F5F5F5">
      <img src="../../assets/img/icon/service/activity.png" alt="" style="height: 180px;transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" @click="openLink('https://v.xiumi.us/board/v5/3FxZD/106383352')">
    </div>
    <div class="card" style="margin: 0;height: 180px;position: relative;background: #F5F5F5">
      <img src="../../assets/img/icon/service/support.png" alt="" style="height: 180px;transform: translate(-50%,0);position: absolute;top: 0;left: 50%;" @click="toLink('/reserve/inputInfo')">
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      toLink(index) {
        this.$router.push(index);
      },
      openLink(index) {
        window.location.href = index;
      },
    },
  };
</script>
<style lang="less" scoped>
</style>
