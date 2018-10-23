<template>
  <div>
    <div class="card border-b" style="padding-top: 1rem;padding-bottom: 1rem;margin: 0;overflow:hidden;" v-for="(child, index) in childList" :key="index" @click="toPath('/service/personal', { childId: child.id})">
      <child-info style="float:left;" :name="child.name" :gender="child.gender" :photo="child.photo" :birthday="child.birthday" :is-selected="selectId === child.id"></child-info>
      <img v-if="selectId === child.id" style="float: right;width: 1.2rem;margin-top: 1.3rem" src="../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png" alt="">
    </div>
    <div class="card" style="padding-top: 1rem;padding-bottom: 1rem;margin: 0;overflow:hidden;color: #FEA317;" @click="toPath('/parent/acceptInvitation')">
      <div style="width: 48px;height: 2.5rem;float:left;margin-right: 1rem;">
        <img src="../../assets/img/icon/personal/addChild.png" alt="" style="width: 2.5rem;display: block;margin: 0 auto">
      </div>
      <div style="float:left;line-height: 2.5rem;">添加宝宝</div>
    </div>
  </div>
</template>
<script>
  import ChildInfo from '../../components/layout/ChildInfo';
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        selectChildId: '',
        selectId: '',
      };
    },
    components: {
      ChildInfo,
    },
    computed: {
      ...mapState({
        childList: state => state.parent.childList,
        parseBirthday: state => state.parseBirthday,
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    methods: {
      ...mapActions({
        getParentChildList: 'parent/getParentChildList',
      }),
      toPath(path, query) {
        this.$router.push({
          path,
          query,
        });
      },
      init() {
        this.selectId = this.$route.query.childId;
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style lang="less" scoped>

</style>
