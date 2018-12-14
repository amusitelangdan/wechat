<template>
   <video-android-wx-x5 v-if='isAndroidWx' key='video' :src="src" ></video-android-wx-x5>
   <video-common  v-else key='video' :src="src" ></video-common>
</template>
<script>
  import videoCommon from './videoInside/VideoComm';
  import videoAndroidWxX5 from './videoInside/VideoAndroidWxX5';
  import { isAndroid, isWeixin } from '../../../../utils/validate';

export default {
    props: {
      src: {
        type: String,
        default: '',
      },
    },
    data() {
      const isAndroidWx = isAndroid() && isWeixin();
      return {
        isAndroidWx,
      };
    },
    components: {
      videoAndroidWxX5,
      videoCommon,
    },
    computed: {},
    methods: {
    },
    mounted() {
    },
};
</script>
<style lang="less" scoped>

</style>
