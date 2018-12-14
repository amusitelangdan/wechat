<script>
  import { videoPlayer } from 'vue-video-player';
/**
 * @module dw-video
 * @param 参数参照videojs
 * @event 事件参照videojs
 */
  export default {
    extends: videoPlayer,
    name: 'dw-video',
    props: {
  
    },
  };
</script>
<style lang="less">
.video-js .vjs-tech {
  width: 100%;
  object-position:center center;
  top:0;
}
</style>