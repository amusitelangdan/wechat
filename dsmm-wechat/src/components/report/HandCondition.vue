<template>
  <div style="padding: 1rem 0; font-size: 14px;">
    <el-row>
      <el-col :span="12">
        <div>手口情况</div>
      </el-col>
      <el-col :span="6">
        <label :class="headSituation">
          <input class="myRadioOne" type="radio" name="Fruit" @change="status('正常')" ref="changeInputOne">
          <span v-if="headInfo === '正常'" class="myRadioInputOne" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else class="myRadioInputOne"></span>
          &nbsp;正常
        </label>
      </el-col>
      <el-col :span="6">
        <label :class="noHeadSituation">
          <input class="myRadioTwo"  type="radio" name="Fruit" @change="status('有疱疹')" ref="changeInputTwo">
          <span v-if="headInfo === '有疱疹'"  class="myRadioInputTwo" style="background: #ffffff;margin-top: -4px;"></span>
          <span v-else  class="myRadioInputTwo"></span>
          有疱疹
        </label>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headSituation: '',
        noHeadSituation: '',
        headInfo: '',
      };
    },
    props: ['issDate'],
    methods: {
      status(index) {
        if (index === '正常') {
          this.headSituation = 'headSituation';
          this.noHeadSituation = '';
          this.headInfo = '正常';
        } else if (index === '有疱疹') {
          this.noHeadSituation = 'noHeadSituation';
          this.headSituation = '';
          this.headInfo = '有疱疹';
        }
        this.$emit('handCondition', this.headInfo);
      },
    },
    mounted() {
      if (this.issDate === '正常') {
        this.$refs.changeInputOne.checked = 'checked';
        this.status(this.issDate);
      } else if (this.issDate === '有疱疹') {
        this.$refs.changeInputTwo.checked = 'checked';
        this.status(this.issDate);
      }
    },
  };
</script>

<style scoped lang="less">
  .myRadioOne{
    display: none;
  }
  .myRadioInputOne {
    background: url(../../assets/img/icon/sendDetailComponents/teache_headAndMouth_gray.png) no-repeat center;
    border-radius: 100%;
    display: inline-block;
    width: 14px;
    vertical-align: middle;
    height: 14px;
    margin-top: -2px;
    margin-right: 5px;
  }
  .myRadioInputTwo {
    background: url(../../assets/img/icon/sendDetailComponents/teache_headAndMouth_gray.png) no-repeat center;
    border-radius: 100%;
    display: inline-block;
    width: 14px;
    vertical-align: middle;
    height: 14px;
    margin-top: -2px;
    margin-right: 5px;
  }
  .myRadioTwo{
    display: none;
  }
  .myRadioOne:checked + .myRadioInputOne:after {
    background: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_normal.png) no-repeat center;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 14px;
    width: 14px;
    border: 0;
  }
  .myRadioTwo:checked + .myRadioInputTwo:after {
    background: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_red.png) no-repeat center;
    border-radius: 100%;
    content: "";
    display: inline-block;
    height: 14px;
    width: 14px;
  }
  .headSituation{
    color: #67cb33;
  }
  .noHeadSituation{
    color: #ff0c00;
  }
</style>
