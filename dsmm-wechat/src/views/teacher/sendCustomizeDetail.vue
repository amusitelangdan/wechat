<template>
  <div>
    <div v-if="type === '7'" class="card" style="padding-top: .7rem;padding-bottom: .7rem;margin-bottom: 1rem;color: #d9d9d9;">{{time}}</div>
    <div class="card border-all" style="margin: 0" v-if="type !== '7'">
      <child-info style="padding: .5rem 0;" :name="teacherSelectedChildInfo.name" :img="teacherSelectedChildInfo.photo"></child-info>
    </div>
    <div class="card" style="margin-top: 0">
      <div style="background: #ffffff">
        <textarea rows="8" placeholder="今天发生了什么有趣的事呢？老师记录一下吧~" style="-webkit-appearance: none;appearance: none;outline: none; resize: none;width: 100%;border: 0;padding-top: 1rem" v-model="memo" wrap="hard"></textarea>
        <div style="overflow:hidden;margin: .5rem 0;" v-if="videoSure">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
          <!--<play-video v-bind:video-url="videoUrl"></play-video>-->
        </div>
        <div style="margin: 0;display: flex;flex-wrap: wrap; padding: 0 0 1rem;">
          <Thumbnail v-for="(image, index) in imageUrlList" :key="index" v-bind:image="image" v-bind:imageUrlList="imageUrlList"  v-on:deleteImage="deleteImage"></Thumbnail>
          <UploadPhotos v-if="imageUrlList.length <= 8"  v-on:uploaded="uploaded" style="float:left;margin-right: 1rem"></UploadPhotos>
          <UploadVideo v-if="!videoUrl"  v-on:uploaded="uploadedVideo" ></UploadVideo>
        </div>
      </div>
    </div>
    <div class="card" style="background: rgba(0,0,0,0)">
      <div @click="submitSure" class="button-block_primary" style="margin: 20px 0 0;">提&nbsp;交</div>
    </div>
    <mt-popup
      v-model="popVideo"
      popup-transition="popup-fade" style="border-radius: .25rem;" @touchmove.prevent>
      <div class="card" style="width:18rem;border-radius: .25rem;" @touchmove.prevent>
        <div style="padding: 1rem 0;">自定义信息</div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">每日时间:</div>
          <div class="color-warning"  style="float: left">{{time}}</div>
        </div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">老师留言:</div>
          <div class="color-warning"  style="float: left;width: 12rem">{{memo}}</div>
        </div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">精彩集锦:</div>
          <div class="color-warning"  style="float: left">
            <div style="display: flex;flex-wrap: wrap;">
              <div v-for="(item, index) in imageUrlList" :key="index" style="width: 5.5rem;height: 5.5rem;margin: .2rem;overflow:hidden;">
                <img  :src="item" alt="" style="height: 5.5rem;">
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 1rem 0;font-size: 12px;color: #484848;">
          确认后并发送宝宝圈信息
        </div>
        <div class="button-group">
          <div class="button-return_submit" @click="error">返回修改</div>
          <div class="button-sure_submit" @click="success" v-loading="loading">确认发送</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import ChildInfo from '../../components/layout/ChildInfo';
  import Thumbnail from '../../components/layout/Thumbnail';
  import PlayVideo from '../../components/layout/PlayVideo';
  import UploadPhotos from '../../components/button/UploadPhotos';
  import UploadVideo from '../../components/button/UploadVideo';
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import { videoPlayer } from 'vue-video-player';

  export default {
    data() {
      return {
        childId: '',
        imageUrl: '',  // 图片url
        imageUrlList: [], // 多张图片url
        videoUrl: '',
        memo: '',
        deleteImageUrl: '',
        type: '',
        time: '',
        videoSure: false,
        popVideo: false,
      };
    },
    components: {
      UploadPhotos,
      ChildInfo,
      Thumbnail,
      UploadVideo,
      videoPlayer,
      PlayVideo,
    },
    created() {
      this.type = this.$route.query.type;
      this.time = moment().format('YYYY-MM-DD dddd');
    },
    computed: {
      ...mapState({
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        loading: state => state.loading,
      }),
      playerOptions() {
        return JSON.parse(JSON.stringify(this.$store.state.playerOptions));
      },
    },
    methods: {
      ...mapActions({
        postReport: 'teacher/postReport',
      }),
      // 图片上传
      uploaded(index) {
        this.imageUrl = index;
        if (this.imageUrlList.length <= 8) {
          this.imageUrlList.push(index);
        } else {
          this.$toast('最多可以上传九张图片');
        }
      },
      // 视频上传
      uploadedVideo(index) {
        this.playerOptions.sources = [
          {
            type: '',
            src: index, // url地址
          },
        ];
        this.videoUrl = index;
        this.videoSure = true;
      },
      // 删除图片
      deleteImage(index) {
        let num = 0;
        this.imageUrlList.forEach((item, line) => {
          if (item === index) {
            num = line;
            return num;
          }
        });
        this.imageUrlList.splice(num, 1);
      },
      submitSure() {
        this.popVideo = true;
      },
      error() {
        this.popVideo = false;
      },
      success() {
        this.popVideo = false;
        this.postReport({
          type: parseInt(this.type, 10),
          photos: JSON.stringify(this.imageUrlList),
          memo: this.memo.replace(/\r\n/g, '\n').replace(/\n/g, '\n').replace(/\s/g, '\n'),
          videoUrl: this.videoUrl,
          time: this.time,
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  textarea::-webkit-input-placeholder{
    /* WebKit browsers */
    color: #d9d9d9;
  }
  textarea:-moz-placeholder{
    /* Mozilla Firefox 4 to 18 */
    color: #d9d9d9;
  }
  textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d9d9d9;
  }
  textarea:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #d9d9d9;
  }
</style>
