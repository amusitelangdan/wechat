<template>
  <div>
    <!--顶部方块-老师入口-->
    <div class="card parent" v-if="showMore">
      <el-row style="text-align: center;">
        <el-col :span="12" class="border-r" @click.native="jumpRouting('/service/center')">
          <img :src="require('../assets/img/icon/parentIndex/parent_head_one.png')" alt="" style="width: 3rem;height: 3rem;padding: 1rem 0 0;">
          <div class="loginFont" style="padding: 0rem 0 .5rem;">袋鼠服务</div>
        </el-col>
        <el-col :span="12" @click.native="jumpRouting(`/reserve/inputInfo?childId=${selectedChildId}`)">
          <img :src="require('../assets/img/icon/parentIndex/parent_head_two.png')" alt="" style="width: 2.5rem;height: 3.5rem;padding: .5rem 0 0;">
          <div class="loginFont" style="padding: 0rem 0 .5rem;">预约活动</div>
        </el-col>
      </el-row>
      <el-row style="text-align: center;" class="border-t">
        <el-col :span="12" class="border-r" @click.native="jumpRouting('/service/feedback')">
          <img :src="require('../assets/img/icon/parentIndex/parent_head_three.png')" alt="" style="width: 3rem;height: 3rem;padding: 1rem 0 0;">
          <div class="loginFont" style="padding: 0rem 0 .5rem;">意见反馈</div>
        </el-col>
        <el-col :span="12" @click.native="jumpRouting(`/service/personal?childId=${selectedChildId}`)">
          <img :src="require('../assets/img/icon/parentIndex/parent_head_four.png')" alt="" style="width: 3rem;height: 3rem;padding: 1rem 0 0;">
          <div class="loginFont" style="padding: 0rem 0 .5rem;">个人中心</div>
        </el-col>
      </el-row>
    </div>

    <!--登录卡片-宝宝动态入口-->
    <div class="dynamic" style="box-shadow: 0 5px 8px #cccccc;z-index: 12;margin-top: 14px"  v-if="showMore">
      <div class="border-b" style="width: 100%;height: 46px;line-height: 46px;background: #ffffff;">
        <div style="float: left;padding-left: 20px;font-weight: bolder;color: #f5a627;overflow:hidden;">
          <div style="width: 20px;height: 46px;float:left;">
            <img :src="require('../assets/img/icon/parentIndex/parent_head_dynamics.png')" alt="" style="width: 17px;height: 17px;vertical-align:middle;">
          </div>
          <div style="height: 46px;line-height: 48px;float:left;">
            宝宝动态
          </div>
        </div>
        <div style="float: right;padding-right: 20px;font-size: 12px"  @click="link('/tourist/browsing')">
          <div style="margin-left: 10px;float:left;"><div style="color: #bcbcbc;float:left;margin-right: .8rem">游客浏览了解袋鼠圈</div>
            <div style="float: left;margin-top: .15rem">
              <img src="../assets/img/icon/global/arrow-right.png" alt="" style="width: .5rem;height: 1rem;">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card parent-login" style="padding: 0 2rem; height: 100%" v-if="showMore" ref="cars">
      <div style="padding-top: 4rem;">
        登录查看宝宝在园动态
      </div>
      <input class="input_line" type="number" placeholder="输入手机号" v-model="phone">
      <div style="position: relative">
        <input class="input_line" type="number" placeholder="输入验证码" v-model="code" style="position: relative; z-index: 0">
        <div class="button-inline_primary_transparent" style="position: absolute; right: 0; top: 50%; z-index: 1; transform: translateY(-50%);" @click="getPhoneCode">{{verificationCode}}</div>
      </div>
      <div class="button-block_primary" style="margin: 2rem 0;" @click="login">登录</div>
      <div style="color: #C2C2C2; font-size: 12px; margin-bottom: 1rem">
        宝宝没入园，你可选择<div class="reserve"  @click="link('/reserve/inputInfo')">预约活动</div>或了解<div class="reserve" style="margin-right: 0" @click="link('/service/center')">袋鼠服务</div>
      </div>
    </div>

    <!--登录卡片-通用入口-->
    <div class="card" style="padding: 0 2rem; height: 100%" v-if="!showMore" ref="cars">
      <div style="padding-top: 2rem;">
        <img src="../assets/img/icon/global/logo.png" style="display: block; width: 90%; margin: 2rem auto">
      </div>
      <input class="input_line" type="number" placeholder="输入手机号" v-model="phone">
      <div style="position: relative">
        <input class="input_line" type="number" placeholder="输入验证码" v-model="code" style="position: relative; z-index: 0">
        <div class="button-inline_primary_transparent" style="position: absolute; right: 0; top: 50%; z-index: 1; transform: translateY(-50%);" @click="getPhoneCode">{{verificationCode}}</div>
      </div>
      <div class="button-block_primary" style="margin: 2rem 0;" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import config from '../api/config';

  let clearTimer = null;
  export default {
    data() {
      return {
        phone: '',
        code: '',
        start: true,
        verificationCode: '发送验证码',
        showMore: false,
        clientHeight: '',
      };
    },
    computed: {
      ...mapState({
        originalUrl: state => state.originalUrl,
      }),
    },
    destroyed() {
      if (clearTimer) {
        clearInterval(clearTimer);
      }
    },
    methods: {
      ...mapActions({
        getWechatCode: 'getWechatCode',
        getPhoneVerificationCode: 'getPhoneVerificationCode',
      }),
      getPhoneCode() {
        if (this.phone) {
          if (/^(13|15|18|17)\d{9}$/i.test(this.phone)) {
            let maxTime = 60;
            if (this.start) {
              this.start = false;
              // 获取验证码
              this.getPhoneVerificationCode({
                phoneNumber: this.phone,
              }).then((res) => {
                // debugger;
                if (res.code === 200) {
                  clearTimer = setInterval(() => {
                    if (maxTime > 0 && maxTime !== 1) {
                      maxTime -= 1;
                      this.verificationCode = `${maxTime}s后刷新`;
                    } else {
                      clearInterval(clearTimer);
                      this.verificationCode = '发送验证码';
                      this.start = true;
                    }
                  }, 1000);
                } else {
                  this.start = true;
                }
              }).catch((err) => {
                this.start = true;
                console.error('err', err);
              });
            }
          // .finally(() => {
          //     this.start = true;
          //   });
          } else {
            this.$toast('请输入正确手机号码');
          }
        } else {
          this.$toast('请输入手机号码');
        }
      },
      // 提交
      login() {
        /*
        * 1.获取微信返回给的code
        * 1.1 通过getWeChatCode将URL传递给后台接口，然后通过微信，链接会直接跳res.obj.url
        * */
        if (this.phone !== '' && this.code !== '') {
          this.getWechatCode({
            originalUri: `${config.baseFrontUrl}loginBlank?userPhone=${this.phone}&phoneCode=${this.code}&sourcePathName=${this.$route.query.sourcePathName}`,
          }).then((res) => {
            window.location.href = res.obj.url;
          });
        } else if (this.phone === '') {
          this.$toast('请输入手机号码');
        } else if (this.code === '') {
          this.$toast('请输入验证码');
        } else if (this.phone === '' && this.code === '') {
          this.$toast('请输入手机号码和验证码');
        }
      },
      // 路由跳转
      jumpRouting(index) {
        this.$router.push(index);
      },
      link(index) {
        this.$router.push(index);
      },
    },
    created() {
      if (localStorage.getItem('w-token')) {
        if (this.$route.query.sourcePathName === '宝宝动态首页') {
          this.$router.replace('parent/index');
        } else if (this.$route.query.sourcePathName === '个人中心') {
          this.$router.replace('/service/personal');
        } else if (this.$route.query.sourcePathName === '老师工作台') {
          this.$router.replace('/teacher/index');
        }
        // this.$router.replace(this.$route.query.sourcePathName);
      } else if (!localStorage.getItem('w-token')) {
        if (this.$route.query.sourcePathName === '宝宝动态首页' || this.$route.query.sourcePathName === '个人中心') {
          this.showMore = true;
        }
      }
    },
    mounted() {
      if (this.$route.query.sourcePathName === '宝宝动态首页' || this.$route.query.sourcePathName === '个人中心') {
        this.clientHeight = `${document.documentElement.clientHeight}`;
        const parentLogin = document.getElementsByClassName('parent-login')[0].clientHeight;
        const parentHeight = parseInt(this.clientHeight, 10) - document.getElementsByClassName('parent')[0].clientHeight - document.getElementsByClassName('dynamic')[0].clientHeight - 14;
        if (parentLogin < parentHeight) {
          this.$refs.cars.style.height = `${parseInt(this.clientHeight, 10) - document.getElementsByClassName('parent')[0].clientHeight - document.getElementsByClassName('dynamic')[0].clientHeight - 14}px`;
        }
      } else {
        this.clientHeight = `${document.documentElement.clientHeight}`;
        this.$refs.cars.style.height = `${parseInt(this.clientHeight, 10)}px`;
      }
    },
  };
</script>
<style lang="less" scoped>
  @import "../assets/css/global";
  .reserve{
    display: inline-block;
    border-radius: 16px;
    text-align: center;
    padding-left: .5rem;
    padding-right: .5rem;
    font-weight: lighter;
    border: 1px solid @color-primary;
    color: @color-primary;
    margin: 0 .4rem;
  }
</style>
