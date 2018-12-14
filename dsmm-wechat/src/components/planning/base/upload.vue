<template>
  <div   class="upload-box" accept="type === 'img' ? 'image/*':'video/*'" multiple="type === 'img' ?'multiple':''" v-loading="uploading">
    <div class="upload-btn" v-if="type === 'img'"  >
      <img src="../../assets/img/icon/global/add_photos.png">
      <div>上传图片</div>
      <input type="file" class="upload-file"  :accept="accept" :multiple="multiple" @change="onUpload" >
    </div>
    <div class="upload-btn" v-if="type === 'video'" >
      <img src="../../assets/img/icon/global/add_video.png">
      <div>上传视频</div>
      <input type="file" class="upload-file"  :accept="accept" :multiple="multiple" @change="onUpload" >
    </div>
  </div>
</template>
<script>
  function noop() {}
  import { mapActions } from 'vuex';
/**
 * @module dw-upload
 * @param {string} [type=img] -上传类型，接受 img, video
 * @param {string} [maxNumber=1] -上传最大数量
 * @param {function} [onChange= function(){}] -上传完成之后回调,返回数组 ['https://oos.daishumm.com/xx/xx.xx','https://oos.daishumm.com/xx/xx.xx']
 * @example
 */
  export default {
    props: {
      type: {
        type: String,
        default: 'img', // img or video
      },
      maxNumber: {
        type: Number,
        default: 1,
      },
      onChange: {
        type: Function,
        default: noop,
      },
    },
    data() {
      if (this.type !== 'img' && this.type !== 'video') {
        throw new TypeError('不识别此类型', this.type);
      }
      return {
        uploading: false,
      };
    },
    components: {
    },
    methods: {
      ...mapActions({
        uploadByOSS: 'uploadByOSS',
      }),
      onUpload(event) {
        if (this.uploading) return;
        const list = Array.from(event.target.files);
        list.length = list.length > this.maxNumber ? this.maxNumber : list.length;
        if (list.length === 0) return;
        debugger;
        this.uploading = true;
        Promise.all(list.map((item) => {
          const fixSize = item.size;
          const uploadFileName = `${this.type === 'img' ? 'photos' : 'videos'}/${(Date.now()).toString()}/${fixSize}`;
          return this.uploadByOSS({ fileName: uploadFileName, fileRaw: item });
        }))
        .then((res) => {
          const urlList = res.map((item) => {
            let httpsUrl = '';
            if (item.slice(0, item.lastIndexOf(':')) === 'http') {
              httpsUrl = `https://${item.slice(7)}`;
            } else {
              httpsUrl = item;
            }
            return httpsUrl;
          });
          return urlList;
        })
        .then((res) => {
          this.onChange(res);
        })
        .catch((error) => {
          this.$toast(this.type === 'img' ? '上传图片失败' : '上传视频失败');
        })
        .finally(() => {
          this.uploading = false;
        });
      },
    },
  };

</script>
<style lang="less" scoped>
  .upload-box {
    position: relative;
    border-radius: 4px;
    background-color: #F5F5F5;
    width: 100px;
    height: 100px;
    text-align: center;
  }

  .upload-btn {
    width: 90px;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    left: 50%;
    top: 50%;

    img {
      width: 45px;
      margin: 0 auto;
    }

    div {
      text-align: center;
      color: #d9d9d9;
      margin: 10px 5px 0;
      height: 15px;
    }
  }

</style>
