<template>
  <div>
    <div class="card">
      <div class="card-cell" v-for="(item, relationEn) in parent" :key="relationEn"> 
        <span>{{relationType[relationEn]}}</span>
        <span style="margin-left: 2rem" v-if="item.phone">{{item.phone}}</span>
        <span style="margin-left: 2rem" v-if="!item.phone" class="color-info">未绑定</span>
      </div>
    </div>
    <div class="button-block_primary" @click="toPath('/parent/invite')">邀请家人</div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        parent: {},
        relationType: {
          father: '爸爸',
          mother: '妈妈',
          grandpa: '爷爷',
          grandma: '奶奶',
          grandfather: '外公',
          grandmother: '外婆',
          other: '家长',
        },
      };
    },
    computed: {
      ...mapState({
        childList: state => state.parent.childList,
      }),
    },
    methods: {
      ...mapActions({
      }),
      toPath(path) {
        this.$router.push(path);
      },
      parseParent() {
        this.childList.forEach((child) => {
          if (child.id === parseInt(this.$route.query.childId, 10)) {
            this.parent = JSON.parse(child.parent);
          }
        });
      },
      init() {
        this.parseParent();
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style lang="less">

</style>
