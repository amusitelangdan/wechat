<template>
  <div>
    <div style="height:200px;background:rgba(0,0,0,0.3);margin: 0 auto;" @click="trigger" ref="videoBox">
      <video id="videoThumbnail" ref="videoPlayer" :width="cliWidth" height="200" style="display:none;margin:0 auto;object-fit: fill" :src="`https://${videoUrl.slice(videoUrl.match('dsmm').index)}`" controls="" x5-playsinline="" playsinline="" webkit-playsinline="true" poster="" preload="auto" x-webkit-airplay="true" @play="play" @ended="end" @pause="loadVideo" @loadeddata="captureImage"></video>
    </div>
  </div>
</template>
<script>
  // import html2canvas from 'html2canvas';

  export default {
    data() {
      return {
        cliWidth: '',
      };
    },
    props: ['videoUrl'],
    mounted() {
      this.cliWidth = `${document.documentElement.clientWidth - 40}`;
      window.onresize = function temp() {
        this.cliWidth = `${document.documentElement.clientWidth - 40}`;
      };
      this.$refs.videoBox.style.width = this.cliWidth;
    },
    methods: {
      trigger() {
        this.$refs.videoPlayer.style.display = 'block';
        this.$refs.videoPlayer.play();
      },
      play() {
        // this.$refs.videoPlayer.play();
        // console.log('开始播放触发');
      },
      loadVideo() {
        this.$refs.videoPlayer.style.display = 'none';
        // 暂停播放触发
      },
      end() {
        // console.log(this.$refs.videoPlayer.src);
        // 结束播放触发
        this.$refs.videoPlayer.style.display = 'none';
      },
      captureImage() {
        // console.log(1);
        // console.log('有效帧刚刚触发');
        // setTimeout(() => {
        //   html2canvas(document.getElementById('videoThumbnail'), { allowTaint: true }).then((canvas) => {
        //     canvas.width = document.getElementById('videoThumbnail').clientWidth;
        //     canvas.height = document.getElementById('videoThumbnail').clientHeight;
        //     console.log(canvas);
        //     const image = new Image();
        //     image.setAttribute('crossOrigin', 'Anonymous');
        //     image.onload = function () {
        //       canvas.getContext('2d').drawImage(document.getElementById('videoThumbnail'), 0, 0, canvas.width, canvas.height);
        //       image.src = canvas.toDataURL('image/png');
        //       console.log(1`${image.src}`);
        //       document.getElementById('output').appendChild(image);
        //     };
        //   });
        // }, 1000);
      },
    },
  };
</script>
<style lang="less" scoped>

</style>
