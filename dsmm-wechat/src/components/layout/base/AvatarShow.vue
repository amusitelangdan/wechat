<template>
  <div>
    <div v-if="avatarUrl !== ''"  class="g-avatar photoAvatar" :style="{backgroundImage: `url(${avatarUrl})`}">
    </div>
    <div v-else class="g-avatar g-defaultAvatar"></div>
  </div>
</template>
<script>
  export default {
    props: {
      avatarUrl: {
        type: String,
        default: '',
      },
    },
    data() {
      return {};
    },
  };
</script>
<style lang="less" scoped>
  .photoAvatar{
    background-repeat: no-repeat;
    background-size: cover
  }
  .g-avatar{
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;
    position: relative;
  }
  .g-defaultAvatar{
    background: url(../../../assets/img/img/avatar/teacher_default_avator.png) no-repeat center;
    background-size: cover;
  }
</style>
