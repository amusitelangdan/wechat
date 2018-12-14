<template>
  <div>
    <div class="layout-head">{{title}}</div>
    <div class="card layout-emition">
      <div  @click="changeColorOne(item, index)" style="flex: 1;margin: 0 .5rem" v-for="(item, index) in moodList" :key="index">
        <i v-if="expression === index" :class="item.icon" class="iconfont" :style="{color: `${item.color}`}"></i>
        <i v-if="expression !== index" :class="item.icon" class="iconfont"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import constant from '../../../config/constant';

  export default{
    name: 'Emotion',
    data() {
      return {
        expression: '',
        type: '',
        moodList: [],
      };
    },
    props: ['title', 'saveInfo'],
    methods: {
      changeColorOne(item, index) {
        this.expression = index;
        this.type = index;
        this.$emit('mood', item.label);
      },
    },
    created() {
      this.moodList = constant.LEAVEMOODSTATUS;
      if (this.saveInfo !== undefined) {
        constant.LEAVEMOODSTATUS.forEach((item) => {
          if (this.saveInfo === item.label) {
            this.changeColorOne(item, item.type);
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  .layout-head{
    text-align: center;
    padding: 1.5rem 0;
    font-size: 16px;
  }
  .layout-emition{
    display: flex;
    padding: 0 2rem;
    line-height: normal;
    text-align: center;
  }
  i.icon-super-happy{
    font-size: 55px;
    color: #CECECE;
  }
  i.icon-happy{
    font-size: 55px;
    color: #CECECE;
  }
  i.icon-unhappy{
    font-size: 55px;
    color: #CECECE;
  }
</style>
