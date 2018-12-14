<template>
   <video-android-wx-inline v-if='isAndroidWx&&isInline' key='video'></video-android-wx-inline>
   <video-android-wx-x5 v-else-if='isAndroidWx&&!isInline' key='video'></video-android-wx-x5>
   <video-common  v-else key='video'></video-common>
</template>
<script>
  import videoCommon from './common';
  import videoAndroidWxInline from './androidWxInline';
  import videoAndroidWxX5 from './androidWxX5';
  import { isAndroid, isWeixin } from '../../utils/validate';

export default {
    props: {
      isInline: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      const isAndroidWx = isAndroid() && isWeixin();
      return {
        isAndroidWx,
      };
    },
    components: {
      videoAndroidWxInline,
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
