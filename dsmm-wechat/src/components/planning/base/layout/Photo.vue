<!--不用再分装子组件-->
<!--删除无用代码-->
<!--大小属性设置不要重复[还没有做]-->
<!--提示框交互是否需要图片，甚至是否可以不要提示-->
<template>
  <div class="l-box" :class="['l-box-'+size]">
    <img v-if="type === 'fillet'" class="image-layout layout-img-two" v-lazy="imageUrl" :key="imageUrl" @click="wxPreview">
    <img v-if="type === 'square'" class="image-layout layout-img-three"  v-lazy="imageUrl" :key="imageUrl" @click="wxPreview">
    <img class="layout-img-four image-layout" v-lazy="image" :key="image" v-if="imageUrl && type === 'circle'">
    <img class="layout-img-four image-layout" src="../../../../assets/img/img/avatar/teacher_default_avator.png" v-else-if="!imageUrl && type === 'circle'">
    <!--是否删除-->
    <i class="iconfont icon-deletePhoto imgDelete" v-if="needDelete === true" @click="deleted(imageUrl)"></i>
    <!--图片模态框-->
    <dw-dialog v-if="needDelete === true" v-model="popupDeleteImage" v-on:confirmSubmitted="popupConfirm" widthPercent="70%">
      <div slot="popup-content" style="text-align: center">
        <div style="margin: 10px 0">是否删除这张图片?</div>
        <div  style="margin: 0 auto;">
          <img class="image-layout" :src="photoUrl" style="width: 100px;height: 100px;object-fit: cover">
        </div>
      </div>
    </dw-dialog>
  </div>
</template>
<script>
  import DwDialog from './Dialog';
  /**
   * DwPhotoLayout
   * @module components/planning/base/layout/photoInside/PhotoLayout
   * @desc 图片布局组件,将图片封装了不同类型（圆形，方形），内部统一处理url，懒加载等效果，封装好删除照片的样式和效果
   * @param {Array} [imageUrlList] - 图片url数组,
   * @param {String} [imageUrl] - 图片url,
   * @param {Boolean} [needDelete] - 是否删除,默认false
   * @param {String} [type=square] - 显示照片类型，接受 square(方形), fillet（具有圆角的方形）,circle(圆形)
   * @param {String} [size=] - 显示照片大小，接受 large(大), medium(中),  small(小) 默认为空
   *
   * @example
   * <dw-photo-layout v-for="(item, index) in 图片url数组" v-bind:image-url="item" :key="index" :image-list="图片url数组" :is-delete="是否删除" v-on:deleteImage="删除传出的事件"></dw-photo-layout>
   * <dw-photo-layout v-bind:image-url="图片url" :is-delete="是否删除" v-on:deleteImage="删除传出的事件" size="大小" type="图片样式"></dw-photo-layout>
   */
  export default {
    data() {
      return {
        popupDeleteImage: false,
        photoUrl: '',
      };
    },
    props: {
      imageUrl: String,
      imageList: Array,
      type: {
        type: String,
        default: 'square',
      },
      needDelete: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: '', // 中medium 小small 大large
      },
      // circleSize: {
      //   type: String,
      //   default: '', // 中medium 小small 大large
      // },
    },
    components: {
      DwDialog,
    },
    methods: {
      // 微信链接js-sdk中的查看缩略图
      wxPreview() {
        console.log(this.imageUrl);
        console.log(this.imageList);
        wx.ready(() => {
          wx.previewImage({
            current: this.image, // 当前显示的图片的HTTP链接
            urls: this.imageUrlList, // 需要预览的图片http链接列表
            success(res) {
              console.log('查看成功');
            },
            cancel(err) {
              console.log(err);
            },
          });
        });
        wx.error((err) => {
          console.log(err);
        });
      },
      // 删除图片
      deleted(index) {
        this.popupDeleteImage = true;
        this.photoUrl = index;
      },
      // 确认事件
      popupConfirm() {
        this.$emit('deleteImage', this.photoUrl);
        this.popupDeleteImage = false;
      },
    },
    mounted() {
    },
  };
</script>
<style lang="less" scoped>
  .l-box{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .l-box-large{
     width: 200px;
     height: 200px;
     position: relative;
   }
  .l-box-medium{
    width: 100px;
    height: 100px;
    position: relative;
  }
  .l-box-small{
    width: 50px;
    height: 50px;
    position: relative;
  }
  .imgDelete{
    font-size: 20px;
    position: absolute;
    color: rgba(0,0,0,0.5);
    right: -0.5rem;
    top: -10px;
    z-index: 123;
  }
  .layout-img-two{
    border-radius: 5px
  }
  .image-layout[lazy=loading]{
    width: 100%;
    height: 100%;
    margin: auto;
    background: url('../../../../assets/img/img/147592.gif') no-repeat center;
    background-size: cover;
  }
  .image-layout{
    width: 100%;
    height: 100%;
    object-fit: cover
  }
  .layout-img-four{
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
