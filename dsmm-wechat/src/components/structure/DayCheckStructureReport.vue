<template>
  <div style="overflow:hidden;">
    <div style="margin: 0 1.5rem;border: 1px #ffae00 solid;border-radius: 6px;">
      <div class="card" style="border-radius: 6px;margin-top: 1rem">
        <div>
          <div style="color: #ffae00;font-size: 16px;float:left;">宝宝晨检体温趋势</div>
          <div style="float:right;color: #8c8c8c;">{{date}}</div>
        </div>
      </div>
      <div id="myChart" :style="{height: '200px', width: '100%'}"></div>
    </div>
    <div style="margin: 2rem 1.5rem;border: 1px #ffae00 solid;border-radius: 6px;">
      <div class="card" style="border-radius: 6px;margin-top: 1rem">
        <div>
          <div style="color: #ffae00;font-size: 16px;float:left;">宝宝晨检情绪趋势</div>
          <div style="float:right;color: #8c8c8c;">{{date}}</div>
        </div>
      </div>
      <div id="myChartTwo" :style="{height: '200px', width: '100%'}"></div>
    </div>
    <div style="margin-top: 3rem">
    <img :src="require('../../assets/img/img/sendReport/QRcode.png')" alt="" style="width: 10rem;height: 10rem;margin: 0 auto;display: block">
    <div style="padding: 1rem 0 2rem;text-align: center;font-size: 12px">长按识别二维码&nbsp;&nbsp;&nbsp;&nbsp;关注袋鼠麻麻</div>
    </div>
  </div>
</template>

<script>
  // import echarts from 'echarts';
  import echarts from 'echarts/lib/echarts';
  import chinaJson from 'echarts/map/json/china.json';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import moment from 'moment';

  echarts.registerMap('china', chinaJson);

  export default {
    data() {
      return {
        image: '',
        temp: [],
        temperature: [],
        feelingContent: [],
        feeling: [],
        time: [],
        date: '',
      };
    },
    props: ['course', 'checkReport', 'isRequested'],
    methods: {
      // 基于准备好的DOM初始化echarts实例
      labView() {
        this.feelingContent.forEach((item) => {
          if (item === '一般' || item === '很正常') {
            this.feeling.push(1);
          } else if (item === '开心' || item === '超开心') {
            this.feeling.push(2);
          } else if (item === '难过' || item === '略低落') {
            this.feeling.push(0);
          }
        });
        this.temp.forEach((item) => {
          if (item > 38) {
            this.temperature.push(38);
          } else if (item < 35) {
            this.temperature.push(35);
          } else if (item >= 35 && item <= 38) {
            this.temperature.push(item);
          }
        });
        const myChart = echarts.init(document.getElementById('myChart'));
        const myChartTwo = echarts.init(document.getElementById('myChartTwo'));
        // 绘制晨检体温图表
        const date = this.time[this.time.length - 1];
        const option = {
          grid: {
            left: 47,
          },
          xAxis: {
            show: true,
            position: 'top',
            type: 'category',
            boundaryGap: false,
            data: this.time,
            axisLine: {
              lineStyle: {
                color: '#cccccc',
              },
            },
            axisLabel: {
              color(value) {
                return value === date ? '#feae01' : '#8c8c8c';
              },
              formatter(value) {
                let ret = ''; // 拼接加\n返回的内容
                const maxLength = 2; // 每项显示文字的个数
                const valLength = value.length; // x轴内容的文字个数
                const row = Math.ceil(valLength / maxLength);
                if (row > 1) { // 如果内容文字个数超过三个
                  for (let i = 0; i < row; i += 1) {
                    let temp = ''; // 每次截取的字符串
                    const start = i * maxLength; // 每次截取的位置
                    const end = start + 2;
                    temp = `${value.substring(start, end)}\n`;
                    ret += temp; // 最终的字符串
                  }
                  return ret;
                }
              },
            },
            splitLine: {
              show: true,
            },
          },
          yAxis: {
            type: 'value',
            min: 35,
            max: 38,
            splitNumber: 3,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc',
              },
            },
            axisLabel: {
              color(value) {
                if (value === '35') {
                  return '#cccccc';
                } else if (value === '36') {
                  return '#52b040';
                } else if (value === '37') {
                  return '#52b040';
                } else if (value === '38') {
                  return '#fa5901';
                }
              },
              formatter(value) {
                if (value <= 35) {
                  return '低烧';
                } else if (value === 36) {
                  return '36℃';
                } else if (value === 37) {
                  return '37℃';
                } else if (value === 38) {
                  return '高烧';
                }
              },
            },
          },
          series: [{
            data: this.temperature,
            type: 'line',
            hoverAnimation: false,
            itemStyle: {  // 修改折现颜色
              normal: {
                color: '#1792ef',
                lineStyle: {
                  color: '#1792ef',
                },
              },
            },
          }],
        };
        myChart.setOption(option);
        // 设置晨检情绪
        const optionTwo = {
          grid: {
            left: 47,
          },
          xAxis: {
            show: true,
            position: 'top',
            type: 'category',
            boundaryGap: false,
            data: this.time,
            axisLine: {
              lineStyle: {
                color: '#cccccc',
              },
            },
            axisLabel: {
              formatter(value) {
                let ret = ''; // 拼接加\n返回的内容
                const maxLength = 2; // 每项显示文字的个数
                const valLength = value.length; // x轴内容的文字个数
                const row = Math.ceil(valLength / maxLength);
                if (row > 1) { // 如果内容文字个数超过三个
                  for (let i = 0; i < row; i += 1) {
                    let temp = ''; // 每次截取的字符串
                    const start = i * maxLength; // 每次截取的位置
                    const end = start + 2;
                    temp = `${value.substring(start, end)}\n`;
                    ret += temp; // 最终的字符串
                  }
                  return ret;
                }
              },
              color(value) {
                return value === date ? '#feae01' : '#8c8c8c';
              },
            },
            // nameTextStyle: {
            //   verticalAlign: 'bottom',
            //   rich: {
            //     a: {
            //       lineHeight: 700,
            //     },
            //   },
            // },
            splitLine: {
              show: true,
            },
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 2,
            splitNumber: 2,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc',
              },
            },
            axisLabel: {
              // textStyle: {
              //   color: '#000000',
              // },
              color(value) {
                if (value === '0') {
                  return '#6fa6ff';
                } else if (value === '1') {
                  return '#ffa32c';
                } else if (value === '2') {
                  return '#fd5354';
                }
              },
              formatter(value) {
                if (value <= 0) {
                  return '难过';
                } else if (value === 1) {
                  return '良好';
                } else if (value === 2) {
                  return '兴奋';
                }
              },
            },
          },
          series: [{
            data: this.feeling,
            type: 'line',
            hoverAnimation: false,
            itemStyle: {  // 修改折现颜色
              normal: {
                color: '#1792ef',
                lineStyle: {
                  color: '#1792ef',
                },
              },
            },
          }],
        };
        myChartTwo.setOption(optionTwo);
      },
    },
    watch: {
      checkReport() {
        this.checkReport.forEach((item) => {
          const obj = {};
          if (moment(item.createTime).format('dddd') === '星期一') {
            obj.time = `${moment(item.createTime).format('DD')}周一`;
          } else if (moment(item.createTime).format('dddd') === '星期二') {
            obj.time = `${moment(item.createTime).format('DD')}周二`;
          } else if (moment(item.createTime).format('dddd') === '星期三') {
            obj.time = `${moment(item.createTime).format('DD')}周三`;
          } else if (moment(item.createTime).format('dddd') === '星期四') {
            obj.time = `${moment(item.createTime).format('DD')}周四`;
          } else if (moment(item.createTime).format('dddd') === '星期五') {
            obj.time = `${moment(item.createTime).format('DD')}周五`;
          } else if (moment(item.createTime).format('dddd') === '星期六') {
            obj.time = `${moment(item.createTime).format('DD')}周六`;
          } else if (moment(item.createTime).format('dddd') === '星期日') {
            obj.time = `${moment(item.createTime).format('DD')}周日`;
          }
          if (item.items) {
            obj.temp = JSON.parse(item.items).bodyTemperature.substring(0, JSON.parse(item.items).bodyTemperature.indexOf('℃'));
            obj.feeling = JSON.parse(item.items).feeling;
          }
          // this.temp.push(parseInt(obj.temp, 10));
          this.temp.unshift(parseFloat(obj.temp));
          this.time.unshift(obj.time);
          this.feelingContent.unshift(obj.feeling);
        });
        // console.log(this.temp, this.feelingContent, this.time);
        this.labView();
      },
    },
    mounted() {
      this.date = moment(this.$route.query.checkTime).format('YYYY-MM-DD');
      this.labView();
    },
  };
</script>

<style scoped lang="less">
</style>
