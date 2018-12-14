<template>
  <div>
    <div style="display: flex;">
      <input type="text" v-model="valueInside">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        valueInside: '',
      };
    },
    props: ['value'],
    watch: {
      value(val) {
        this.valueInside = val;
      },
      valueInside(val, old) {
        this.$emit('input', val);
      },
    },
    created() {
      this.valueInside = this.value;
    },
  };
</script>
<style lang="less" scoped>
  input{
    width: 100%;
    border: none;
    outline: none;
    padding: .6rem .5rem;
    font-size: 14px;
    border-radius: 5px;
    background: rgba(0,0,0,0);
    height: 20px;
  }
</style>
