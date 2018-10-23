<template>
  <div>
    <div style="padding: 1rem 0;text-align: center">{{defecate?defecate:expless}}</div>
    <div style="display: flex" class="card">
      <div style="flex: 1;">
        <!--<div class="expression" :class="expressionOne" @click="changeColorOne" ref="mood" style="height: 5rem;"></div>-->
        <img v-if="expressionOne === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_yesTwo.png')" alt=""  @click="changeColorOne" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_yes.png')" alt=""  @click="changeColorOne" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <div style="text-align: center;padding: .3rem 0;">是</div>
      </div>
      <div style="flex: 1;">
        <!--<div class="expression" :class="expressionTwo" @click="changeColorTwo" ref="mood" style="height: 5rem;"></div>-->
        <img v-if="expressionTwo === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_constipationTwo.png')" alt=""  @click="changeColorTwo" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_constipation.png')" alt="" @click="changeColorTwo" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <div style="text-align: center;padding: .3rem 0;">便秘</div>
      </div>
      <div style="flex: 1;">
        <!--<div class="expression" :class="expressionThree" @click="changeColorThree" ref="mood" style="height: 5rem;"></div>-->
        <img v-if="expressionThree === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_diarrheaTwo.png')" alt="" @click="changeColorThree" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_diarrhea.png')" alt="" @click="changeColorThree" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <div style="text-align: center;padding: .3rem 0;">拉肚子</div>
      </div>
      <div style="flex: 1;">
        <!--<div class="expression" :class="expressionFour" @click="changeColorFour" ref="mood" style="height: 5rem;"></div>-->
        <img v-if="expressionFour === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_noTwo.png')" alt="" @click="changeColorFour" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_shit_no.png')" alt="" @click="changeColorFour" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <div style="text-align: center;padding: .3rem 0;">否</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Defecate',
    data() {
      return {
        expressionOne: '',
        expressionTwo: '',
        expressionThree: '',
        expressionFour: '',
        mood: '',
        expless: '是否大便',
      };
    },
    props: ['defecate', 'saveInfo'],
    methods: {
      changeColorOne() {
        this.expressionOne = 'changeExpression';
        this.expressionTwo = '';
        this.expressionThree = '';
        this.expressionFour = '';
        this.mood = '是';
        this.$emit('solve', this.mood);
      },
      changeColorTwo() {
        this.expressionTwo = 'changeExpression';
        this.expressionThree = '';
        this.expressionOne = '';
        this.expressionFour = '';
        this.mood = '便秘';
        this.$emit('solve', this.mood);
      },
      changeColorThree() {
        this.expressionOne = '';
        this.expressionTwo = '';
        this.expressionThree = 'changeExpression';
        this.mood = '拉肚子';
        this.expressionFour = '';
        this.$emit('solve', this.mood);
      },
      changeColorFour() {
        this.expressionFour = 'changeExpression';
        this.expressionThree = '';
        this.expressionOne = '';
        this.expressionTwo = '';
        this.mood = '否';
        this.$emit('solve', this.mood);
      },
    },
    created() {
      if (this.saveInfo !== undefined) {
        if (this.saveInfo === '是') {
          this.changeColorOne();
        } else if (this.saveInfo === '便秘') {
          this.changeColorTwo();
        } else if (this.saveInfo === '拉肚子') {
          this.changeColorThree();
        } else if (this.saveInfo === '否') {
          this.changeColorFour();
        }
      }
    },
  };
</script>
<style lang="less" scoped>
</style>
