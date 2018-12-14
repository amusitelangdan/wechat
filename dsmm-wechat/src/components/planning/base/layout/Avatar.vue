<template>
  <div style="display: inline-block">
    <div class="layout-img-three" :class="{layoutImgBoxOne: size === 'large', layoutImgBoxTwo: size === 'medium', layoutImgBoxThree: size === 'small'}">
      <img class="layout-img-four" v-lazy="image" :key="image" v-if="image">
      <img class="layout-img-four" src="../../../../assets/img/img/avatar/teacher_default_avator.png" v-else-if="!image">
    </div>
  </div>
</template>
<script>
  /**
   * DwPhoto
   * @module components/planning/base/layout/Photo
   * @desc 头像展示组件 内部统一处理url，懒加载等效果，
   * @param {string} [type=square] - 显示照片类型，接受 square(方形),circle(圆形), fillet（具有圆角的方形）
   * @param {string} [size=large] - 头像尺寸，接受 large(大), medium(中),  small(小)
   *
   * @example
   * <dw-photo v-bind:image="item" v-bind:image-url-list="testImageUrlList" v-for="(item, index) in 整组图片url" :key="index" type="square" :isDelete="true" v-on:deleteImage="传出的删除事件(进行操作)"></dw-photo>
   */
  export default {
    data() {
      return {
        popupDeleteImage: false,
      };
    },
    props: {
      image: String,
      imageUrlList: Array,
      size: {
        type: String,
        default: 'large', // 中medium 小small
      },
      isDelete: {
        type: Boolean,
        default: false,
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>

  .layout-img-three{
    border-radius: 100%;
    margin: 0 auto;
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
    width: 50px;
    height: 50px;
    margin: auto;
    background: url('../../../../assets/img/img/147592.gif') no-repeat center;
    background-size: cover;
  }
</style>
