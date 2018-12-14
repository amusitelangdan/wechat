<template>
  <div v-if="show">
    <div style="position: absolute; left: 50%; top: 40%; transform: translateX(-50%) translateY(-50%); text-align: center">
      <img v-if="type === 0" src="../../../../assets/img/img/page/air.png" style="margin-bottom: 1.5rem">
      <img v-if="type === 1" src="../../../../assets/img/img/page/kongyemian.png" style="margin-bottom: 1.5rem">
      <br>
      <span class="color-info" style="font-size: 1rem">{{text}}</span>
      <br>
    </div>
  </div>
</template>
<script>
  /**
   * DwPageBlank
   * @module components/planning/base/layout/PageBlank
   * @desc 空页面组件
   * @param {boolean} [type=0] - 显示类型，接受 0和1且必须为Number类型
   * @param {string} [text] - 显示文案
   *
   * @example
   * <DwPageBlank :type="0" text="文案"></DwPageBlank>
   */
  export default {
    props: {
      text: String,
      type: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        show: false,
      };
    },
    created() {
      setTimeout(() => {
        this.show = true;
      }, 300);
    },
  };
</script>
<style lang="less" scoped>
</style>
