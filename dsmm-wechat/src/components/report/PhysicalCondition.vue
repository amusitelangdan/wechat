<template>
  <div style="padding: 1rem 0; font-size: 14px;">
    <div style="display: flex">
      <div style="flex: 1;">肢体情况</div>
      <label class="headSituation1"><input class="radio radio1" type="radio" name="Physical" @change="status('正常')" ref="changeInputThree"> 正常</label>
      <label class="noHeadSituation2"><input class="radio" type="radio" name="Physical" @change="status('有擦伤')" ref="changeInputFour"> 有擦伤</label>
    </div>
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
          document.getElementsByClassName('headSituation1')[0].style.color = '#1db562';
          document.getElementsByClassName('noHeadSituation2')[0].style.color = '#000000';
          this.physicalInfo = '正常';
        } else if (index === '有擦伤') {
          document.getElementsByClassName('headSituation1')[0].style.color = '#000000';
          document.getElementsByClassName('noHeadSituation2')[0].style.color = '#ff3300';
          this.physicalInfo = '有擦伤';
        }
        this.$emit('physicalCondition', this.physicalInfo);
      },
    },
    mounted() {
      document.getElementsByClassName('headSituation1')[0].style.color = '#000000';
      document.getElementsByClassName('noHeadSituation2')[0].style.color = '#000000';
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
  input{
    outline: none;
  }
  label{
    padding-right: 2rem
  }
  .radio{
    width: 14px;
    height: 14px;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    -webkit-border-radius: 0.6rem;
    border-radius: 0.6rem;
    font-size: 0.8rem;
    margin: 3px 5px 0;
    padding: 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: default;
    -webkit-appearance: none;  /**隐藏原生控件**/
  }
  /**选择后的样式**/
  .radio:checked{
    width: 14px;
    height: 14px;
    border: 0;
    background-image: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_red.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-clip: padding-box;
  }
  .radio1:checked{
    width: 14px;
    height: 14px;
    border: 0;
    background-image: url(../../assets/img/icon/sendDetailComponents/teacher_headAndMouth_normal.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-clip: padding-box;
  }
</style>
