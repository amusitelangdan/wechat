<template>
  <div class="layout-img-three" :class="{layoutImgBoxOne: size === 'large', layoutImgBoxTwo: size === 'medium', layoutImgBoxThree: size === 'small'}">
    <img class="layout-img-four" v-lazy="image" :key="image" v-if="image">
    <img class="layout-img-four" src="../../../../../assets/img/img/avatar/teacher_default_avator.png" v-else-if="!image">
  </div>
</template>
<script>
  /**
   * DwPhoto
   * @module components/planning/base/layout/Photo
   * @desc 头像展示组件 内部统一处理url，懒加载等效果，
   * @param {string} [size=large] - 头像尺寸，接受 large(大), medium(中),  small(小)
   *
   * @example
   * <dw-photo v-bind:image="url"></dw-photo>
   */
  export default {
    props: {
      image: String,
      size: {
        type: String,
        default: 'large', // 中medium 小small
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
  .layout-img-three{
    border-radius: 100%;
  }
  .layoutImgBoxOne{
    width: 70px;
    height: 70px;
  }
  .layoutImgBoxTwo{
    width: 50px;
    height: 50px;
  }
  .layoutImgBoxThree{
    width: 34px;
    height: 34px;
  }
  .layout-img-four{
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .layout-img-four[lazy=loading]{
    width: 100%;
    height: 100%;
    margin: auto;
    background: url('../../../../../assets/img/img/147592.gif') no-repeat center;
    background-size: cover;
  }
</style>
