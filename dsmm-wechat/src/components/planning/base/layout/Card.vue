<!--shadow 类型问题-->
<template>
  <div class="card-box" :class="{cardCircle: type === 'circle', cardShadow: shadow === true}">
    <slot name="card-content"></slot>
  </div>
</template>

<script>
  /**
   * DwCard
   * @module components/planning/base/layout/Card
   * @desc 布局的基础卡片组件，不同的卡片封装在一起，处理基础的间距及效果，内部挂载slot
   * @param {String} [type=card] - 显示形式，有card（直角组件）, circle（圆角组件）默认card
   * @param {String} [size=large] - 卡片大小, 有large（大）,medium(中等)两种，默认large
   * @param {String} [shadow=no] - 卡片阴影, 有no（无阴影）,shadow(有阴影)两种，默认no
   *
   * @example
   * <dw-card type="circle" size="medium" shadow="shadow">
   *   <div slot="card-content"></div>
   * </dw-card>
   */
  export default {
    data() {
      return {};
    },
    props: {
      type: {
        type: String,
        default: 'card',
      },
      shadow: {
        type: Boolean,
        default: false,
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
  @import "../../vars";
  .card-box{
    padding: 14px;
    margin: 10px 0;
    background: @color_white;
  }
  .cardCircle{
    border-radius: @border_radius_often
  }
  .cardShadow{
    box-shadow: @box_shadow;
  }
</style>
