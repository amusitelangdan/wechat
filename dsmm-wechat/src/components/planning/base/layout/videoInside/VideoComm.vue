// 说明：视频播放组件，封装好懒加载，视频第一帧等逻辑
// 传入：视频url
<template>
  <div class="video-box" >
      <video class='video'  controls ref='video' playsinline preload="metadata"
        webkit-playsinline="">
        <source :src="src" type="video/mp4">
        您的浏览器不支持video标签，建议更新浏览器版本
      </video>
  </div>
</template>
<script>
  export default {
    props: {
      src: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style lang="less" scoped>
 .video-box {
    background-color: rgba(0, 0, 0, 0.41);
    overflow: hidden;
    position: relative;
    height: 200px;
    width: 100%;
  }
  .video {
    width: 100%;
    max-height: 100%;
    height: auto;
  }
</style>
