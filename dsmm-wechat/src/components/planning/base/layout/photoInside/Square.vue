<template>
  <div class="layout-img">
    <img class="image-layout"  v-lazy="image" :key="image">
  </div>
</template>
<script>

  export default {
    props: {
      image: String,
      imageUrlList: Array,
    },
  };
</script>
<style lang="less" scoped>
  .layout-img{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .image-layout{
    width: 100%;
    height: 100%;
    object-fit: cover
  }
  .image-layout[lazy=loading]{
    width: 100%;
    height: 100%;
    margin: auto;
    background: url('../../../../../assets/img/img/147592.gif') no-repeat center;
    background-size: cover;
  }

</style>
