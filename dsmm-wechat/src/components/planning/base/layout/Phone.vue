<!--watch多余-->
<!--直接显示时进行函数运算-->
<template>
  <span>
    {{phone}}
  </span>
</template>
<script>
  /**
   * DwPhone
   * @module components/planning/layout/Phone
   * @desc 手机号的基础显示组件
   * @param {string} [telPhone] - 传入的手机号码
   *
   * @example
   * <dw-phone tel-phone="传入的手机号码"></dw-phone>
   */
  export default {
    data() {
      return {
        phone: '',
      };
    },
    props: {
      telPhone: String,
    },
    created() {
      this.phone = this.telPhone.replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1-');
    },
  };
</script>
<style lang="less" scoped>

</style>
