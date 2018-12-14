<template>
  <div style="display: flex">
    <div class="button button1">
      <dw-button @click="cancel" size="small">取消</dw-button>
    </div>
    <div class="button">
      <dw-button type="primary" @click="success" size="small">确认</dw-button>
    </div>
  </div>
</template>
<script>
  import DwButton from '../../../components/button/index';

  export default {
    components: {
      DwButton,
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      success() {
        this.$emit('success');
      },
    },
  };
</script>
<style lang="less" scoped>
  .button{
    margin: 0 auto;
  }
  .button1{
    flex: 1;
  }
  .button-right{
    margin-right: 1rem;
  }
</style>
