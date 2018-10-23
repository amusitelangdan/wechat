<template>
  <div id="app" style="height: 100%">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <!--<transition name="fade" mode="out-in">-->
      <!--<router-view></router-view>-->
    <!--</transition>-->
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
//  解决移动端浏览器300ms点击延迟问题的一个库
  import FastClick from 'fastclick';
  // 会报错的哦
  // import VConsole from 'vconsole';

  export default {
    name: 'app',
    data() {
      return {

      };
    },
    computed: {
      ...mapState({
      }),
      ...mapGetters([
      ]),
    },
    watch: {
      $route(to, from) {
      },
    },
    methods: {
      ...mapActions({
        getOssConfig: 'getOssConfig',
        refreshToken: 'refreshToken',
      }),
      init() {
        this.getOssConfig();
        if (localStorage.getItem('w-token')) {
          this.refreshToken();
        }
        FastClick.attach(document.body);
      },
    },
    /* eslint-disable no-new */
    created() {
      // new VConsole();
      this.init();
    },
    mounted() {
    },
  };
</script>

<style lang="less" scoped>
</style>
