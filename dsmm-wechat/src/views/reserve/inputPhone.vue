<template>
  <div style="overflow-x: hidden">
    <div class="card border-b">
      <div class="card-cell">
        <div style="display: inline-block; width: 160px">
          <el-row type="flex" :gutter="14" align="middle">
            <el-col :span="10">
              <div class="head">
                <img src="../../assets/img/icon/global/address_photo.png" alt="" style="width: 48px;height: 48px;display: inline-block">
              </div>
            </el-col>
            <el-col :span="14">
              <div style="white-space: nowrap;font-size: 14px;">袋鼠麻麻·托育园</div>
              <div style="margin-top: 0.2rem; white-space: nowrap;color: #c1c1c1;" >挖掘儿童潜能，培养阳光性格</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="card" style="display: flex;padding: 1rem 3rem 0;margin: 0;">
      <div class="guide-next">
        <img src="../../assets/img/icon/reserve/check_mark.png" alt="">
      </div>
      <div style="width: 7rem;height: 25px;margin: 0  4px;">
        <div style="height: 1px;background: #e0e0e0;width: 100%;margin-top: 13px;"></div>
      </div>
      <div class="guide">
        <span>2</span>
      </div>
      <div style="width: 7rem;height: 25px;margin: 0  4px;">
        <div style="height: 1px;background: #e0e0e0;width: 100%;margin-top: 13px;"></div>
      </div>
      <div class="guide-next" style="overflow: hidden">
        <img src="../../assets/img/icon/reserve/flag.png" alt="" style="display: block;margin-top: .2rem;margin-left: .1rem">
      </div>
    </div>
    <div style="padding-top: 1rem;background: #ffffff;">
      <el-row :gutter="26">
        <el-col :span="8" style="text-align: center;color: #e0e0e0;"><span>完善信息</span></el-col>
        <el-col :span="8" style="text-align: center;color: #f5a627;"><span>验证联系方式</span></el-col>
        <el-col :span="8" style="text-align: center;color: #e0e0e0;"><span>完成预约</span></el-col>
      </el-row>
    </div>
    <!-- tab-container -->
    <div>
      <div class="card" style="padding-top: 2rem;padding-bottom: 2rem">
        <div class="card" style="font-size: 18px;color: #f5a626;text-align: center;margin: 0 0 2rem;">请完成信息验证</div>
        <div style="display: flex;border: 1px #F5A626 solid;border-radius: .3rem;">
          <input  type="number" placeholder="您的手机" v-model="phone" class="phone-tel">
          <div class="button-inline_primary_transparent button-code" @click="getPhoneCode">{{verificationCode}}</div>
        </div>

        <div style="display: flex;border: 1px #F5A626 solid;margin-top: 1rem;border-radius: .3rem">
          <input  type="number" placeholder="输入验证码" v-model="code" style="flex: 1;padding:1rem 1rem;border: 0;border-radius: .5rem">
        </div>
      </div>
      <div class="button-block_primary" style="margin-top: 20px;" @click="confirm">确认</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  let clearTimer = null;
  export default {
    data() {
      return {
        code: '',
        phone: '',
        verificationCode: '发送验证码',
        start: true,
      };
    },
    computed: {
      ...mapState({
        reserveInfo: state => state.reserveInfo,
      }),
    },
    destroyed() {
      if (clearTimer) {
        clearInterval(clearTimer);
      }
    },
    methods: {
      ...mapActions({
        getPhoneVerificationCode: 'getPhoneVerificationCode',
        postReserve: 'postReserve',
      }),
      confirm() {
        let sexValue = '';
        if (this.reserveInfo.sexValue.toString() === '1') {
          sexValue = '男';
        } else {
          sexValue = '女';
        }
        const memo = `性别${sexValue}月龄${this.reserveInfo.relation}`;
        if (this.phone !== '' && this.code !== '') {
          this.postReserve({
            phoneNumber: parseInt(this.phone, 10),
            randomCode: this.code,
            parentName: this.reserveInfo.username,
            childName: this.reserveInfo.childName,
            storeId: parseInt(this.reserveInfo.storeValue, 10),
            sourceType: 15,
            activityName: '微信公众号预约',
            memo,
          }).then(() => {
            this.$router.replace('/reserve/success');
          });
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
    },
  };

</script>

<style scoped lang="less">
  .button-submit{
    position: fixed;
    margin: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
  }
  .button-code{
    width: 6rem;
    text-align: center;
    padding:.5rem 1rem;
    border:0;
    border-radius: 0 .3rem .3rem 0;
  }
  .phone-tel{
    border: 0;
    flex: 1;
    padding:.5rem 1rem;
    border-right: 1px #F5A626 solid;
    border-radius: .3rem 0 0 .3rem;
  }
  .head{
    border-radius: 50%;
    overflow: hidden;
    width: 48px;
    height: 48px;
    position: relative
  }
  .head-img{
    width: 100%;
    vertical-align: middle;
    top: 50%;
    position: absolute;
    transform: translateY(-50%)
  }
  .guide{
    padding: .28rem .6rem;
    border-radius: 100%;
    background: #f5a627;
    color: #ffffff;
    text-align: center;
    img{
      width: 12px;
      display: inline-block;
    }
    span{
      width: 12px;
      text-align: center;
      display: inline-block;
    }
  }
  .guide-next{
    padding: .28rem .6rem;
    border-radius: 100%;
    background: #e0e0e0;
    color: #ffffff;
    text-align: center;
    img{
      width: 12px;
      display: inline-block;
      /*margin-top: .3rem*/
    }
    span{
      width: 12px;
      text-align: center;
      display: inline-block;
    }
  }
</style>
