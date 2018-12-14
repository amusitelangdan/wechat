<template>
  <!--说明：老师工作台首页的数字检查，封装好样式-->
  <!--传入：总数，完成数-->
  <div class="locationed">
    <div style="text-align: center">
      <i class="iconfont icon-chenggong1" v-if="calculated === total"></i>
      <i class="iconfont icon-jinggao" v-if="calculated !== total"></i>
      <span>{{calculated}}/{{total}}</span>
    </div>
  </div>
</template>
<script>
  /**
   * DwNumCheck
   * @module components/planning/base/layout/NumCheck
   * @desc 数字检查，封装好样式
   * @param {Number} [total] - 总数
   * @param {Number} [calculated] - 已检查
   *
   * @example
   * <dw-num-check total="1" calculated="2"></dw-num-check>
   */
  export default {
    props: {
      total: Number,
      calculated: Number,
    },
  };
</script>
<style lang="less" scoped>
  .locationed{
    display: flex;
  }
  i{
    font-size: 14px;
    line-height: normal
  }
  i.icon-chenggong1{
    color: #67C23A;
  }
  i.icon-jinggao{
    color: #F56C6C;
  }
</style>
