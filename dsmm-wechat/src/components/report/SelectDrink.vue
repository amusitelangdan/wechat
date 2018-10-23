<template>
  <div class="card">
    <div style="padding: 1rem 0;text-align: center;">饮水情况</div>
    <div class="card" style="display: flex">
      <div @click="changeColorOne" ref="mood" style="flex: 1;">
        <img v-if="expressionOne === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_drink_100mlTwo.png')" alt="" style="width: 3rem;height: 3rem;margin: 0 4rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_drink_100mlOne.png')" alt="" style="width: 3rem;height: 3rem;margin: 0 4rem;">
        <span style="padding: .3rem 0;text-align: center;width: 100%;display: block">较少</span>
      </div>
      <div @click="changeColorTwo" ref="mood" style="flex: 1;">
        <img v-if="expressionTwo === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_drink_300mlTwo.png')" alt="" style="width: 3rem;height: 3rem;margin: 0 4rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_drink_300mlOne.png')" alt="" style="width: 3rem;height: 3rem;margin: 0 4rem;">
        <span style="padding: .3rem 0;text-align: center;width: 100%;display: block">正常</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        expressionOne: '',
        expressionTwo: '',
        expressionThree: '',
        mood: '',
      };
    },
    props: ['saveInfo'],
    methods: {
      changeColorOne() {
        this.expressionOne = 'changeExpression';
        this.expressionTwo = '';
        this.expressionThree = '';
        this.mood = '较少';
        this.$emit('drink', this.mood);
      },
      changeColorTwo() {
        this.expressionOne = '';
        this.expressionTwo = 'changeExpression';
        this.expressionThree = '';
        this.mood = '正常';
        this.$emit('drink', this.mood);
      },
    },
    created() {
      if (this.saveInfo !== undefined) {
        if (this.saveInfo === '较少') {
          this.changeColorOne();
        } else if (this.saveInfo === '正常') {
          this.changeColorTwo();
        }
      }
    },
  };
</script>
<style lang="less" scoped>
</style>
