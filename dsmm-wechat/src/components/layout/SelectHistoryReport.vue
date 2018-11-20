<template>
  <div>
    <div>
      <div class="card select border-b" @click="dropDown">
        <div>选择类型</div>
        <div>
          <span>{{type ? type : '全部'}}</span>
          <span>></span>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="selectValueList" v-if="drop" style="position: relative;">
          <div class="card selectValue" @click="selectEnd(item, index)" v-for="(item, index) in selectList" :key="index" :class="{changeColor: change === index}">
            <div>{{item.value}}</div>
            <div>√</div>
          </div>
          <div class="black" :style="{height: clientHeight}" style="background: rgba(0,0,0,0.6);width: 100%;position: absolute;top: 0;left: 0;z-index: -1;"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        drop: false,
        change: 0,
        type: '',
        clientHeight: '',
        selectList: [
          { value: '全部', type: '' },
          { value: '入园晨检', type: 1 },
          { value: '每日课程', type: 4 },
          { value: '午餐通知', type: 3 },
          { value: '午睡消息', type: 2 },
          { value: '日总结', type: 5 },
          { value: '自定义消息(单独)', type: 6 },
          { value: '自定义消息(公开)', type: 7 },
        ],
      };
    },
    methods: {
      dropDown() {
        this.drop = !this.drop;
      },
      selectEnd(item, index) {
        this.change = index;
        this.type = item.value;
        this.$emit('selectType', item.type);
      },
    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight - 51}px`;
    },
  };
</script>
<style lang="less" scoped>
  .select{
    margin: 0;
    height: 50px;
    display: flex;
    div{
      line-height: 50px;
    }
    div:first-child{
      flex: 1;
    }
  }
  .selectValueList{
    margin: 0;
    padding-bottom: .5rem;
    .selectValue{
      display: flex;
      padding-top: .5rem;
      padding-bottom: .5rem;
      margin: 0;
      div:first-child{
        flex: 1;
      }
    }
  }
  .changeColor{
    color: #F5A626;
  }
</style>
