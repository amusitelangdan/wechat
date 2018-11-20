<template>
  <div style="padding-bottom: 90px">
    <div style="overflow:hidden;padding-bottom: 1rem">
      <Praise class="box" v-for="(item, index) in evaluationList" :key="index" :praise="item" :praiseKey="index"></Praise>
    </div>
    <div class="button-block_primary button" @click="addPraise">添加好评</div>
  </div>
</template>
<script>
  import Praise from '../../../components/layout/Praise';
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        evaluationList: [],
      };
    },
    components: {
      Praise,
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
 .box{
   background-color: #ffffff;
   width: 95%;
   margin: .8rem auto 0;
   box-shadow: 2px 0 4px rgba(235,235,235,1), -2px 0 4px rgba(235,235,235,1), 0 2px 4px rgba(235,235,235,1),  0 -2px 4px rgba(237,237,237,1);
   border-radius: 5px;
 }
</style>
