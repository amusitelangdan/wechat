<template>
  <div style="padding: 1rem 0; font-size: 14px;">
    <div style="display: flex">
      <div style="flex: 1;">手口情况</div>
      <label class="headSituation"><input class="radio radio1" type="radio" name="radio" @change="status('正常')" ref="changeInputOne"> 正常</label>
      <label class="noHeadSituation"><input class="radio" type="radio" name="radio" @change="status('有疱疹')" ref="changeInputTwo"> 有疱疹</label>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headSituation: false,
        noHeadSituation: '',
        headInfo: '',
      };
    },
    props: ['issDate'],
    methods: {
      status(index) {
        if (index === '正常') {
          this.headInfo = '正常';
          document.getElementsByClassName('headSituation')[0].style.color = '#1db562';
          document.getElementsByClassName('noHeadSituation')[0].style.color = '#000000';
        } else if (index === '有疱疹') {
          this.headInfo = '有疱疹';
          document.getElementsByClassName('headSituation')[0].style.color = '#000000';
          document.getElementsByClassName('noHeadSituation')[0].style.color = '#ff3300';
        }
        this.$emit('handCondition', this.headInfo);
      },
    },
    mounted() {
      document.getElementsByClassName('headSituation')[0].style.color = '#000000';
      document.getElementsByClassName('noHeadSituation')[0].style.color = '#000000';
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
