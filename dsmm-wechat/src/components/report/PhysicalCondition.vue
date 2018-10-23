<template>
  <div style="padding: 1rem 0; font-size: 14px;">
    <el-row>
      <el-col :span="12">肢体情况</el-col>
      <el-col :span="6">
        <label :class="physicalSituation">
          <input class="myRadioThree" type="radio" name="Physical" @change="status('正常')" ref="changeInputThree">
          <span v-if="physicalInfo === '正常'" class="myRadioInputThree" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else class="myRadioInputThree"></span>
          &nbsp;正常
        </label>
      </el-col>
      <el-col :span="6">
        <label :class="noPhysicalSituation">
          <input class="myRadioFour"  type="radio" name="Physical" @change="status('有擦伤')" ref="changeInputFour">
          <span v-if="physicalInfo === '有擦伤'"  class="myRadioInputFour" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else  class="myRadioInputFour"></span>
          有擦伤
        </label>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        physicalSituation: '',
        noPhysicalSituation: '',
        physicalInfo: '',
      };
    },
    props: ['issDate'],
    methods: {
      status(index) {
        if (index === '正常') {
          this.physicalSituation = 'physicalSituation';
          this.noPhysicalSituation = '';
          this.physicalInfo = '正常';
        } else if (index === '有擦伤') {
          this.noPhysicalSituation = 'noPhysicalSituation';
          this.physicalSituation = '';
          this.physicalInfo = '有擦伤';
        }
        this.$emit('physicalCondition', this.physicalInfo);
      },
    },
    mounted() {
      if (this.issDate === '正常') {
        this.$refs.changeInputThree.checked = 'checked';
        this.status(this.issDate);
      } else if (this.issDate === '有擦伤') {
        this.$refs.changeInputFour.checked = 'checked';
        this.status(this.issDate);
      }
    },
  };
</script>

<style scoped lang="less">
  .myRadioThree{
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
  .myRadioThree:checked + .myRadioInputThree:after {
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
  .physicalSituation{
    color: #67cb33;
  }
  .noPhysicalSituation{
    color: #ff0c00;
  }
</style>
