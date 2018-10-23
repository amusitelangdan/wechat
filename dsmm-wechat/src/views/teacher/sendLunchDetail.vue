<template>
  <div>
    <div>
      <div class="card border-b">
        <child-info style="padding: .5rem 0;" :name="teacherSelectedChildInfo.name" :img="teacherSelectedChildInfo.photo"></child-info>
      </div>
      <div class="card" style="margin-top: 0">
        <div style="display: flex">
          <!--@click="timeSelect"-->
          <div class="new-card-cell" style="flex: 1;display: flex;">
            <div style="flex: 1;">进餐时间:</div>
            <div style="flex: 1;">
              <div style="float:left;">11:00-11:30</div>
            </div>
          </div>
          <div style="flex: 1;display: flex;padding: 1rem 0" @click="modeSelect">
            <div style="flex: 1;margin-left: 1rem">进餐方式:</div>
            <div style="flex: 1;">
              <div  style="float:left;">{{dayLunchInfoList.items.modeValue ? dayLunchInfoList.items.modeValue : '独立进食'}}</div>
              <img src="../../assets/img/icon/global/arrow-right.png" alt="" style="width: .5rem;height: 1rem;margin-left: .5rem;display:block;margin-top: .2rem;float:left;">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--进餐时间-->
    <!--进餐方式-->
    <mt-popup
      :closeOnClickModal=false
      v-model="popupVisible"
      position="bottom" style="width: 100%;">
      <confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect"></confirmation>
      <mt-picker ref="pickered" :slots="sloted"></mt-picker>
    </mt-popup>
    <div class="card">
      <div class="card-cell" style="padding: 2rem 0;">
        <div style="height: 4rem;margin-top: 2rem;display: flex;position: relative;" v-for="(item , index) in dayLunchInfoList.items.todayLunch" :key="index">
          <div style="width: 2.5rem;height: 1.2rem;position: absolute;top: 2.8rem;left: 5rem;">没吃</div>
          <div style="width: 2.5rem;height: 1.2rem;position: absolute;top: 2.8rem;left: 40%;">1/3</div>
          <div style="width: 37px;height: 1.2rem;position: absolute;top: 2.8rem;left: 58%;">1/2</div>
          <div style="width: 37px;height: 1.2rem;position: absolute;top: 2.8rem;left: 75.5%;">2/3</div>
          <div style="width: 37px;height: 1.2rem;position: absolute;top: 2.8rem;left: 90%;">吃完</div>
          <span style="width: 5rem;margin-right: 1rem;margin-top: .7rem">{{item.content}}</span>
          <el-slider
            :show-tooltip="false"
            v-model="item.initial"
            :step="10"
            :max="40"
            show-stops style="flex: 1;margin-right: 1rem"
            @change="rangeValue(item, index)"
          >
          </el-slider>
        </div>
      </div>
    </div>
    <div class="card" style="margin: 0;display: flex;flex-wrap: wrap;padding-bottom: 1rem">
      <Thumbnail v-for="(image, index) in dayLunchInfoList.photos" :key="index" v-bind:image="image" v-bind:imageUrlList="dayLunchInfoList.photos"  v-on:deleteImage="deleteImage"></Thumbnail>
      <UploadPhotos v-if="dayLunchInfoList.photos.length <= 8"  v-on:uploaded="uploaded" style="float:left;"></UploadPhotos>
    </div>
    <div class="card" style="margin-top: 0">
          <textarea rows="4" placeholder="可添加备注信息"
                    style="-webkit-appearance: none;appearance: none;width: 100%;outline: none;border-radius: 5px;padding: .8rem .6rem;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;resize:none"
                    v-model="dayLunchInfoList.memo"  wrap="hard"></textarea>
    </div>
    <div class="button-block_primary" @click="sureSubmit">
      提交
    </div>
    <mt-popup
      v-model="popVisible"
      popup-transition="popup-fade" style="border-radius: .25rem;" @touchmove.prevent>
      <div class="card" style="width:18rem;border-radius: .25rem;" @touchmove.prevent>
        <div style="padding: 1rem 0;">午餐消息</div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">进餐时间:</div>
          <div class="color-warning"  style="float: left">11:00-11:30</div>
        </div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">进餐方式:</div>
          <div class="color-warning"  style="float: left">{{dayLunchInfoList.items.modeValue ? dayLunchInfoList.items.modeValue : '独立进食'}}</div>
        </div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食:</div>
          <div class="color-warning"  style="float: left">{{mainFood}}</div>
        </div>
        <div class="time" style="overflow: hidden;">
          <div style="float: left;margin-right: 1rem">菜&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;汤:</div>
          <div class="color-warning"  style="float: left;">
            <div style="word-wrap:break-word;float:left;">{{dish}}</div>
          </div>
        </div>
        <div class="card-cell" style="display: flex;flex-wrap: wrap;">
          <div style="width: 5.5rem;height: 5.5rem;margin: .2rem;overflow:hidden;"  v-for="(item, index) in dayLunchInfoList.photos" :key="index" >
            <img :src="item" alt="" style="height: 5.5rem;">
          </div>
        </div>
        <div style="padding: 1rem 0;font-size: 12px;color: #484848;">
          确认后并发送宝宝圈信息
        </div>
        <div class="button-group">
          <div class="button-return_submit" @click="error">返回修改</div>
          <div class="button-sure_submit" @click="success">确认发送</div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Confirmation from '../../components/button/PopUpConfirmation';
  import UploadPhotos from '../../components/button/UploadPhotos';
  import Thumbnail from '../../components/layout/Thumbnail';
  import ChildInfo from '../../components/layout/ChildInfo';
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'LunchList',
    data() {
      return {
        value7: 0,
        dish: '',
        mainFood: '',
        popupVisible: false,
        popVisible: false,
        sloted: [
          {
            flex: 1,
            values: ['独立进食', '老师喂食', '拒绝吃饭', '辅助进食'],
            className: 'slot4',
            textAlign: 'center',
            value: '1',
          },
        ],
        imageUrlList: [],
        imageUrl: '',  // 图片url
        detailTime: '',
      };
    },
    computed: {
      ...mapState({
        todaySchedule: state => state.teacher.todaySchedule,
        teacherSelectedChildInfo: state => state.teacher.teacherSelectedChildInfo,
        dayLunchInfoList: state => state.teacher.dayLunchInfoList,
      }),
    },
    components: {
      Confirmation,
      UploadPhotos,
      Thumbnail,
      ChildInfo,
    },
    created() {
      const d = new Date();
      this.detailTime = moment(d).format('YYYY-MM-DD');
      const data = JSON.parse(this.todaySchedule.todayLunch).foods;
      this.dayLunchInfoList.items.todayLunch = data.map(item => ({
        content: item.foodName,
        initial: 0,
        value: '没吃',
        typeName: item.typeName,
      }));
      const contentList = [];
      const stapleList = [];
      this.dayLunchInfoList.items.todayLunch.forEach((item) => {
        if (item.typeName === '主食') {
          stapleList.push(item.content);
        } else {
          contentList.push(item.content);
        }
      });
      this.mainFood = stapleList.join('、');
      this.dish = contentList.join('、');
    },
    methods: {
      ...mapActions({
        getTodaySchedule: 'teacher/getTodaySchedule',
        postReport: 'teacher/postReport',
      }),
      timeSelect() {
        this.$refs.picker.open();
      },
      modeSelect() {
        this.popupVisible = true;
      },
      handleConfirm(data) {
        this.dayLunchInfoList.items.mealTime = data;
      },
      confirmSelect() {
        this.dayLunchInfoList.items.modeValue = this.$refs.pickered.getSlotValue(0);
        this.popupVisible = false;
      },
      cancelSelect() {
        this.popupVisible = false;
      },
      rangeValue(item, index) {
        if (item.initial === 0) {
          this.dayLunchInfoList.items.todayLunch[index].value = '没吃';
        } else if (item.initial === 10) {
          this.dayLunchInfoList.items.todayLunch[index].value = '吃1/3';
        } else if (item.initial === 20) {
          this.dayLunchInfoList.items.todayLunch[index].value = '吃1/2';
        } else if (item.initial === 30) {
          this.dayLunchInfoList.items.todayLunch[index].value = '吃2/3';
        } else if (item.initial === 40) {
          this.dayLunchInfoList.items.todayLunch[index].value = '吃完';
        }
      },
      //      提交
      sureSubmit() {
        this.popVisible = true;
      },
      clickToConfirm(value) {
        this.popVisible = value;
      },
      error() {
        this.popVisible = false;
      },
      success() {
        this.popVisible = false;
        const data = JSON.stringify({
          mealTime: '11:00-11:30',
          lunchToday: this.dish,
          todayLunch: this.dayLunchInfoList.items.todayLunch,
          modeValue: this.dayLunchInfoList.items.modeValue,
          detailTime: this.detailTime,
        });
        const payload = {
          type: 3,
          photos: JSON.stringify(this.dayLunchInfoList.photos),
          items: data,
          memo: this.dayLunchInfoList.memo.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\s/g, ' '),
        };
        this.postReport(payload);
      },
      // 图片上传
      uploaded(index) {
        this.imageUrl = index;
        if (this.dayLunchInfoList.photos.length <= 8) {
          this.dayLunchInfoList.photos.push(index);
        } else {
          this.$toast('最多可以上传九张图片');
        }
      },
      // 删除图片
      deleteImage(index) {
        let num = 0;
        this.dayLunchInfoList.photos.forEach((item, line) => {
          if (item === index) {
            num = line;
            return num;
          }
        });
        this.dayLunchInfoList.photos.splice(num, 1);
      },
    },
  };
</script>
<style lang="less" scoped>
</style>
