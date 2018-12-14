<template>
  <img class="image-layout layout-img-two" v-lazy="image" :key="image">
</template>
<script>
  export default {
    props: {
      image: String,
    },
  };
</script>
<style lang="less" scoped>
  /*照片大小*/
  .layout-img-two{
    border-radius: 5px
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
