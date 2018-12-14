<template>
  <div  class="card-round" style="margin-top: .9rem">
    <div class="card-cell border-b layout-new">
      <div class="card-left">
        <i class="iconfont icon-baby_summary icon-icon"></i>
      </div>
      <div style="flex: 1;">
        <div class="title" style="color: #ed6066;">成长报告</div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
          <div style="flex: 1;">接走宝宝:&nbsp;{{JSON.parse(content.items).relationPn}}</div>
          <div style="width: 6rem;white-space:nowrap;">拉臭臭:&nbsp;{{JSON.parse(content.items).shit}}</div>
        </div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
          <div style="flex: 1;">离园体温:&nbsp;{{JSON.parse(content.items).bodyTemperature}}</div>
          <div style="width: 6rem;">喝水量:&nbsp;{{JSON.parse(content.items).drinkWater}}</div>
        </div>
        <el-row style="color: #4d4d4d;padding-bottom: .5rem;">
          <el-col :span="11" style="margin-right: 1rem">
            情绪: <i class="iconfont" :class="feeling.icon" style="font-size: 20px" :style="{color: feeling.color}"></i>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="padding: .5rem 0;text-align: center;color: #4d4d4d;" @click="jump">
      查看宝宝成长曲线&nbsp;&nbsp;>>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import constant from '../../../config/constant';

  export default {
    data() {
      return {
        childId: '',
        feeling: {},
      };
    },
    props: ['content'],
    computed: {
      ...mapState({
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    created() {
      constant.LEAVEMOODSTATUS.forEach((item) => {
        let data = '';
        if (JSON.parse(this.content.items).feeling === '开心') {
          data = '超开心';
        } else if (JSON.parse(this.content.items).feeling === '一般') {
          data = '很正常';
        } else {
          data = '略失落';
        }
        if (data === item.label || JSON.parse(this.content.items).feeling === item.label) {
          this.feeling = item;
        }
      });
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
            type: 5,
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
    text-align: center;
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
  i.icon-icon{
    font-size: 56px;
    line-height: normal;
    color: #ec6066;
  }
</style>
