<template>
  <div>
    <div>
      <div class="card select border-b" @click="dropDown">
        <div style="color: #1A1A1A;">选择类型</div>
        <div style="display: flex">
          <div style="color: #666666;margin-right: 5px">{{type ? type : '全部'}}</div>
          <div class="right-select"></div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="selectValueList" v-if="drop" style="position: relative;background: #fff">
          <transition-group tag="div" name="slide" style="background: #fff">
            <div class="selectValue" style="border: 0;" @click="selectEnd(item, index)" v-for="(item, index) in selectList" :key="index" :class="{changeColor: change === index}">
              <div class="typeColor">{{item.value}}</div>
              <div v-if="change === index" class="option-yes"></div>
            </div>
          </transition-group>
          <div class="black" :style="{height: clientHeight}" style="background: rgba(0,0,0,0.6);width: 100%;position: absolute;top: 0;left: 0;z-index: -1;" @click="close()"></div>
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
    props: ['historyReportListType'],
    methods: {
      dropDown() {
        this.drop = !this.drop;
      },
      selectEnd(item, index) {
        this.change = index;
        this.type = item.value;
        this.drop = !this.drop;
        this.$emit('selectType', item.type);
      },
      close() {
        this.drop = !this.drop;
      },
    },
    mounted() {
      this.clientHeight = `${document.documentElement.clientHeight - 51}px`;
    },
    created() {
      if (this.historyReportListType) {
        this.selectList.forEach((item) => {
          if (item.type === this.historyReportListType) {
            this.change = item.type;
            this.type = item.value;
          }
        });
      }
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
    .selectValue{
      margin: 0;
      border: 0;
      display: flex;
      padding: .8rem 1rem;
      background: #fff;
      div{
        margin: 0;
      }
      div:first-child{
        flex: 1;
      }
    }
    .selectValue:last-of-type{
      padding-bottom: 1.6rem;
    }
    .selectValue:first-of-type{
      padding-top: 1.6rem;
    }
  }
  .changeColor{
    color: #F5A626;
  }
  .option-yes{
    background-image: url(../../assets/img/icon/history/option_yes.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 13px;
    height: 10px;
    margin-top: 5px;
  }
  .right-select{
    background-image: url(../../assets/img/icon/global/arrow-right.png);
    background-repeat: no-repeat;
    background-size: cover;
    width: 5px;
    height: 10px;
    margin-top: 20px;
  }
</style>
