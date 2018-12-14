<template>
  <div>
    <i v-if="type === 0" class="iconfont icon-classIcon"></i>
    <i v-if="type === 1" class="iconfont icon-class" style="margin-left: 2px;"></i>
    {{name}}
  </div>
</template>
<script>
  export default {
    props: {
      name: String,
      type: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="less" scoped>

</style>
