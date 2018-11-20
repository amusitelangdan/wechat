<template>
  <div>
    <div style="margin: 0 1.5rem;border: 1px #ffae00 solid;border-radius: 6px;">
      <div class="card" style="border-radius: 6px;margin-top: 1rem">
        <div>
          <div style="color: #ffae00;font-size: 16px;float:left;">宝宝午睡时间趋势</div>
          <div style="float:right;color: #8c8c8c;">{{date}}</div>
        </div>
      </div>
      <div id="myChart" :style="{height: '180px', width: '100%'}"></div>
    </div>
    <!--宝宝饮水趋势-->
    <div style="margin: 2rem 1.5rem;border: 1px #ffae00 solid;border-radius: 6px;">
      <div class="card" style="border-radius: 6px;margin-top: 1rem;overflow:hidden;">
        <div>
          <div style="color: #ffae00;font-size: 16px;float:left;">宝宝午睡情况趋势</div>
          <div style="float:right;color: #8c8c8c;">{{date}}</div>
        </div>
      </div>
      <div class="table-left">
        <div v-if="widthClient >= 375" class="table-left-stomach">
          <div>自主入睡</div>
          <div>老师哄睡</div>
          <div>拒绝入睡</div>
        </div>
        <div v-else class="table-left-stomach" style="margin-top: 3.2rem;width: 4.5rem">
          <div>自主入睡</div>
          <div>老师哄睡</div>
          <div>拒绝入睡</div>
        </div>
        <div>
          <div v-if="widthClient >= 375" class="table-top">
            <div v-for="(item, index) in timeSure" :key="index">
              <span v-bind:class="{discolor: item === timeSure[timeSure.length - 1]}">{{item}}</span>
            </div>
          </div>
          <div v-else class="table-top">
            <div v-for="(item, index) in timeScreen" :key="index">
              <span  v-bind:class="{discolor: item === timeScreen[timeScreen.length - 1]}">{{item}}</span>
            </div>
          </div>
          <div v-if="widthClient >= 375" >
            <table :border="1">
              <tr>
                <td v-for="(item, index) in sleepSelf" :key="index">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) in sleepTeacher" :key="index">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) in refuseSleep" :key="index">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
            </table>
          </div>
          <div v-else >
            <table :border="1">
              <tr>
                <td v-for="(item, index) in sleepSelf" :key="index" style="width: 2.1rem">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) in sleepTeacher" :key="index" style="width: 2.1rem">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
              <tr>
                <td v-for="(item, index) in refuseSleep" :key="index">
                  <img v-if="item === '对'" :src="require('../../assets/img/icon/sendDetailComponents/daySummary_sendReport_yes.png')" alt="">
                  <span v-else>{{item}}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 3rem">
      <img :src="require('../../assets/img/icon/sendReport/QRcode.png')" alt="" style="width: 10rem;height: 10rem;margin: 0 auto;display: block">
      <div style="padding: 1rem 0 2rem;text-align: center;font-size: 12px">长按识别二维码&nbsp;&nbsp;&nbsp;&nbsp;关注袋鼠麻麻</div>
    </div>
  </div>
</template>

<script>
  // import html2canvas from 'html2canvas';
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
        date: '',
        image: '',
        temp: [35, 36, 37, 38, 38, 37, 40],
        sleepTime: [],
        sleep: [],
        timeSure: [],
        timeScreen: [],
        temperature: [],
        feelingContent: ['难过', '一般', '一般', '开心', '开心', '一般', '一般'],
        feeling: [],
        time: [],
        sleepInfoList: [],
        sleepSelf: [], // 自主入睡
        sleepTeacher: [], // 老师哄睡
        refuseSleep: [], // 拒绝入睡
        widthClient: '',
        maxSleep: '',
        minSleep: '',
      };
    },
    props: ['course', 'sleepReport'],
    methods: {
      // 获取屏幕宽度
      clientHeight() {
        this.widthClient = document.documentElement.clientWidth;
      },
      // 基于准备好的DOM初始化echarts实例
      labView() {
        this.feelingContent.forEach((item) => {
          if (item === '一般') {
            this.feeling.push(1);
          } else if (item === '开心') {
            this.feeling.push(2);
          } else if (item === '难过') {
            this.feeling.push(0);
          }
        });
        this.temp.forEach((item) => {
          if (item > 38) {
            this.temperature.push(38);
          } else {
            this.temperature.push(item);
          }
        });
        this.sleepTime.forEach((item) => {
          if (item === '----') {
            this.sleep.push(900);
          } else if (item !== '---') {
            if (item.length <= 4) {
              this.sleep.push(parseInt(`${item.slice(0, 1)}${item.slice(2, 4)}`, 10));
            } else {
              this.sleep.push(parseInt(`${item.slice(0, 2)}${item.slice(3, 5)}`, 10));
            }
          }
        });
        this.sleepInfoList.forEach((item) => {
          if (item === '拒绝睡觉') {
            this.refuseSleep.push('对');
          } else {
            this.refuseSleep.push('');
          }
        });
        this.sleepInfoList.forEach((item) => {
          if (item === '老师哄睡') {
            this.sleepTeacher.push('对');
          } else {
            this.sleepTeacher.push('');
          }
        });
        this.sleepInfoList.forEach((item) => {
          if (item === '独立入睡') {
            this.sleepSelf.push('对');
          } else {
            this.sleepSelf.push('');
          }
        });
        // 给x轴文字中间加上\n
        // this.time.forEach((item) => {
        //   let ret = ''; // 拼接加\n返回的内容
        //   const maxLength = 2; // 每项显示文字的个数
        //   const valLength = item.length; // x轴内容的文字个数
        //   const row = Math.ceil(valLength / maxLength);
        //   if (row > 1) { // 如果内容文字个数超过三个
        //     for (let i = 0; i < row; i += 1) {
        //       let temp = ''; // 每次截取的字符串
        //       const start = i * maxLength; // 每次截取的位置
        //       const end = start + 2;
        //       temp = `${item.substring(start, end)}\n`;
        //       ret += temp; // 最终的字符串
        //     }
        //     this.timeSure.push(ret);
        //   }
        // });
        if (this.sleep.length === 1) {
          this.maxSleep = this.sleep[0];  // 拓展运算符
          this.minSleep = 800;
        } else {
          this.maxSleep = Math.max(...this.sleep);  // 拓展运算符
          this.minSleep = Math.min(...this.sleep);
        }
        const myChart = echarts.init(document.getElementById('myChart'));
        const date = this.time[this.time.length - 1];
        // 绘制午睡时间图表
        const option = {
          grid: {
            left: 47,
          },
          textStyle: {
            fontSize: 13,
          },
          xAxis: {
            position: 'top',
            type: 'category',
            boundaryGap: false,  // 0刻度
            data: this.time,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc',
              },
            }, // 修改坐标轴颜色
            axisLabel: {
              // textStyle: {
              //   // color: '#8C8C8C',
              //   fontSize: 13,
              // }, // 修改文字颜色
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
            min: parseInt(this.maxSleep, 10),
            max: parseInt(this.minSleep, 10),
            splitNumber: 3, // 设置间隔数
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc',
              },
            },
            axisLabel: {
              // textStyle: {
              //   color: '#8c8c8c',
              //   fontSize: 13,
              // }, // 修改文字颜色
              formatter(value) {
                if (value < 1000) {
                  return '未睡';
                } else if (value >= 1100) {
                  if (value.toString().slice(2) >= 60) {
                    return `${parseInt(value.toString().slice(0, 2), 10) + 1}:00`;
                  }
                  return `${value.toString().slice(0, 2)}:${value.toString().slice(2, 4)}`;
                } else if (value > 1000 && value < 1200) {
                  return `0${value.toString().slice(0, 1)}:${value.toString().slice(1, 3)}`;
                }
              },
            },
          },
          series: [{
            data: this.sleep,
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
      },
    },
    watch: {
      sleepReport() {
        this.sleepReport.forEach((item) => {
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
          obj.sleep = JSON.parse(item.items).napTime;
          obj.sleepInfo = JSON.parse(item.items).modeValue;
          this.time.unshift(obj.time);
          this.sleepInfoList.unshift(obj.sleepInfo);
          this.sleepTime.unshift(obj.sleep);
        });
        this.time.forEach((index) => {
          let ret = ''; // 拼接加\n返回的内容
          const maxLength = 2; // 每项显示文字的个数
          const valLength = index.length; // x轴内容的文字个数
          const row = Math.ceil(valLength / maxLength);
          if (row > 1) { // 如果内容文字个数超过三个
            for (let i = 0; i < row; i += 1) {
              let temp = ''; // 每次截取的字符串
              const start = i * maxLength; // 每次截取的位置
              const end = start + 2;
              temp = `${index.substring(start, end)}\n`;
              ret += temp; // 最终的字符串
            }
            this.timeSure.push(ret);
          }
        });
        if (this.widthClient < 375) {
          this.time.forEach((item) => {
            const maxLength = 2; // 每项显示文字的个数
            const valLength = item.length; // x轴内容的文字个数
            const row = Math.ceil(valLength / maxLength);
            if (row > 1) { // 如果内容文字个数超过三个
              // let temp = ''; // 每次截取的字符串
              const temp = `${item.slice(maxLength)}`;
              this.timeScreen.push(temp);
            }
          });
        }
        // console.log(this.sleepTime, this.sleepInfoList, this.timeSure);
        this.labView();
      },
    },
    mounted() {
      this.labView();
    },
    created() {
      this.date = moment(this.$route.query.checkTime).format('YYYY-MM-DD');
      this.clientHeight();
    },
  };
</script>

<style scoped lang="less">
  table{
    border-collapse:collapse;
    border: 1px #dddddd solid;
    td{
      width: 2.2rem;
      height: 1.8rem;
      text-align: center;
      img{
        width: 1rem;
      }
    }
  }
  .table-top{
    font-size: 12px;
    display: flex;
    margin-bottom: 1rem;
    div{
      font-size: 12px;
      width: 1.9rem;
      text-align: center;
      margin:0 .25rem;
      color: #8c8c8c;
    }
  }
  .table-left{
    font-size: 12px;
    padding-bottom: 1rem;
    display: flex;
    margin-top: 1rem;
    .table-left-stomach{
      width: 3.6rem;
      margin-right: .2rem;
      margin-top: 3.1rem;
      text-align: right;
      color: #8c8c8c;
      div{
        height: 2rem;
        line-height: 2rem;
      }
    }
  }
  .discolor{
    color: #feae01;
  }
</style>
