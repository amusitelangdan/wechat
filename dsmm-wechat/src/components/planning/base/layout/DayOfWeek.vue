<!--要用span封装-->
<template>
  <span>
    {{weekDate}}
  </span>
</template>
<script>
  /**
   * DwDayOfWeek
   * @module components/planning/layout/DayOfWeek
   * @desc 日期显示组件（显示星期几）样式可由外部决定
   * @param {string} [dateTime] - 传入的日期，字符串类型，默认当天时间
   *
   * @example
   * <dw-day-of-week date-time="2018-11-11"></dw-day-of-week>
   */
  import moment from 'moment';

  export default {
    name: 'DayOfWeek',
    data() {
      return {
        weekList: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        weekDate: '',
      };
    },
    props: {
      dateTime: String,
    },
    created() {
      const r1 = moment(this.dateTime).day();
      this.weekDate = this.weekList[r1];
    },
  };
</script>
<style lang="less" scoped>

</style>
