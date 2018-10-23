<template>
  <div>
    <div class="card">
      <div class="card-cell" v-for="item in classReadingChildList">
        <child-info :name="item.child.name" :gender="item.child.gender" :photo="item.child.photo" :birthday="item.child.birthday"></child-info>
      </div>
    </div>
    <blank v-if="classReadingChildList.length === 0" text="目前本班级没有在读学员哦~">
    </blank>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import ChildInfo from '../../components/layout/ChildInfo';
  import Blank from '../../components/layout/Blank';

  export default {
    data() {
      return {
        childList: [],
      };
    },
    computed: {
      ...mapState({
        classReadingChildList: state => state.teacher.classReadingChildList,
      }),
    },
    components: {
      ChildInfo,
      Blank,
    },
    methods: {
      ...mapActions({
      }),
      init() {
      },
    },
    created() {
      this.init();
    },
  };
</script>

<style lang="less" scoped>
</style>
