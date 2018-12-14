<!--传入：姓名，照片，性别-->
<template>
  <div>
    <div class="head-box" v-if="type === 'row'">
      <slot name="head-content" class="head-content"></slot>
    </div>
    <div class="name" v-if="type === 'row'">{{name}}</div>
    <div v-if="star" class="star-box" style="display: flex">
      <div  class="star-content" v-for="(item, index) in gradeStar" :key="index">
        <i class="iconfont" :class="{'icon-star': item === 0, 'icon-star-select': item === 1}"></i>
      </div>
    </div>
    <div class="transverse" v-if="type === 'transverse'">
      <slot name="horizontal-head"></slot>
      <div class="info-content">
        <div style="display: flex">
          <div class="my-name">{{name}}</div>
          <div style="margin-left: 6px">
            <span class="my-office">{{office}}</span>
          </div>
        </div>
        <div class="phone-number">
          <dw-phone :tel-phone="phone"></dw-phone>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import DwPhone from './base/layout/Phone';
  /**
   * DwTeacherInfoGrid
   * @module components/planning/TeacherInfoGrid
   * @desc 老师信息展示组件
   * @param {string} [type=row] - 显示老师信息的类型，支持row（列），transverse（行）
   * @param {string} [name] - 老师姓名
   * @param {string} [star] - 老师星级
   * @param {Number} [maxStar] - 老师星级最大值，默认是5，传number类型
   * @param {string} [office] - 老师职位，例如前端工程师
   * @param {string} [phone] - 老师电话
   * @param {slot} [slot] - 老师照片
   *
   * @example
   * <DwTeacherInfoGrid name="老师姓名" type="transverse" office="前端工程师" phone="12345678900">
        <div slot="horizontal-head">
          <img src="../../assets/img/img/avatar/defaultAvatar.png" alt="" style="width: 50px;height: 50px;">
        </div>
     </DwTeacherInfoGrid>
   */
  export default {
    data() {
      return {
        gradeStar: [],
      };
    },
    props: {
      type: {
        type: String,
        default: 'row',
      },
      gender: Number,
      name: String,
      star: Number,
      maxStar: {
        type: Number,
        default: 5,
      },
      office: String,
      phone: String,
    },
    components: {
      DwPhone,
    },
    methods: {
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
    },
    created() {
      this.grade(this.star, this.maxStar);
      console.log(this.gradeStar);
    },
  };
</script>
<style lang="less" scoped>
  @import "./vars";
  .head-box{
    margin: 0 auto @margin_main;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: rgba(255,255,255,0.7);
    position: relative;
  }
  .name{
    color: @color_white;
    text-align: center;
    margin-bottom: @margin_main;
  }
  .star-box{
    width: 150px;
    margin: 0 auto;
  }
  .star-content{
    flex: 1;
    text-align: center;
  }
  i.icon-star-select{
    color: @color_primary;
    font-size: 20px;
  }
  i.icon-star{
    color: @color_primary;
    font-size: 20px;
  }
  .transverse{
    display: flex;
    .info-content{
      margin-top: 7px;
      margin-left: 10px;
      .my-name{
        font-size: @font_size_18;
      }
      .my-office{
        font-size: @font_size_mini;
        line-height: normal;
        color: @font_color_detail;
        padding: 0 5px;
        border: 1px #ccc solid;
        border-radius: 2px;
      }
      .phone-number{
        margin-top: 5px;
        color: @font_color;
      }
    }
  }
</style>
