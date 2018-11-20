<template>
  <div id="element">
    <img v-if="type.toString() === '5'" :src="require('../../assets/img/icon/sendReport/backgroundImag_summary.png')" alt="" class="background-img">
    <img v-else-if="type.toString() === '1'" :src="require('../../assets/img/icon/sendReport/backgroundImag_check.png')" alt="" class="background-img">
    <img v-else-if="type.toString() === '2'" :src="require('../../assets/img/icon/sendReport/backgroundImag_sleep.png')" alt="" class="background-img">
    <img v-else-if="type.toString() === '3'" :src="require('../../assets/img/icon/sendReport/backgroundImag_lunch.png')" alt="" class="background-img">
    <img v-else-if="type.toString() === '4'" :src="require('../../assets/img/icon/sendReport/backgroundImag_teach.png')" alt="" class="background-img">
    <div class="box_shadow" style="background:#ffffff;margin: 10rem 1rem 0;">
      <div class="card" style="height: 9rem;position: relative;z-index: 2000;">
        <div class="layout-shadow" style="overflow:hidden;z-index: 2500;">
          <img v-if="message.photo" :src="message.photo" alt="" style="width: 5rem;height: 5rem;">
          <img v-if="!message.photo" :src="require('../../assets/img/icon/defaultAvatar/defaultAvatar.png')" style="width: 5rem;height: 5rem;">
        </div>
        <div style="overflow:hidden;">
          <div style="margin-top: 3.5rem;height:4.5rem;">
            <div style="text-align: center;padding: 0 0 .2rem;">{{message.name}}</div>
            <div style="text-align: center;">{{parseBirthday(message.birthday ? message.birthday : '2018-01-01')}}</div>
            <div style="text-align: center;padding: .1rem 0 0;">在袋鼠麻麻·托育园成长生活{{lifeTime(message.createTime ? message.createTime : '0天')}}啦</div>
          </div>
        </div>
      </div>
      <DaySleepStructureReport v-if="type.toString() === '2'" v-bind:course="course"  v-bind:sleepReport="sleepReport"></DaySleepStructureReport>
      <DayTeachStructureReport v-else-if="type.toString() === '4'" v-bind:course="weekLesson" v-bind:time="time" v-bind:weekTime="weekTime"></DayTeachStructureReport>
      <DayCheckStructureReport v-else-if="type.toString() === '1'" v-bind:course="course" v-bind:checkReport="checkReport"></DayCheckStructureReport>
      <DayLunchStructureReport v-else-if="type.toString() === '3' && data.length" v-bind:weekLunch="data" v-bind:time="time" ></DayLunchStructureReport>
      <DaySummaryStructureReport v-else-if="type.toString() === '5'" v-bind:course="course" v-bind:summaryReport="summaryReport"></DaySummaryStructureReport>
    </div>
    <div style="margin-top: 30px;padding: 0 5rem 2rem;">
      <img v-if="type.toString() === '1'" :src="require('../../assets/img/icon/sendReport/Structure_check_quality.png')" alt="" style="display: block;width: 100%">
      <img v-else-if="type.toString() === '2'" :src="require('../../assets/img/icon/sendReport/Structure_sleep_quality.png')" alt="" style="display: block;width: 100%">
      <img v-else-if="type.toString() === '3'" :src="require('../../assets/img/icon/sendReport/Structure_lunch_quality.png')" alt="" style="display: block;width: 100%">
      <img v-else-if="type.toString() === '4'" :src="require('../../assets/img/icon/sendReport/Structure_teach_quality.png')" alt="" style="display: block;width: 100%">
      <img v-if="type.toString() === '5'" :src="require('../../assets/img/icon/sendReport/Structure_summary_quality.png')" alt="" style="display: block;width: 100%">
    </div>
  </div>
</template>

<script>
  import DaySleepStructureReport from '../../components/structure/DaySleepStructureReport';
  import DayTeachStructureReport from '../../components/structure/DayTeachStructureReport';
  import DayCheckStructureReport from '../../components/structure/DayCheckStructureReport';
  import DayLunchStructureReport from '../../components/structure/DayLunchStructureReport';
  import DaySummaryStructureReport from '../../components/structure/DaySummaryStructureReport';
  import html2canvas from 'html2canvas';
  import { mapActions, mapState } from 'vuex';
  import moment from 'moment';

  export default {
    data() {
      return {
        message: {},
        title: '',
        desc: '',
        imgUrl: '',
        type: '',
        classId: '',
        reportId: '',
        course: {},
        weekLunch: {},
        imageUrl: '',
        time: '',
        // type===3时
        mondayFoods: [],
        data: [],
        // type === 4时
        weekLesson: {
          mondayLesson: [],
          thursdayLesson: [],
          wednesdayLesson: [],
          tuesdayLesson: [],
          fridayLesson: [],
        },
        weekTime: '',
        // type === 1
        checkReport: [],
        // type === 2
        sleepReport: [],
        // type === 5
        summaryReport: [],
      };
    },
    components: {
      DaySleepStructureReport,
      DayTeachStructureReport,
      DayCheckStructureReport,
      DayLunchStructureReport,
      DaySummaryStructureReport,
    },
    computed: {
      ...mapState({
        lifeTime: state => state.lifeTime,
        parseBirthday: state => state.parseBirthday,
        selectedClassId: state => state.parent.selectedClassId,
      }),
    },
    methods: {
      ...mapActions({
        getChildInfo: 'getChildInfo',
        getReportDetail: 'getReportDetail',
        uploadPhotoCanvas: 'uploadPhotoCanvas',
        getWeekLunch: 'getWeekLunch',
        getWxConfig: 'getWxConfig',
        getWeekLesson: 'getWeekLesson',
        getHistoryReport: 'getHistoryReport',
      }),
      // 微信链接js-sdk中的分享页面
      wxPreview() {
        if (this.type.toString() === '1') {
          this.title = '宝宝入园后，身体状态一直很稳定，每天开开心心的~';
          this.desc = '[入园晨检]体温,情绪,手足,全监控';
          this.imgUrl = 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E6%99%A8%E6%A3%80.png';
        } else if (this.type.toString() === '3') {
          this.title = '宝宝吃的这么棒，托育园区饭菜香又香';
          this.desc = '[营养午餐]营养搭配,茁壮成长';
          this.imgUrl = 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E5%8D%88%E9%A4%90.png';
        } else if (this.type.toString() === '2') {
          this.title = '我家宝宝睡午觉啦，安静沉睡的样子真可爱';
          this.desc = '[午睡报告]舒适室温,安心入睡';
          this.imgUrl = 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E5%8D%88%E7%9D%A1.png';
        } else if (this.type.toString() === '4') {
          this.title = '小小年纪学本领，唱歌跳舞绘画样样行';
          this.desc = '[CARE课程]生活、运动、情感、社交、创造';
          this.imgUrl = 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E8%AF%BE%E7%A8%8B.png';
        } else if (this.type.toString() === '5') {
          this.title = '宝宝放学啦~离园状态、身体情况宝爸宝妈都Get';
          this.desc = '[离园情况]离园情况，安全把控';
          this.imgUrl = 'https://dsmm-oss.oss-cn-hangzhou.aliyuncs.com/share/%E7%A6%BB%E5%9B%AD.png';
        }
        let link = '';
        if (this.message.photo) {
          link = `https://wechat.daishumm.com/static/share.html?url=${this.imageUrl}&imgUrl=${encodeURIComponent(this.message.photo)}`;
        } else {
          link = `https://wechat.daishumm.com/static/share.html?url=${this.imageUrl}`;
        }
        wx.ready(() => {
          // 分享朋友圈
          wx.onMenuShareTimeline({
            title: this.title, // 分享标题
            link,
            imgUrl: this.imgUrl,
            success(resolve) {
              console.log('分享成功');
            },
            cancel(response) {
              console.log(response);
            },
          });
          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: this.title,
            link,
            desc: this.desc,
            imgUrl: this.imgUrl,
            success(resolve) {
              console.log(resolve);
            },
          });
        });
        wx.error((err) => {
          console.log(err);
        });
        // const title = '我家宝宝在袋鼠麻麻里面棒棒哒,你确定不点进来看一下?';
      },
      beforeInline() {
        setTimeout(() => {
          html2canvas(document.body, {
            allowTaint: false, // 允许污染
            useCORS: false, // 使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
            logging: false,
          }).then((canvas) => {
            if (!HTMLCanvasElement.prototype.toBlob) {
              Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                value(callback, type, quality) {
                  const binStr = atob(this.toDataURL(type, quality).split(',')[1]);
                  const len = binStr.length;
                  const arr = new Uint8Array(len);
                  for (let i = 0; i < len; i += 1) {
                    arr[i] = binStr.charCodeAt(i);
                  }
                  callback(new Blob([arr], { type: type || 'image/png' }));
                },
              });
            }
            canvas.toBlob((blob) => {
              const reader = new FileReader();
              reader.readAsArrayBuffer(blob);
              reader.onload = (event) => {
                this.uploadPhotoCanvas({
                  fileName: `html2canvas/${new Date().getTime()}.png`,
                  data: event.target.result,
                }).then((url) => {
                  this.imageUrl = encodeURIComponent(url);
                  this.wxPreview();
                });
              };
            });
          });
        }, 1000);
      },
      // convertImgToBase64(img) {
      //   const canvas = document.createElement('canvas');
      //   const ctx = canvas.getContext('2d');
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   ctx.drawImage(img, 0, 0, img.width, img.height);
      //   const ext = img.src.substring(img.src.lastIndexOf('ex.') + 1).toLowerCase();
      //   const dataURL = canvas.toDataURL(`image/${ext}`);
      //   // canvas.call(this, dataURL);
      //   // canvas = null;
      //   console.log(dataURL);
      //   return dataURL;
      // },
    },
    mounted() {
      this.beforeInline();
    },
    created() {
      this.type = this.$route.query.type;
      this.classId = this.$route.query.classId;
      this.reportId = this.$route.query.reportId;
      this.time = this.$route.query.time;
      this.weekTime = this.$route.query.weekTime;
      this.getChildInfo({
        childId: this.$route.query.childId,
      }).then((res) => {
        this.message = res.obj;
      });
      if (this.type.toString() === '3') {
        this.getWeekLunch({
          date: this.time,
          classId: this.selectedClassId,
          reportId: this.$route.query.reportId,
        }).then((res) => {
          this.weekLunch = res.obj;
          const mondayFoods = JSON.parse(this.weekLunch.monday).foods;
          const thursdayFoods = JSON.parse(this.weekLunch.thursday).foods;
          const wednesdayFoods = JSON.parse(this.weekLunch.wednesday).foods;
          const tuesdayFoods = JSON.parse(this.weekLunch.tuesDay).foods;
          const fridayFoods = JSON.parse(this.weekLunch.friday).foods;
          const mondayFood = {
            foodStaple: [],
            foodSupplement: [],
            foodSoup: [],
            week: '星期一',
            date: moment(this.$route.query.time).isoWeekday(1).format('YYYY.MM.DD'),
          };
          const thursdayFood = {
            foodStaple: [],
            foodSupplement: [],
            foodSoup: [],
            week: '星期二',
            date: moment(this.$route.query.time).isoWeekday(2).format('YYYY.MM.DD'),
          };
          const wednesdayFood = {
            foodStaple: [],
            foodSupplement: [],
            foodSoup: [],
            week: '星期三',
            date: moment(this.$route.query.time).isoWeekday(3).format('YYYY.MM.DD'),
          };
          const tuesdayFood = {
            foodStaple: [],
            foodSupplement: [],
            foodSoup: [],
            week: '星期四',
            date: moment(this.$route.query.time).isoWeekday(4).format('YYYY.MM.DD'),
          };
          const fridayFood = {
            foodStaple: [],
            foodSupplement: [],
            foodSoup: [],
            week: '星期五',
            date: moment(this.$route.query.time).isoWeekday(5).format('YYYY.MM.DD'),
          };
          mondayFoods.forEach((item) => {
            if (item.typeName === '主菜') {
              mondayFood.foodStaple.push(item);
            } else if (item.typeName === '辅菜') {
              mondayFood.foodSupplement.push(item);
            } else if (item.typeName === '汤') {
              mondayFood.foodSoup.push(item);
            }
          });
          thursdayFoods.forEach((item) => {
            if (item.typeName === '主菜') {
              thursdayFood.foodStaple.push(item);
            } else if (item.typeName === '辅菜') {
              thursdayFood.foodSupplement.push(item);
            } else if (item.typeName === '汤') {
              thursdayFood.foodSoup.push(item);
            }
          });
          wednesdayFoods.forEach((item) => {
            if (item.typeName === '主菜') {
              wednesdayFood.foodStaple.push(item);
            } else if (item.typeName === '辅菜') {
              wednesdayFood.foodSupplement.push(item);
            } else if (item.typeName === '汤') {
              wednesdayFood.foodSoup.push(item);
            }
          });
          tuesdayFoods.forEach((item) => {
            if (item.typeName === '主菜') {
              tuesdayFood.foodStaple.push(item);
            } else if (item.typeName === '辅菜') {
              tuesdayFood.foodSupplement.push(item);
            } else if (item.typeName === '汤') {
              tuesdayFood.foodSoup.push(item);
            }
          });
          fridayFoods.forEach((item) => {
            if (item.typeName === '主菜') {
              fridayFood.foodStaple.push(item);
            } else if (item.typeName === '辅菜') {
              fridayFood.foodSupplement.push(item);
            } else if (item.typeName === '汤') {
              fridayFood.foodSoup.push(item);
            }
          });
          const array = [];
          array.push(mondayFood);
          array.push(thursdayFood);
          array.push(wednesdayFood);
          array.push(tuesdayFood);
          array.push(fridayFood);
          this.data = array;
        });
      }
      if (this.type.toString() === '4') {
        this.getWeekLesson({
          date: this.time,
        }).then((res) => {
          // console.log(res);
          this.weekLesson.mondayLesson = JSON.parse(res.obj.monday);
          this.weekLesson.thursdayLesson = JSON.parse(res.obj.thursday);
          this.weekLesson.wednesdayLesson = JSON.parse(res.obj.wednesday);
          this.weekLesson.tuesdayLesson = JSON.parse(res.obj.tuesday);
          this.weekLesson.fridayLesson = JSON.parse(res.obj.friday);
          // console.log(this.weekLesson);
        });
      }
      if (this.type.toString() === '5') {
        this.getHistoryReport({
          childId: this.$route.query.childId,
          type: 5,
          date: this.$route.query.checkTime,
        }).then((res) => {
          this.summaryReport = res.obj;
          this.isRequested = true;
        });
      }
      if (this.type.toString() === '1') {
        this.getHistoryReport({
          childId: this.$route.query.childId,
          type: 1,
          date: this.$route.query.checkTime,
        }).then((res) => {
          this.checkReport = res.obj;
          this.isRequested = true;
        });
      }
      if (this.type.toString() === '2') {
        this.getHistoryReport({
          childId: this.$route.query.childId,
          type: 2,
          date: this.$route.query.checkTime,
        }).then((res) => {
          this.sleepReport = res.obj;
        });
      }
      this.getReportDetail({
        reportId: this.reportId,
      }).then((res) => {
        this.course = res.obj;
      });
    },
  };
</script>

<style scoped lang="less">
  #element{
    position: relative;
    overflow:hidden;
    background: #F5F5F5;
    .background-img{
      display: block;
      height: 12rem;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    .layout-shadow{
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      position: absolute;
      left: 10rem;
      top: -2.5rem;
      box-shadow: 0 .3rem .5rem #e0dfdf;
    }
  }
  .box_shadow{
    box-shadow: 2px 0 10px #cccccc,-2px 2px 10px #cccccc;
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#cccccc', Direction=135, Strength=5);/*for ie6,7,8*/
    -moz-box-shadow:2px 0 10px #cccccc,-2px 2px 10px #cccccc;/*firefox*/
    -webkit-box-shadow:2px 0 10px #cccccc,-2px 2px 10px #cccccc;/*webkit*/
  }
</style>
