<template>
  <div class="card-round" style="margin-top: .9rem">
    <div class="card-cell border-b layout-new">
      <div class="card-left">
        <img src="../../../assets/img/icon/parentIndex/parent_lunch_logo.png" alt="">
      </div>
      <div style="flex: 1;">
        <div class="title" style="color: #ffac28;">今日午餐</div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
          <div style="flex: 1;">{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[0].content : ''}}:&nbsp;{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[0].value : ''}}</div>
          <div style="width: 6rem;">{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[1].content : ''}}:&nbsp;{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[1].value : ''}}</div>
        </div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
          <div style="flex: 1;">{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[2].content : ''}}:&nbsp;{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[2].value : ''}}</div>
          <div style="width: 6rem;">{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[3].content : ''}}:&nbsp;{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[3].value : ''}}</div>
        </div>
        <div style="display: flex;color: #4d4d4d;padding-bottom: .5rem">
          <div style="flex: 1;">{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[4].content : ''}}:&nbsp;{{JSON.parse(content.items).todayLunch.length !== 0 ? JSON.parse(content.items).todayLunch[4].value : ''}}</div>
        </div>
      </div>
    </div>
    <div style="padding: .5rem 0;text-align: center;color: #4d4d4d;" @click="jump">
      查看宝宝营养曲线&nbsp;&nbsp;>>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {};
    },
    props: ['content'],
    computed: {
      ...mapState({
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    methods: {
      jump() {
        this.$router.push({
          path: '/day/structure/report',
          query: {
            type: 3,
            childId: this.selectedChildId ? this.selectedChildId : this.$route.query.childId,
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
