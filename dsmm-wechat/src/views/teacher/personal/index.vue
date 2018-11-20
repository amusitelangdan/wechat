<template>
<div>
  <div class="card layout-background" style="overflow:hidden;">
    <div class="avatar">
      <div v-if="teacherInfo.photo" class="defaultAvator" :style="{backgroundImage: `url(${teacherInfo.photo})`}"></div>
      <div v-else class="defaultAvator"></div>
    </div>
    <div class="teacherName">{{teacherInfo.name}}</div>
    <div class="teacher_star">
      <div v-for="(item, index) in gradeStar" :key="index">
        <div :class="{star: item === 1}"></div>
      </div>
    </div>
  </div>
  <div class="include_option">
    <div class="card-cell option" @touchstart="changeColor(0)" @touchmove="moveValue" @touchend="changeValue(0)" :class="{changeBackground: change === 0}">
      <div class="optionName">姓名</div>
      <div class="optionValue">
        <div class="icon-right"></div>
        <div>{{teacherInfo.name}}</div>
      </div>
    </div>
    <div class="card-cell option" @touchstart="changeColor(1)" @touchmove="moveValue" @touchend="changeValue(1)" :class="{changeBackground: change === 1}">
      <div class="optionName">手机号码</div>
      <div class="optionValue">
        <div class="icon-right"></div>
        <div>修改</div>
      </div>
    </div>
    <div class="card-cell option" @touchstart="changeColor(2)" @touchmove="moveValue" @touchend="changeValue(2)" :class="{changeBackground: change === 2}">
      <div class="optionName">生日</div>
      <div class="optionValue">
        <div class="icon-right"></div>
        <div>{{pickerBirthday}}</div>
      </div>
    </div>
  </div>
  <div class="include_option">
    <div class="card-cell option" @touchstart="changeColor(3)" @touchmove="moveValue" @touchend="changeValue(3)" :class="{changeBackground: change === 3}">
      <div class="optionName">退出登录</div>
    </div>
  </div>
  <mt-popup
    v-model="popupName"
    popup-transition="popup-fade" style="border-radius: 5px;">
    <div class="changeName">
      <div>输入姓名</div>
      <input type="text" :placeholder="teacherInfo.name" v-model="teacherName">
      <div class="button-group" style="padding-top: 1rem">
        <div class="button-return_submit" style="color: #999999" @click="cancel">返回</div>
        <div class="button-sure_submit" style="color: #fff" @click="define">确认</div>
      </div>
    </div>
  </mt-popup>
  <mt-datetime-picker
    ref="picker"
    type="date"
    :startDate="startDate"
    :endDate="endDate"
     @confirm="birthday">
  </mt-datetime-picker>
</div>
</template>
<script>
  import moment from 'moment';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        popupName: false,
        pickerBirthday: '',
        startDate: new Date('1970-01-01'),
        endDate: new Date('2018-01-01'),
        teacherInfo: {},
        teacherName: '',
        gradeStar: [],
        change: '',
        moveTouch: true,
      };
    },
    created() {
      this.getTokenTeacherInfo().then((res) => {
        this.teacherInfo = res.obj;
        // 通过grade方法判断赢展示几星
        this.grade(this.teacherInfo.level, 5);
        this.pickerBirthday = moment(this.teacherInfo.birthday).format('YYYY-MM-DD');
      });
    },
    methods: {
      ...mapActions({
        getTokenTeacherInfo: 'teacher/getTokenTeacherInfo',
        postTeacherName: 'teacher/postTeacherName',
        getTeacherBirthday: 'teacher/getTeacherBirthday',
      }),
      grade(index, max) {
        const a = max - index;
        const b = max - a;
        for (let i = 0; i < a; i += 1) {
          this.gradeStar.push(0);
        }
        for (let i = 0; i < b; i += 1) {
          this.gradeStar.unshift(1);
        }
      },
      changeColor(index) {
        this.change = index;
        this.moveTouch = true;
      },
      moveValue() {
        this.moveTouch = false;
      },
      changeValue(index) {
        this.change = '';
        if (this.moveTouch) {
          if (index === 0) {
            this.popupName = true;
          } else if (index === 1) {
            this.$router.push('/teacher/personal/phone');
          } else if (index === 2) {
            this.$refs.picker.open();
          } else if (index === 3) {
            this.$toast('退出成功');
            // localStorage.removeItem('w-token');
            // localStorage.removeItem('summaryDetail');
            // localStorage.removeItem('sleepDetail');
            // localStorage.removeItem('checkDetail');
            // localStorage.removeItem('phone');
          }
        }
      },
      cancel() {
        this.popupName = false;
      },
      define() {
        if (!this.teacherName) {
          this.teacherName = this.teacherInfo.name;
        }
        this.popupName = false;
        if (this.teacherName !== this.teacherInfo.name) {
          this.postTeacherName({
            staffName: this.teacherName,
          }).then(() => {
            this.$router.go(0);
          });
        } else {
          this.$toast('名称未修改');
        }
      },
      birthday(data) {
        this.pickerBirthday = moment(data).format('YYYY-MM-DD');
        const time = moment(this.teacherInfo.birthday).format('YYYY-MM-DD');
        if (this.pickerBirthday !== time) {
          this.getTeacherBirthday({
            birthday: this.pickerBirthday,
          }).then(() => {
            this.$router.go(0);
          });
        } else {
          this.$toast('生日未修改');
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .layout-background{
    background: url(../../../assets/img/icon/defaultAvatar/teacher_default_background.png);
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    padding:0 0 1rem;
  }
  .problem{
    overflow: hidden;
    padding-top: .5rem;
    div{
      width: 25px;
      height: 25px;
      border-radius: 100%;
      border: 1px #cccccc solid;
      float: right;
    }
  }
  .font{
    text-align: center;
    border:0;
    padding-top: 1.5rem;
  }
  .avatar{
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    background-color: rgba(255,255,255,0.3);
    margin: 2rem auto .5rem;
    position: relative;
  }
  .defaultAvator{
    position: absolute;
    width: 4.3rem;
    height: 4.3rem;
    border-radius: 100%;
    background-image: url(../../../assets/img/icon/defaultAvatar/teacher_default_avator.png);
    background-repeat: no-repeat;
    background-size: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .teacherName{
    text-align: center;
    color: #FFFFFF;
  }
  .teacher_star{
    width: 150px;
    margin: 0 auto;
    display: flex;
    div{
      width: 30px;
      height: 30px;
      div{
        width: 20px;
        height: 20px;
        margin: 5px auto;
        background-image: url(../../../assets/img/icon/teacherPersonal/noStar.png);
        background-size: cover;
        background-repeat: no-repeat;
      }
      .star{
        background-image: url(../../../assets/img/icon/teacherPersonal/star.png);
      }
    }
  }
  .include_option{
    background-color: #ffffff;
    margin-top: 1rem;
    .option{
      display: flex;
      padding-left: 1rem;
      padding-right: 1rem;
      .optionName{
        flex: 1;
        text-align: left;
      }
      .optionValue{
        flex: 1;
        text-align: right;
        overflow: hidden;
        div{
          float: right;
          margin-left: .5rem;
          color: #cccccc;
        }
      }
    }
  }
  .changeName{
    padding: 1.5rem  1rem 0;
    width: 17rem;
    border-radius: 5px;
    input{
      height: 30px;
      font-size: 16px;
      padding: .5rem 4rem .5rem .5rem;
      border-radius: 5px;
      border: 0;
      outline: none;
      background: #F6F6F6;
    }
    div{
      padding-bottom: .6rem;
      color: #797979;
      font-size: 18px;
    }
    .confirm{
      display: flex;
      div{
        flex: 1;
        padding: 1rem;
        text-align: center;
      }
      .sure{
        color: #F5A626;
      }
    }
  }
  .icon-right{
    background-image: url(../../../assets/img/icon/global/arrow-right.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 6px;
    height: 10px;
    margin-top: 3px;
  }
  .changeBackground{
    background: rgba(0,0,0,0.1);
  }
</style>
