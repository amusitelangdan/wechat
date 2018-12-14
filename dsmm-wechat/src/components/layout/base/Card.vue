<template>
  <div class="housing">
    <slot name="housing-content"></slot>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
  .housing{
    padding: 0 8px;
    background: #fff;
    margin: 10px auto 5px;
  }
  .housing +.housing{
    margin: 5px auto;
  }
</style>
