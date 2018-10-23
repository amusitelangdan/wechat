<template>
  <div style="width: 100%;display: flex;height: 50px;" class="border-b">
    <div style="flex: 1;text-align: center;line-height: 50px" @click="selecError">取消</div>
    <div style="flex: 1;text-align: center;line-height: 50px;color: #FEA824;" @click="selectSure">确认</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      selectSure() {
        this.$emit('confirm');
      },
      selecError() {
        this.$emit('cancel');
      },
    },
  };
</script>
<style lang="less" scoped>

</style>
