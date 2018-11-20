<template>
  <div class="border-b" style="background: #ffffff;">
    <div class="card-cell" style="padding-bottom: 0">
      <!--报告头部-->
      <div style="display: flex;" class="new_card">
        <img :src="require('../../assets/img/icon/defaultAvatar/dsmm_default_avator.png')" alt="" style="display: block;width: 30px;height: 30px;border-radius: 50%;margin-right: 1rem;">
        <div style="flex: 1;">
          <div style="width: 100%;height: 20px;padding-top: .5rem">
            <div style="padding-right: .5rem;float:left;margin: 0;font-size: 16px">袋鼠麻麻</div>
            <div style="float: left;color: #a6a6a6;line-height: 18px;">
              <div>发布·入园欢迎</div>
            </div>
          </div>
        </div>
      </div>
      <!--报告详情-->
      <div class="card-cell" style="padding-bottom: 0;padding-top: 0">
        <!--报告备注-->
        <div class="card">
          <div class="card-cell" style="padding: .8rem 0 0;word-wrap:break-word;">
            欢迎{{childName}}宝宝加入袋鼠麻麻成长生活。
            <br>
            点击图片，了解加入托育园之前的必备须知和袋鼠圈家校互动平台新功能
          </div>
        </div>
        <!--报告照片，视频-->
        <div>
          <div  class="card" style="display: flex;flex-wrap: wrap;margin: .5rem 0">
            <el-col :span="8" v-for="(item, index) in imageUrlList" :key="index">
              <div style="width: 7.5rem;height: 7.5rem;margin: .3rem auto;display: block;position: relative;background: rgba(0,0,0,0.5);overflow:hidden;">
                <img :src="item" alt="" style="position: absolute;width: 7.5rem;top: 50%;left: 50%;transform: translate(-50%,-50%);" @click="preview(item)">
              </div>
            </el-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        openInput: false,
        openReplyInput: false,
        issActive: true,
        content: '',
        reportId: '',
        replyCommentId: '',
        replyCommentContent: '',
        createChildName: '',
        flag: true,
        imageUrlList: ['https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327333662', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327355348', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327357968', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327360944', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327363439', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327366838', 'https://dsmm-test.oss-cn-hangzhou.aliyuncs.com/photos/1539327369819'],
      };
    },
    props: ['childName'],
    computed: {
      ...mapState({
        parseTime: state => state.parseTime,
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    methods: {
      ...mapActions({
        getWxConfig: 'getWxConfig',
      }),
      openComment() {
        this.openInput = !this.openInput;
      },
      // 微信预览图片接口
      preview(item) {
        this.getWxConfig({
          url: window.location.href,
        }).then((res) => {
          wx.config(res.obj);
          wx.ready(() => {
            wx.previewImage({
              current: item, // 当前显示的图片的HTTP链接
              urls: this.imageUrlList, // 需要预览的图片http链接列表
              success(resolve) {
                console.log(resolve);
              },
              cancel(err) {
                console.log(`错误:${err}`);
              },
            });
          });
          wx.error((err) => {
            console.log(`${err}没有走ready`);
          });
        });
      },
    },
    created() {
      // console.log(this.report);
    },
  };
</script>
<style lang="less" scoped>
  .information{
    margin: 0 auto;
    border-radius: 10px;
    background: #ffffff;
    border: 1px #cccccc solid;
  }
  .new_card{
    background-color: white;
    padding-right: 1rem;
    padding-left: 1rem;
    display: flex;
  }
  .card-round{
    background: #ffffff;
    width: 21.8rem;
    margin: 0 auto;
    line-height: 1.5rem;
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 5px;
    box-shadow: 0 .1rem .8rem #f3f3f3,0 -.1rem .8rem #f3f3f3, -.1rem 0 .8rem #f3f3f3, .1rem 0 .8rem #f3f3f3;
  }
  .card-left{
    width: 5rem;
    padding: 3.5rem 1.5rem 0 0.5rem;
    img{
      width: 4rem;
      height: 4rem;
      display: block;
      margin: 0 auto;
    }
  }
  .layout-new{
    display: flex;
    padding-bottom: .5rem;
    padding-top: 0;
    .title{
      font-size: 16px;
      padding: 1.3rem 0 1.1rem;
    }
  }
</style>
