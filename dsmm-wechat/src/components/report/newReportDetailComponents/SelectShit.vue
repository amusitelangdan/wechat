<template>
  <div>
    <div style="padding: 1rem 0;text-align: center">{{defecate?defecate:expless}}</div>
    <div style="display: flex" class="card">
      <div style="flex: 1;">
        <img v-if="expressionOne === 0" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_yesTwo.png')" alt=""  @click="changeColorOne(0)" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_yes.png')" alt=""  @click="changeColorOne(0)" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <div style="text-align: center;padding: .3rem 0;">{{shitInfo[0]}}</div>
      </div>
      <div style="flex: 1;">
        <img v-if="expressionOne === 1" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_constipationTwo.png')" alt=""  @click="changeColorOne(1)" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_constipation.png')" alt="" @click="changeColorOne(1)" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <div style="text-align: center;padding: .3rem 0;">{{shitInfo[1]}}</div>
      </div>
      <div style="flex: 1;">
        <img v-if="expressionOne === 2" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_diarrheaTwo.png')" alt="" @click="changeColorOne(2)" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_diarrhea.png')" alt="" @click="changeColorOne(2)" ref="mood" style="height: 3rem;padding: 0 1.5rem;">
        <div style="text-align: center;padding: .3rem 0;">{{shitInfo[2]}}</div>
      </div>
      <div style="flex: 1;">
        <img v-if="expressionOne === 3" :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_noTwo.png')" alt="" @click="changeColorOne(3)" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <img v-else :src="require('../../../assets/img/icon/sendDetailComponents/teacher_shit_no.png')" alt="" @click="changeColorOne(3)" ref="mood" style="height: 3rem;padding: 0 1.5rem;width: 3rem;">
        <div style="text-align: center;padding: .3rem 0;">{{shitInfo[3]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import constant from '../../../config/constant';

  export default{
    name: 'Defecate',
    data() {
      return {
        expressionOne: '',
        mood: '',
        expless: '是否大便',
        shitInfo: [],
      };
    },
    props: ['defecate', 'saveInfo'],
    methods: {
      changeColorOne(index) {
        this.expressionOne = index;
        this.mood = index;
        this.$emit('shitType', this.mood);
      },
    },
    created() {
      constant.SELECTSHIT.forEach((item) => {
        this.shitInfo.push(item.label);
      });
      if (this.saveInfo !== undefined) {
        constant.SELECTSHIT.forEach((item) => {
          if (item.label === this.saveInfo) {
            this.changeColorOne(item.type);
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
</style>
