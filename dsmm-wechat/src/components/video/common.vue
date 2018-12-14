<template>
  <div class="box" @click='play'>
      <video class='video'  controls ref='video'  poster='//dsmm-oss.oss-cn-hangzhou.aliyuncs.com/photos/视频封面.jpg'  playsinline preload="metadata"
        webkit-playsinline="">
        <source :src="src" type="video/mp4">
        您的浏览器不支持video标签，建议更新浏览器版本
      </video>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/videos/1539854586214.mp4',
      };
    },
    computed: {},
    methods: {
    },
    mounted() {
    },
  };

</script>
<style lang="less" scoped>
  .video {
    width: 100%;
    max-height: 100%;
    height: auto;
  }
  .box {
    background-color: rgba(0, 0, 0, 0.41);
    overflow: hidden;
    position: relative;
    height: 200px;
    width: 100%;
  }
</style>
