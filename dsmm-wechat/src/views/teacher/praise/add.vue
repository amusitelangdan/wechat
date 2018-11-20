<template>
  <div>
    <div class="card layout border-b" @touchstart="openSelect(1)" @touchend="Select(1)" @touchmove="moveSelect" :class="{changeBackground: change === 1}">
      <div class="praiseType">请选择好评类型</div>
      <div class="type"><span>{{submitData.praise}}</span><span v-if="!submitData.praise">锦旗</span></div>
      <div class="praiseTypeRight">></div>
    </div>
    <div class="card layout border-b" @touchstart="openSelect(2)" @touchend="Select(2)" @touchmove="moveSelect" :class="{changeBackground: change === 2}">
      <div class="praiseType">收到好评时间</div>
      <div class="type">
        <span v-if="pickerPraiseTypeTime">{{submitData.praiseTypeTime}}</span>
        <span v-if="!pickerPraiseTypeTime">时间</span>
      </div>
      <div class="praiseTypeRight">></div>
    </div>
    <div class="card" style="margin: 0;">
      <div class="card-cell" style="border: 0;">添加图片</div>
      <div class="layout-flex">
        <Thumbnail v-for="(image, index) in submitData.imageUrlList" :key="index" v-bind:image="image" v-bind:imageUrlList="submitData.imageUrlList"  v-on:deleteImage="deleteImage"></Thumbnail>
        <UploadPhotos v-if="submitData.imageUrlList.length < 9" v-on:uploaded="uploaded" ></UploadPhotos>
      </div>
      <textarea  rows="6" placeholder="可添加备注信息" v-model="submitData.memo"></textarea>
    </div>
    <div class="button-block_primary button" @click="submit">提交</div>
    <mt-popup
      v-model="popupPraiseType"
      position="bottom" style="width: 100%">
      <confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect" @touchmove.prevent></confirmation>
      <mt-picker :slots="praiseType" ref="picker" value-key="label" ></mt-picker>
    </mt-popup>
    <mt-datetime-picker
      ref="pickerTime"
      type="date"
      v-model="pickerPraiseTypeTime" @confirm="changePickerPraiseTypeTime">
    </mt-datetime-picker>
  </div>
</template>
<script>
  import Confirmation from '../../../components/button/PopUpConfirmation';
  import UploadPhotos from '../../../components/button/UploadPhotos';
  import Thumbnail from '../../../components/layout/Thumbnail';
  import moment from 'moment';
  import { mapState, mapActions } from 'vuex';
  import { HIGNOPINION } from '../../../config/constant';
  // import * as HIGNOPINION from '../../../config/constant';
  import rule from '../../../config/validate';
  import onValidate from '../../../utils/validate';

  const { evaluate, evaluateTime, evaluatePhotos } = rule;
  const ruleObj = {
    type: evaluate,
    praiseTypeTime: evaluateTime,
    imageUrlList: evaluatePhotos,
  };
  export default {
    data() {
      return {
        popupPraiseType: false,
        touchSelect: true,
        change: '',
        pickerPraiseTypeTime: '',
        imgUrl: '',
        submitData: {
          type: '',
          memo: '',
          imageUrlList: [],
          praiseTypeTime: '',
          praise: '',
        },
      };
    },
    computed: {
      praiseType() {
        return [{
          flex: 1,
          values: HIGNOPINION,
          className: 'slot1',
          textAlign: 'center',
        }];
      },
      ...mapState({
        evaluationList: state => state.teacher.evaluationList,
      }),
    },
    components: {
      Confirmation,
      UploadPhotos,
      Thumbnail,
    },
    /* eslint-disable no-new */
    methods: {
      ...mapActions({
        getEvaluationAdd: 'teacher/getEvaluationAdd',
      }),
      openSelect(index) {
        this.change = index;
        this.touchSelect = true;
      },
      moveSelect() {
        this.touchSelect = false;
      },
      Select(index) {
        this.change = '';
        if (this.touchSelect) {
          if (index === 2) {
            this.$refs.pickerTime.open();
          } else {
            this.popupPraiseType = true;
          }
        }
      },
      confirmSelect() {
        this.popupPraiseType = false;
        this.submitData.praise = this.$refs.picker.getSlotValue(0).label;
        this.submitData.type = this.$refs.picker.getSlotValue(0).type;
      },
      cancelSelect() {
        this.popupPraiseType = false;
      },
      uploaded(url) {
        if (this.submitData.imageUrlList.length <= 8) {
          this.submitData.imageUrl = url;
          this.submitData.imageUrlList.push(url);
        }
      },
      deleteImage(index) {
        let num = 0;
        this.submitData.imageUrlList.forEach((item, line) => {
          if (item === index) {
            num = line;
            return num;
          }
        });
        this.submitData.imageUrlList.splice(num, 1);
      },
      changePickerPraiseTypeTime(index) {
        this.submitData.praiseTypeTime = moment(index).format('YYYY-MM-DD');
      },
      submit() {
        if (!this.submitData.type) {
          this.submitData.type = 1;
          this.submitData.praise = '锦旗';
        }
        const list = Object.keys(ruleObj).map(item => onValidate(this.submitData[item], ruleObj[item]))
        .filter(item => !item.valid);
        /*
        * filter(item => !item.valid): 将item.valid为true的全部返回,list中只留下了valid为false的数据
        * */
        if (list.length > 0) {
          // 当list.length > 0说明list中有值，还有校验没有完成，需要提示
          this.$toast(list[0].errorMessage);
          return;
        }
        this.getEvaluationAdd({
          type: this.submitData.type,
          photos: JSON.stringify(this.submitData.imageUrlList),
          memo: this.submitData.memo,
          evaluationDate: this.submitData.praiseTypeTime,
        }).then(() => {
          this.$toast('提交成功');
          setTimeout(() => {
            this.$router.push('/teacher/praise/commit');
          }, 1000);
        });
      },
    },
    mounted() {
    },
  };
</script>
<style lang="less" scoped>
  .changeBackground{
    background: rgba(0,0,0,0.1);
  }
  .layout {
    display: flex;
    margin: 0;
  }

  .praiseType {
    padding: 1rem 0;
    text-align: left;
    flex: 1;
  }

  .praiseTypeRight {
    padding: 1rem 0;
    width: 1rem;
  }

  .type{
    padding: 1rem 0;
    text-align: right;
    margin-right: .5rem;
    flex: 1;
  }
  textarea {
    width: 100%;
    border-color: #cccccc;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    padding: .5rem;
    box-sizing: border-box;
  }
  .layout-flex{
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 1rem;
  }
</style>
