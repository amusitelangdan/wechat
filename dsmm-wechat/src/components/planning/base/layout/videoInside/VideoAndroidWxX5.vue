<template>
  <div class="player " :class=" isFullScreen? 'fullscreen':'' "  >
    <video class='video' controls  
      ref='video' crossOrigin='anonymous' 
      playsinline preload="metadata"
      webkit-playsinline="" 
      x5-video-player-type="h5" x5-video-player-fullscreen="true"
       :src="src">
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
    data() {
      return {
        isFullScreen: false,
      };
    },
    computed: {},
    methods: {},
    mounted() {
      const video = this.$refs.video;
      video.addEventListener('x5videoenterfullscreen', () => {
        this.isFullScreen = true;
      }, false);
      // 退出全屏时，清空状态
      video.addEventListener('x5videoexitfullscreen', () => {
        this.isFullScreen = false;
        video.style.width = '';
        video.style.height = '';
      }, false);

      window.addEventListener('resize', () => {
        if (this.isFullScreen) {
          console.log();
          // 设为屏幕尺寸
          // video.style.width = `${window.screen.width}px`;
          // video.style.height = `${window.screen.height}px`;
          // video.style['object-position'] = '50%';
        }
      }, false);
    },
  };

</script>
<style lang="less" scoped>
  .player {
    width: 100%;
     height: 200px;
    //  outline: 1px solid #ccc
  }
  .fullscreen.player {
      height:auto;
  }
  .video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  .fullscreen .video{
    //  object-position: 50%;
  }
 .fullscreen .video::-webkit-media-controls {
    position: absolute;
    bottom: -10rem;
    z-index: 99999;
}
</style>
