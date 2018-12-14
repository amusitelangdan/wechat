<template>
  <div class="card">
    <div class="layout-head">饮水情况</div>
    <div class="card" style="display: flex">
      <div @click="changeColorOne(0)" ref="mood" style="flex: 1;">
        <img v-if="expressionOne === 0" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_drink_100mlTwo.png')" alt="">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_drink_100mlOne.png')" alt="">
        <span class="layout-drink-info">{{drinkInfoList[0]}}</span>
      </div>
      <div @click="changeColorOne(1)" ref="mood" style="flex: 1;">
        <img v-if="expressionOne === 1" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_drink_300mlTwo.png')" alt="">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_drink_300mlOne.png')" alt="">
        <span class="layout-drink-info">{{drinkInfoList[1]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import constant from '../../../config/constant';

  export default {
    data() {
      return {
        expressionOne: '',
        mood: '',
        drinkInfoList: [],
      };
    },
    props: ['saveInfo'],
    methods: {
      changeColorOne(index) {
        this.expressionOne = index;
        this.mood = index;
        this.$emit('selectDrink', this.mood);
      },
    },
    created() {
      constant.SELECTDRINKINFO.forEach((item) => {
        this.drinkInfoList.push(item.label);
      });
      if (this.saveInfo !== undefined) {
        constant.SELECTDRINKINFO.forEach((item) => {
          if (item.label === this.saveInfo) {
            this.changeColorOne(item.type);
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  .layout-head {
    padding: 1rem 0;
    text-align: center;
  }
  img{
    width: 3rem;
    height: 3rem;
    margin: 0 4rem;
  }
  .layout-drink-info{
    padding: .3rem 0;
    text-align: center;
    width: 100%;
    display: block
  }
</style>
