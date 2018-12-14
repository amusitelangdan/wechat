<!--span问题-->
<template>
  <span>
    {{time}}
  </span>
</template>
<script>
  import moment from 'moment';
  /**
   * DwTimeToNow
   * @module components/planning/layout/TimeToNow
   * @desc  显示距离今日的时间组件
   * @param {string} [dateTime] - 传入的时间，字符串形式，默认当前时间 日期格式: YYYY-MM-DD HH:mm:ss
   *
   * @example
   * <dw-time-to-now date-time="传入时间"></dw-time-to-now>
   */
  export default {
    data() {
      return {
        time: '',
      };
    },
    props: {
      dateTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
    },
    created() {
      this.time = moment(this.dateTime).fromNow();
    },
  };
</script>
<style lang="less" scoped>

</style>
