<template>
  <div style="padding: 1rem 0; font-size: 14px;">
    <el-row>
      <el-col :span="12">指甲情况</el-col>
      <el-col :span="6">
        <label  :class="nailSituation">
          <input class="nailOne" type="radio" name="nail" @change="status('正常')" ref="changeInputFive">
          <span v-if="nailInfo === '正常'" class="myRadioInputThree" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else class="myRadioInputThree"></span>
          &nbsp;正常
        </label>
      </el-col>
      <el-col :span="6">
        <label :class="noNailSituation">
          <input class="myRadioFour"  type="radio" name="nail" @change="status('略长')" ref="changeInputSix">
          <span v-if="nailInfo === '略长'"  class="myRadioInputFour" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else  class="myRadioInputFour"></span>
          略长
        </label>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nailSituation: '',
        noNailSituation: '',
        nailInfo: '',
      };
    },
    props: ['issDate'],
    methods: {
      status(index) {
        if (index === '正常') {
          this.nailSituation = 'nailSituation';
          this.noNailSituation = '';
          this.nailInfo = '正常';
        } else if (index === '略长') {
          this.noNailSituation = 'noNailSituation';
          this.nailSituation = '';
          this.nailInfo = '略长';
        }
        this.$emit('fingernail', this.nailInfo);
      },
    },
    mounted() {
      if (this.issDate === '正常') {
        this.$refs.changeInputFive.checked = 'checked';
        this.status(this.issDate);
      } else if (this.issDate === '略长') {
        this.$refs.changeInputSix.checked = 'checked';
        this.status(this.issDate);
      }
    },
  };
</script>

<style scoped lang="less">
  .nailOne{
    display: none;
  }
  .myRadioInputThree {
    background: url(../../assets/img/icon/sendDetailComponents/teache_headAndMouth_gray.png) no-repeat center;
    border-radius: 100%;
    display: inline-block;
    width: 14px;
    vertical-align: middle;
    height: 14px;
    margin-top: -2px;
    margin-right: 5px;
  }
  .myRadioInputFour {
    background: url(../../assets/img/icon/sendDetailComponents/teache_headAndMouth_gray.png) no-repeat center;
    border-radius: 100%;
    display: inline-block;
    width: 14px;
    vertical-align: middle;
    height: 14px;
    margin-top: -2px;
    margin-right: 5px;
  }
  .myRadioFour{
    display: none;
  }
  .nailOne:checked + .myRadioInputThree:after {
    background: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_normal.png) no-repeat center;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 14px;
    width: 14px;
    border: 0;
  }
  .myRadioFour:checked + .myRadioInputFour:after {
    background: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_red.png) no-repeat center;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 14px;
    width: 14px;
  }
  .nailSituation{
    color: #67cb33;
  }
  .noNailSituation{
    color: #ff0c00;
  }
</style>
