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
      <div class="guide-next">
        <span>2</span>
      </div>
      <div style="width: 7rem;height: 25px;margin: 0  4px;">
        <div style="height: 1px;background: #e0e0e0;width: 100%;margin-top: 13px;"></div>
      </div>
      <div class="guide" style="overflow: hidden">
        <img src="../../assets/img/icon/reserve/flag.png" alt="" style="display: block;margin-top: .2rem;margin-left: .1rem">
      </div>
    </div>
    <div style="padding-top: 1rem;background: #ffffff;">
      <el-row :gutter="26">
        <el-col :span="8" style="text-align: center;color: #e0e0e0;"><span>完善信息</span></el-col>
        <el-col :span="8" style="text-align: center;color: #e0e0e0;"><span>验证联系方式</span></el-col>
        <el-col :span="8" style="text-align: center;color: #f5a627;"><span>完成预约</span></el-col>
      </el-row>
    </div>
    <!-- tab-container -->
    <div>
      <div class="card" style="overflow:hidden;">
        <img :src="require('../../assets/img/icon/global/success_primary.png')" alt="" style="width: 80px;margin: 4rem auto 0;display: block">
        <div>
          <div class="success-title">
            您的预约已收到
          </div>
          <div class="success-text" >
            客服服务中心人员会尽快和您联系确定试托时间
          </div>
        </div>
        <div class="button-block_white" style="margin: 4rem auto; width: 120px" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: '1',
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
    },
  };

</script>

<style scoped lang="less">
  @import "../../assets/css/global";
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
  .success-title {
    text-align: center;
    font-size: 1.5rem;
    margin: 2rem;
  }
  .success-text {
    text-align: center;
    font-size: 1rem;
    line-height: 1.5rem;
    color: @color-info;
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
