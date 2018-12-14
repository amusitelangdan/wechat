<template>
  <div class="back-white">
    <div class="card" style="padding: 3rem 2rem">
      <el-row type="flex" align="middle" style="margin-bottom: 3rem">
        <el-col :span="7" style="text-align: center">
          <div style="width: 67px; height: 67px; border-radius: 50%; display: inline-block">
            <img v-if="photo !== 'null'" :src="photo" style="width: 67px; height: 67px;">
            <img v-else :src="require('../../../assets/img/img/avatar/defaultAvatar.png')" style="width: 67px; height: 67px;">
          </div>
        </el-col>
        <el-col :span="17">
          <div>
            <span style="font-weight: bolder;font-size: 16px;color: #1a1a1a;margin-bottom: 10px;display: block">{{childNme}}</span>
            <span>邀请你关注</span><span style="color: #f5a625;">[袋鼠麻麻托育中心]</span>
            <br>
            <span>每天关注我的成长</span>
          </div>
        </el-col>
      </el-row>
      <div style="border-radius: 0.5rem; border: 1px solid #C2C2C2; padding: 1rem; position: relative">
        <span style="font-size: 36px; line-height: 100%" class="color-primary">{{inviteCode}}</span>
        <div class="button-block_primary" style="display: inline-block; position: absolute; right: 0; top: 0; margin: 0; height: 100%;
line-height: 65px; padding: 0 1rem; border-radius: 0 0.4rem 0.4rem 0" @success="handleSuccess" @error="handleError" v-clipboard="inviteCode">复制邀请码</div>
      </div>
      <div class="button-block_primary" style="margin-top: 3rem;display: block;" @click="enter">直接进入  袋鼠麻麻</div>
    </div>
  </div>
</template>

<script>
  import { apiConfig as config } from '../../../config/index';

  export default {
    data() {
      return {
        childInfo: {},
        inviteCode: '',
        childId: '',
        bigName: '',
        selectedChildId: '',
        childNme: '',
        photo: '',
      };
    },
    computed: {
    },
    methods: {
      handleSuccess(e) {
        this.$toast('复制成功');
      },
      handleError(e) {
        this.$toast('复制失败，请手动复制');
        // console.log(e);
      },
      enter() {
        window.location.href = config.wechatUrl;
      },
      // 微信链接js-sdk中的分享页面
      wxPreview() {
        wx.ready(() => {
          // 关闭当前网页窗口
          wx.closeWindow();
        });
        wx.error((err) => {
          console.log(err);
        });
      },
      init() {
        this.childNme = decodeURIComponent(this.$route.query.childNme);
        this.inviteCode = this.$route.query.code;
        this.photo = decodeURIComponent(this.$route.query.photo);
      },
    },
    created() {
      this.init();
    },
  };

</script>

<style lang="less">
</style>
