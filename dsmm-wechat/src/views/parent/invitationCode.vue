<template>
  <div class="back-white">
    <div class="card" style="padding: 3rem 2rem">
      <el-row type="flex" align="middle" style="margin-bottom: 3rem">
        <el-col :span="7" style="text-align: center">
          <div style="width: 67px; height: 67px; border-radius: 50%; display: inline-block">
            <img v-if="childInfo.photo" :src="childInfo.photo" style="width: 67px; height: 67px;">
            <img v-else :src="require('../../assets/img/icon/defaultAvatar/defaultAvatar.png')" style="width: 67px; height: 67px;">
          </div>
        </el-col>
        <el-col :span="17">
          <div>
            <span style="font-weight: bolder;font-size: 16px;color: #1a1a1a;margin-bottom: 10px;display: block">{{childInfo.name}}</span>
            <span>邀请大家关注</span><span style="color: #f5a625;">[袋鼠麻麻托育中心]</span>
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
      <div  style="margin-top: 3rem">
        <img src="../../assets/img/icon/sendDetailComponents/invitation_logo.png" alt="" style="width: 22rem;">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        childInfo: {},
        inviteCode: '',
        childId: '',
        bigName: '',
      };
    },
    computed: {
      ...mapState({
        childList: state => state.parent.childList,
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    methods: {
      ...mapActions({
        getInviteCode: 'parent/getInviteCode',
        getWxConfig: 'getWxConfig',
      }),
      handleSuccess(e) {
        this.$toast('复制成功');
      },
      handleError(e) {
        this.$toast('复制失败，请手动复制');
      },
      parseChild() {
        this.childList.forEach((child) => {
          if (child.id === this.selectedChildId) {
            this.childInfo = child;
          }
        });
      },
      // 微信链接js-sdk中的分享页面
      wxPreview() {
        this.getWxConfig({
          url: window.location.href,
        }).then((res) => {
          wx.config(res.obj);
          const title = '一起关注我家宝宝在袋鼠托育园茁壮成长';
          const link = `${window.location.href.split('#')[0]}#/parent/invite/success?childNme=${encodeURIComponent(this.childInfo.name)}&code=${this.inviteCode}&photo=${encodeURIComponent(this.childInfo.photo)}`;
          wx.ready(() => {
            wx.hideMenuItems({
              menuList: ['menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title,
              link,
              desc: '邀请亲戚朋友一同关注宝宝成长生活',
              imgUrl: 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E9%82%80%E8%AF%B7%E7%BB%91%E5%AE%9A.png',
              success(resolve) {
                console.log(resolve);
              },
            });
          });
          wx.error((err) => {
            console.log(err);
          });
        });
      },
      init() {
        this.parseChild();
        this.getInviteCode({
          childId: this.selectedChildId,
        }).then((res) => {
          this.inviteCode = res.obj.inviteCode;
          this.wxPreview();
        });
      },
    },
    created() {
      this.init();
    },
  };

</script>

<style lang="less">
</style>
