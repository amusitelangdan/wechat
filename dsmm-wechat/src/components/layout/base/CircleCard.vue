<template>
  <div class="box">
    <slot name="content"></slot>
  </div>
</template>
<script>

</script>
<style lang="less" scoped>
  .box{
    background-color: #ffffff;
    margin: 10px 13px 0;
    box-shadow: 2px 0 4px rgba(235,235,235,1), -2px 0 4px rgba(235,235,235,1), 0 2px 4px rgba(235,235,235,1),  0 -2px 4px rgba(237,237,237,1);
    border-radius: 5px;
  }
</style>
