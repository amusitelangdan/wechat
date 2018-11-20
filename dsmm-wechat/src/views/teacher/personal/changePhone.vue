<template>
<div>
  <div style="margin-bottom: 1.5rem;">
    <div class="oldFont">请填写原来绑定的手机号码</div>
    <div class="oldPhone">
      <span>原手机号</span>
      <input type="number" v-model="oldPhone" placeholder="填写手机号码">
    </div>
  </div>
  <div>
    <div class="oldFont">请验证新的手机号码</div>
    <div class="oldPhone border-b">
      <span>新手机号</span>
      <input type="number" v-model="phone" placeholder="填写手机号码">
    </div>
    <div style="display: flex">
      <div class="oldPhone" style="flex: 1">
        <div>
          <span>验证码</span>
          <input type="number" v-model="code" placeholder="输入验证码">
        </div>
      </div>
      <div class="border-l code" @click="getPhoneCode">{{verificationCode}}</div>
    </div>
  </div>
  <div class="button-block_primary button" @click="addPraise">确定</div>
  <mt-popup
    v-model="popupVisible" style="border-radius: 5px" popup-transition="popup-fade">
    <div class="card" style="width: 300px;border-radius: 5px;padding: 0">
      <div class="border-b change">
        <span>dui</span>
        <span>手机号修改成功</span>
      </div>
      <div class="surePhone" @click="closePopup">
        确定
      </div>
    </div>
  </mt-popup>
</div>
</template>
<script>
  import { mapActions } from 'vuex';

  let clearTimer = null;
  export default {
    data() {
      return {
        oldPhone: '',
        code: '',
        phone: '',
        verificationCode: '发送验证码',
        start: true,
        popupVisible: false,
      };
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
                  this.popupVisible = true;
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
      closePopup() {
        this.popupVisible = false;
        this.$router.go(-1);
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
    }
  }
  .code{
    width: 100px;
    text-align: center;
    line-height: 46px;
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
