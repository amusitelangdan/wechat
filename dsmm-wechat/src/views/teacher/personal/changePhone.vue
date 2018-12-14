<template>
<div>
  <div style="margin-bottom: 20px;">
    <div class="oldFont">请填写原来绑定的手机号码</div>
    <dw-around-card style="padding: 0 1rem;margin: 0">
      <dw-setting-show slot="housing-content">
        <div slot="left" style="width:4rem;padding-right: 1rem;">原手机号</div>
        <div slot="center">
          <input type="number" v-model="oldPhone" placeholder="填写手机号码" style="width: 100%">
        </div>
      </dw-setting-show>
    </dw-around-card>
  </div>
  <div>
    <div class="oldFont" style="padding-top:0; ">请验证新的手机号码</div>
    <dw-around-card style="padding: 0 1rem;margin: 0" class="border-b">
      <dw-setting-show slot="housing-content">
        <div slot="left" style="width:4rem;padding-right: 1rem;">新手机号</div>
        <div slot="center">
          <input type="number" v-model="phone" placeholder="填写手机号码" style="width: 100%">
        </div>
      </dw-setting-show>
    </dw-around-card>
    <div style="display: flex">
      <dw-around-card style="padding: 0 1rem;margin: 0;flex: 1;">
        <dw-setting-show slot="housing-content">
          <div slot="left" style="width:4rem;padding-right: 1rem;">验证码</div>
          <div slot="center">
            <input type="number" v-model="code" placeholder="输入验证码" style="width: 100%">
          </div>
        </dw-setting-show>
      </dw-around-card>
      <dw-around-card style="padding: 0 1rem;margin: 0;" class="border-l code" @click.native="getPhoneCode">
        <dw-setting-show slot="housing-content">
          <div slot="center">{{verificationCode}}</div>
        </dw-setting-show>
      </dw-around-card>
    </div>
  </div>
  <div class="button-block_primary button" @click="addPraise">确定</div>
</div>
</template>
<script>
  import { mapActions } from 'vuex';
  import DwSettingShow from '../../../components/layout/base/Row';
  import DwAroundCard from '../../../components/layout/base/Card';

  let clearTimer = null;
  export default {
    data() {
      return {
        oldPhone: '',
        code: '',
        phone: '',
        verificationCode: '发送验证码',
        start: true,
      };
    },
    components: {
      DwSettingShow,
      DwAroundCard,
    },
    destroyed() {
      if (clearTimer) {
        clearInterval(clearTimer);
      }
    },
    methods: {
      ...mapActions({
        getPhoneVerificationCode: 'getPhoneVerificationCode',
        postTeacherPhone: 'teacher/postTeacherPhone',
      }),
      addPraise() {
        if (this.phone !== '' && this.code !== '' && this.oldPhone !== '') {
          if (/^(13|15|18|17)\d{9}$/i.test(this.phone)) {
            if (this.phone !== this.oldPhone) {
              this.postTeacherPhone({
                phoneNumber: this.phone,
                oldPhoneNumber: this.oldPhone,
                verifyCode: this.code,
              }).then((res) => {
                if (res.code.toString() === '200') {
                  this.$toast('手机号修改成功');
                  this.$router.go(-1);
                }
              });
            } else {
              this.$toast('新手机号码不能和原手机号码相同');
            }
          } else {
            this.$toast('原手机号码格式不符');
          }
        } else if (this.oldPhone === '' && this.phone !== '' && this.code !== '') {
          this.$toast('请输入原手机号码');
        } else if (this.phone === '' && this.oldPhone !== '' && this.code !== '') {
          this.$toast('请输入新手机号码');
        } else if (this.phone !== '' && this.oldPhone !== '' && this.code === '') {
          this.$toast('请输入验证码');
        } else {
          this.$toast('请完善信息');
        }
      },
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
          } else {
            this.$toast('请输入正确手机号码');
          }
        } else {
          this.$toast('请输入手机号码');
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .button{
    margin-top: 2rem;
  }
  .oldFont{
    padding: 1rem;
    color: #797979;
  }
  .oldPhone{
    padding: 1rem;
    background: #fff;
    input{
      border:0;
      padding-left: .5rem;
      flex: 1;
    }
  }
  .code{
    text-align: center;
    padding: 1.1rem 0;
    background: #fff;
    color: #F5A623
  }
  .change{
    text-align: center;
    padding: 3rem;
    font-size: 18px
  }
  .surePhone{
    text-align: center;
    padding: 1rem 0;
    font-size: 18px;
    color: #F5A623
  }
</style>
