<template>
  <div>
    <div style="position: absolute; left: 50%; top: 40%; transform: translateX(-50%) translateY(-50%); text-align: center">
      <img src="../../assets/img/icon/global/blank.png" style="margin-bottom: 1.5rem">
      <br>
      <span class="color-info" style="font-size: 1rem">{{text}}</span>
      <br>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['text'],
    data() {
      return {
      };
    },
  };
</script>
<style lang="less" scoped>
</style>
