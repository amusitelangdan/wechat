<template>
  <div style="width: 100%">
    <img :src="imgUrl" alt="" style="width: 100%">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgUrl: '',
      };
    },
    created() {
      const test = window.location.href;
      const result = test.match(/\?.*url=([^&]*).*/);
      this.imgUrl = decodeURIComponent(result[1]);
    },
  };
</script>
<style scoped lang="less">

</style>
