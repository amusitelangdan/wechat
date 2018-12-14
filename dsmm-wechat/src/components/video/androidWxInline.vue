<template>
  <div class="box" >
      <video class='video' controls poster='//dsmm-oss.oss-cn-hangzhou.aliyuncs.com/photos/视频封面.jpg'  ref='video' crossOrigin='anonymous'  playsinline preload="metadata"
        webkit-playsinline=""  >
        <source :src="src" type="video/mp4">
      </video>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        src: 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/videos/1539854586214.mp4',
        imgUrl: '',
        isShow: true,
        isPlay: false,
        muted: true,
      };
    },
    computed: {
    },
    methods: {
    },
    mounted() {
      const video = this.$refs.video;
      video.autoplay = true;
      document.addEventListener('WeixinJSBridgeReady', () => {
        video.play();
      }, false);

      video.addEventListener('loadeddata', () => {
        video.pause();
      });
    },
  };

</script>
<style lang="less" scoped>
  .video {
    width: 100%;
    max-height: 100%;
    height: auto;
  }
  .box{
    background-color: rgba(0, 0, 0, 0.41);
    overflow: hidden;
    position: relative;
    height: 200px;
    width: 100%;
  }
   

</style>
