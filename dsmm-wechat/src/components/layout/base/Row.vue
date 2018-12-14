<template>
  <div class="settingContent">
    <div class="setting-left"><slot name="left"></slot></div>
    <div class="setting-center"><slot name="center"></slot></div>
    <div class="setting-right"><slot name="right"></slot></div>
  </div>
</template>
<script>
</script>
<style lang="less" scoped>
  .settingContent{
    padding: 12px 0;
    display: flex;
    margin: 0;
  }
  .setting-left{
    text-align: left;
  }
  .setting-center{
    flex: 1;
    text-align: center;
    input{
      border: 0;
      outline: none;
      padding: 0;
    }
  }
  .setting-right{
    text-align: right;
    color: #999999;
    i{
      padding-left: 5px;
      font-size: 12px;
    }
    input{
      border: 0;
      outline: none;
    }
  }
</style>
