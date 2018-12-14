<template>
  <div style="padding-bottom: 90px">
    <div style="overflow:hidden;padding-bottom: 1rem">
      <dw-circle-card-reveal v-for="(item, index) in evaluationList" :key="index">
        <Praise slot="content" :praise="item" :praiseKey="index"></Praise>
      </dw-circle-card-reveal>
    </div>
    <div class="button-block_primary button" @click="addPraise">添加好评</div>
  </div>
</template>
<script>
  import Praise from '../../../components/layout/Praise';
  import { mapState, mapActions } from 'vuex';
  import DwCircleCardReveal from '../../../components/layout/base/CircleCard';

  export default {
    data() {
      return {
        evaluationList: [],
      };
    },
    components: {
      Praise,
      DwCircleCardReveal,
    },
    computed: {
      ...mapState({
        expandList: state => state.teacher.expandList,
      }),
    },
    methods: {
      ...mapActions({
        getEvaluationList: 'teacher/getEvaluationList',
      }),
      addPraise() {
        this.$router.push('/teacher/add/praise');
      },
    },
    created() {
      this.getEvaluationList().then((res) => {
        this.evaluationList = res.obj;
      });
    },
  };
</script>
<style lang="less" scoped>
 .button{
   width: 22rem;
   position: fixed;
   bottom: 2rem;
   margin: 0;
   left: 50%;
   transform: translateX(-50%);
 }
</style>
