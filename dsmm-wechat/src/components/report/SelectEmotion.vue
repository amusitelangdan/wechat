<template>
  <div>
    <div style="text-align: center;padding: 1.5rem 0; font-size: 16px">{{title}}</div>
    <div class="card" style="display: flex;padding: 0 2rem;">
      <div  @click="changeColorOne" ref="mood" style="margin: 0 .5rem;">
        <img v-if="expressionOne === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion_happyTwo.png')" alt="" style="width: 4rem;height: 4rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion-happyOne.png')" alt="" style="width: 4rem;height: 4rem;">
      </div>
      <div @click="changeColorTwo" ref="mood" style="margin: 0 3rem;">
        <img v-if="expressionTwo === 'changeExpression'"  :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion_generalTwo.png')" alt="" style="width: 4rem;height: 4rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion_generalOne.png')" alt="" style="width: 4rem;height: 4rem;">
      </div>
      <div @click="changeColorThree" ref="mood" style="margin: 0 .5rem;">
        <img v-if="expressionThree === 'changeExpression'" :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion_sadTwo.png')" alt="" style="width: 4rem;height: 4rem;">
        <img v-else :src="require('../../assets/img/icon/sendDetailComponents/teacher_emotion_sadOne.png')" alt="" style="width: 4rem;height: 4rem;">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Emotion',
    data() {
      return {
        expressionOne: '',
        expressionTwo: '',
        expressionThree: '',
        mood: '',
      };
    },
    props: ['title', 'saveInfo'],
    methods: {
      changeColorOne() {
        this.expressionOne = 'changeExpression';
        this.expressionTwo = '';
        this.expressionThree = '';
        this.mood = '开心';
        this.$emit('emotion', this.mood);
      },
      changeColorTwo() {
        this.expressionTwo = 'changeExpression';
        this.expressionThree = '';
        this.expressionOne = '';
        this.mood = '一般';
        this.$emit('emotion', this.mood);
      },
      changeColorThree() {
        this.expressionOne = '';
        this.expressionTwo = '';
        this.expressionThree = 'changeExpression';
        this.mood = '难过';
        this.$emit('emotion', this.mood);
      },
    },
    created() {
      if (this.saveInfo !== undefined) {
        if (this.saveInfo === '开心' || this.saveInfo === '超开心') {
          this.changeColorOne();
        } else if (this.saveInfo === '一般' || this.saveInfo === '很正常') {
          this.changeColorTwo();
        } else if (this.saveInfo === '难过' || this.saveInfo === '略低落') {
          this.changeColorThree();
        }
      }
    },
  };
</script>
<style lang="less" scoped>
</style>
