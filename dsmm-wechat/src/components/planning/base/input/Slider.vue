
<script>
import { Slider } from 'element-ui';
/**
 * @module dw-range - 滑块组件
 * @param 参数参照element-ui
 * @event 事件参照element-ui
 * @example
 *  <dw-slider   v-model="item.value1"  :min="0" :max="10" :show-stops="true"
 *              @change="selectScore"></dw-slider>
 */
export default {
  extends: Slider,
  name: 'dw-range',
  props: {

  },
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/vars.less";
.el-slider__stop{
    width: 7px;
    height: 7px;
    background-color: @color-primary;
    top:50%;
    transform: translate(-50%,-50%);
} 
.el-slider__runway{
  border:1px solid #a9acb1;
  background: @bd-color-default;
}
.el-slider__button{
  border-color: @color-primary;
}
.el-slider__runway .el-slider__stop{
    background-color: #fff;
}
.el-slider__runway,{
    height: 8px;
}
.el-slider__bar{
    height: 100%;
     background: @color-primary;
}
.el-slider__runway {
    margin: 8px 0;
    background-color: #FFECCC;
    border: 1px #FFECCC solid;
}
</style>
