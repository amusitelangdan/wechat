// 说明：按钮组件，将各种不同样式的按钮封装在一起
// 传入：type，size

<script>
import { Button } from 'mint-ui';

export default {
  extends: Button,
  name: 'dw-button',
  methods: {

  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/vars.less";
.mint-button--default {
  .type(@bd-color-default,@color-warn);
  box-shadow: 0px 0px 1px 0px @bd-color-main;
}
.mint-button--primary {
  .type();
}
.mint-button--small {
  font-size: @fontSize-btn-sim;
  padding: 10px 30px;
  height: auto;
}
.mint-button--normal {
  font-size:  @fontSize-btn-normal;
  padding: 12px 32px;
  height: auto;
}
.mint-button--large {
  font-size:  @fontSize-btn-large;
  padding: 12px 0;
  height: auto;
}
.type(@bgcolor:@color-primary,@color: @color-white) {
  color: @color;
  background-color: @bgcolor;
}
.mint-button::after {
  background-color: #e19110;
  content: " ";
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
.mint-button.is-disabled {
  opacity: .6;
}
.mint-button--primary.is-disabled {
  background: @bd-color-main
}
</style>
