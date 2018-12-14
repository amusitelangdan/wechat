<!--SLEEPMODESTATUS 放入内部-->
<!--蒙层等应放入组件内部-->
<!--testData命名问题-->
<template>
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal=false
    position="bottom" style="width: 100%;" @touchmove.prevent>
    <confirmation v-on:confirm="confirm" v-on:cancel="cancel"></confirmation>
    <mt-picker ref="pickered" :slots="sloted"></mt-picker>
  </mt-popup>
</template>
<script>
  import Confirmation from '../../../../components/button/PopUpConfirmation';
  /**
   * DwSleepEnum
   * @module components/planning/base/input/SleepEnum
   * @desc 按钮
   * @param {string} [value] - v-model，当传入选择的值以后发生改变并通过$emit('input',传出的值) 传出 返回事件：input, change
   *
   * @example
   * <dw-sleep-enum v-model="testObject" v-on:confirm="传出去选择的文案"></dw-sleep-enum>
   */
  export default {
    components: {
      Confirmation,
    },
    props: {
      value: Boolean,
    },
    data() {
      return {
        popupVisible: false,
        sloted: [{
          flex: 1,
          values: ['独立入睡', '老师哄睡', '拒绝入睡'],
          className: 'slot1',
          textAlign: 'center',
        }],
      };
    },
    watch: {
      value(val) {
        this.popupVisible = val;
      },
    },
    methods: {
      confirm() {
        this.$emit('input', false);
        this.$emit('confirm', this.$refs.pickered.getSlotValue(0));
      },
      cancel() {
        this.$emit('input', false);
      },
    },
  };
</script>
<style lang="less" scoped>

</style>
