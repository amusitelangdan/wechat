<template>
  <div class="layout-content" style="padding: 1rem 0;">
    <div class="layout-title">{{title}}</div>
    <div class="layout-right layout-content">
      <div class="layout-content layout-left-content" @click="selectNail(item, index)" v-for="(item, index) in checkType" :key="index">
        <div class="layout-border" v-if="changeColor !== index">
        </div>
        <div style="margin-right: 7px;" v-if="changeColor === index" :style="{color: `${item.color}`}">
          <i class="iconfont icon-success2" style="line-height: normal;font-size: 14px;"></i>
        </div>
        <div v-if="changeColor === index" :style="{color: item.color}">{{item.label}}</div>
        <div v-else>{{item.label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        changeColor: '',
      };
    },
    props: ['saveInfo', 'title', 'checkType'],
    methods: {
      selectNail(item, index) {
        this.changeColor = index;
        this.$emit('checkedInfo', item.label);
      },
    },
    created() {
      if (this.saveInfo !== undefined) {
        this.checkType.forEach((item) => {
          if (this.saveInfo === item.label) {
            this.selectNail(item, item.type);
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  .layout-content{
    display: flex;
  }
  .layout-title{
    width: 50%;
  }
  .layout-right{
    width: 50%;
  }
  .layout-right .layout-left-content{
    flex: 1;
  }
  .layout-border{
    width: 14px;
    height: 14px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    margin-top: 3px;
    margin-right: 7px;
  }
</style>
