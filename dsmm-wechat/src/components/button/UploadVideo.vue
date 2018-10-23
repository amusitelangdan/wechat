<template>
  <div style="display: inline-block; position: relative">
    <div class="back-grey border4radius" style="width: 100px; height: 100px;position: relative;" v-loading="uploading">
      <div style="display: flex;flex-direction: column;width: 90px;transform: translateX(-50%) translateY(-50%); position: absolute; left: 50%; top: 50%;">
        <img src="../../assets/img/icon/global/add_video.png" style="width: 45px;margin: 0 auto;display: block;">
        <div style="text-align: center;color: #d9d9d9;margin: 10px 5px 0;height: 15px;">上传视频</div>
      </div>
    </div>
    <input type="file" style="position: absolute; z-index: 999; width: 100px; height: 100px; top: 0; opacity: 0;" accept="video/*" @change="addVideo">
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default{
    data() {
      return {
        sheetVisible: false,
      };
    },
    computed: {
      ...mapState({
        uploading: state => state.uploading,
      }),
    },
    methods: {
      ...mapActions({
        uploadVideo: 'uploadVideo',
      }),
      addVideo(event) {
        const file = event.target.files[0];
        const uploadFileName = `videos/${(Date.now()).toString()}.mp4`;
        this.uploadVideo({ fileName: uploadFileName, fileRaw: file }).then((url) => {
          let httpsUrl = '';
          // 判断:返的如果是http则改为https
          if (url.slice(0, url.lastIndexOf(':')) === 'http') {
            httpsUrl = `https://${url.slice(7)}`;
          } else {
            httpsUrl = url;
          }
          this.$emit('uploaded', httpsUrl);
        });
      },
    },
  };

</script>
<style lang="less" scoped>
  .back-grey {
    background-color: #F5F5F5;
  }
  .border4radius {
    border-radius: 4px;
  }
  .el-icon-loading{
    color: #F5A626;
  }
</style>
