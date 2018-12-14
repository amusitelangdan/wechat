<template>
  <div class="card-round" style="margin-top: .9rem">
    <div class="card-cell border-b layout-new">
      <div class="card-left">
        <i class="iconfont icon-baby_lunch icon-icon"></i>
      </div>
      <div style="flex: 1;">
        <div class="title" style="color: #ffac28;">今日午餐</div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem;flex-wrap: wrap;">
          <div style="flex: 1;display: flex;padding-bottom: .5rem" v-for="(item, index) in JSON.parse(content.items).todayLunch" :key="index">
            <div style="width:4rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block">{{item.content}}</div>
            <div style="flex: 1">:&nbsp;{{item.value}}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: .5rem 0;text-align: center;color: #4d4d4d;" @click="jump">
      查看宝宝本周菜谱&nbsp;&nbsp;>>
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
    created() {
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
            type: 3,
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
    text-align: center;
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
  i.icon-icon{
    font-size: 56px;
    line-height: normal;
    color: #F5A626;
  }
</style>
