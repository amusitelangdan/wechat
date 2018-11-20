<template>
  <div>
    <div  class="card-round" style="margin-top: .9rem">
      <div class="card-cell border-b layout-new">
        <div class="card-left">
          <img src="../../../assets/img/icon/parentIndex/parent_check_logo.png" alt="">
        </div>
        <div style="flex: 1;">
          <div class="title" style="color: #1db562;">晨检报告</div>
          <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
            <div style="flex: 1;">体温:&nbsp;{{JSON.parse(content.items).bodyTemperature}}</div>
            <div style="width: 6rem;">口手:&nbsp;{{JSON.parse(content.items).headAndMouth}}</div>
          </div>
          <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
            <div style="flex: 1;">指甲:&nbsp;{{JSON.parse(content.items).nail}}</div>
            <div style="width: 6rem;">肢体:&nbsp;{{JSON.parse(content.items).bodyCondition}}</div>
          </div>
          <el-row style="color: #4d4d4d;padding-bottom: .5rem;">
            <el-col :span="11" style="margin-right: 1rem">
              <div v-if="JSON.parse(content.items).feeling === '开心' || JSON.parse(content.items).feeling === '超开心'"><span style="display: block;float:left;">情绪:&nbsp;&nbsp;</span><img :src="require('../../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_excietment.png')" alt="" style="width: 23px;height: 22px;display: block;float:left;"></div>
              <div v-else-if="JSON.parse(content.items).feeling === '一般' || JSON.parse(content.items).feeling === '很正常'"><span style="display: block;float:left;">情绪:&nbsp;&nbsp;</span><img :src="require('../../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_general.png')" alt="" style="width: 23px;height: 22px;display: block;float:left;"></div>
              <div v-else-if="JSON.parse(content.items).feeling === '难过' || JSON.parse(content.items).feeling === '略低落'"><span style="display:block;float:left;">情绪:&nbsp;&nbsp;</span><img :src="require('../../../assets/img/icon/sendDetailComponents/teacher_today_popup_emotion_noHappy.png')" alt="" style="width: 23px;height: 22px;display: block;float:left;"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="padding: .5rem 0;text-align: center;color: #4d4d4d;" @click="jump">
        查看宝宝晨检信息&nbsp;&nbsp;>>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        childId: '',
      };
    },
    props: ['content'],
    computed: {
      ...mapState({
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    methods: {
      jump() {
        if (this.selectedChildId) {
          this.childId = this.selectedChildId;
        } else if (this.$route.query.childId) {
          this.childId = this.$route.query.childId;
        } else {
          this.childId = this.content.child.id;
        }
        this.$router.push({
          path: '/day/structure/report',
          query: {
            type: 1,
            childId: parseInt(this.childId, 10),
            classId: this.content.classId,
            reportId: this.content.id,
            time: JSON.parse(this.content.items).detailTime ? JSON.parse(this.content.items).detailTime :
              JSON.parse(this.content.items).time,
            weekTime: JSON.parse(this.content.items).todayTime,
            checkTime: this.content.createTime ? this.content.createTime : '',
          },
        });
      },
    },
  };
</script>
<style lang="less" scoped>
  .information{
    margin: 0 auto;
    border-radius: 10px;
    background: #ffffff;
    border: 1px #cccccc solid;
  }
  .new_card{
    background-color: white;
    padding-right: 1rem;
    padding-left: 1rem;
    display: flex;
  }
  .card-round{
    background: #ffffff;
    width: 21.8rem;
    margin: 0 auto;
    line-height: 1.5rem;
    padding-right: 1rem;
    padding-left: 1rem;
    border-radius: 5px;
    box-shadow: 0 .1rem .8rem #f3f3f3,0 -.1rem .8rem #f3f3f3, -.1rem 0 .8rem #f3f3f3, .1rem 0 .8rem #f3f3f3;
  }
  .card-left{
    width: 5rem;
    padding: 3.5rem 1.5rem 0 0.5rem;
    img{
      width: 4rem;
      height: 4rem;
      display: block;
      margin: 0 auto;
    }
  }
  .layout-new{
    display: flex;
    padding-bottom: .5rem;
    padding-top: 0;
    .title{
      font-size: 16px;
      padding: 1.3rem 0 1.1rem;
    }
  }
</style>
