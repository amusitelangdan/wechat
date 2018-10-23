<template>
  <div>
    <div style="text-align: center; margin: 1rem">
      全局灰底
    </div>
    基础布局类：
    <div class="card">
      <div class="card-cell">
        card嵌套card-cell或以下几个类,条目自动处理底边，如下
      </div>
      <div class="card-cell_down">
        card-cell_down下拉
      </div>
      <div class="card-cell_up">
        card-cell_up收回
      </div>
      <div class="card-cell_link">
        card-cell_link链接
      </div>
      <div class="card-cell_cancel">
        card-cell_cancel删除
      </div>
    </div>
    <div class="card">
      <div class="card-cell">
        多个card自动处理间距，如上
      </div>
    </div>

    <div class="card-round_grey">
      <div class="card-cell">
        灰色圆角卡片card-round_grey，其他内部嵌套与card相同
      </div>
    </div>
    <div class="card-round_white">
      <div class="card-cell">
        白色圆角卡片card-round_white，其他内部嵌套与card相同
      </div>
    </div>

    <br>
    <br>
    <br>

    按钮类：
    <div class="button-block_primary">button-block_primary</div>
    <div class="button-block_grey">button-block_gery</div>
    <div class="button-block_warning">button-block_warning</div>
    <div class="button-block_white">button-block_white</div>

    <div class="card">
      <div class="card-cell card-row-container">
        <div class="button-inline_primary">primary</div>
        <div class="button-inline_grey">grey</div>
        <div class="button-inline_warning">warning</div>
        <div class="button-inline_primary_transparent">primary</div>
      </div>
    </div>

    <br>
    <br>
    <br>
    输入框类：
    <div style="padding: 1rem">
      <input type="text" class="input_line" placeholder="点击时线条会变色">
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
    },
    created() {

    },
  };
</script>
<style lang="less" scoped>
  @import "../assets/css/global";
</style>
