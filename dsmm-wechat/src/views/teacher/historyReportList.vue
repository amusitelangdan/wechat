<template>
  <div>
    <div class="page-loadmore-wrapper"   :style="{ height: wrapperHeight + 'px' }"  ref="wrapper">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                   :bottomPullText='bottomPullTextVal' :bottomDropText='bottomDropTextVal'
                   :bottomLoadingText='bottomLoadingTextVal' @bottom-status-change="handleBottomChange" :autoFill="false"  ref="loadmore">
        <div  v-for="(item, index) in createList.list" :key="index" style="margin-top: .7rem">
          <div class="card-cell" style="background: #fff;border: 0;padding: 1rem;">
            <div style="overflow: hidden;display: flex">
              <div class="list" v-if="item.type === 1">
                <img src="../../assets/img/icon/history/history_check.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 2">
                <img src="../../assets/img/icon/history/history_sleep.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 3">
                <img src="../../assets/img/icon/history/history_lunch.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 4">
                <img src="../../assets/img/icon/history/history_teach.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 5">
                <img src="../../assets/img/icon/history/history_summary.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 6">
                <img src="../../assets/img/icon/history/history_customize.png" alt="" class="list-right">
              </div>
              <div class="list" v-else-if="item.type === 7">
                <img src="../../assets/img/icon/history/history_customize.png" alt="" class="list-right">
              </div>
              <div style="width: 79%;height: 5rem;">
                <div style="font-weight: bold;font-size: 14px;display: flex">
                  <div v-if="item.type === 1">晨检报告</div>
                  <div v-else-if="item.type === 2">今日午睡</div>
                  <div v-else-if="item.type === 3">午餐信息</div>
                  <div v-else-if="item.type === 4">课程信息</div>
                  <div v-else-if="item.type === 5">每日总结</div>
                  <div v-else-if="item.type === 6">自定义报告</div>
                  <div v-else-if="item.type === 7">自定义报告</div>
                  <div style="flex:1;color: #969896;font-weight: 400;font-size: 12px;line-height: 18px;text-align: right">{{parseTime(item.createTime)}}</div>
                </div>
                <div style="display: flex;height: 2rem;font-size: 12px;line-height: 2rem;overflow: hidden">
                  <div style="flex: 1;">
                    <div v-if="item.memo">{{item.memo}}</div>
                  </div>
                </div>
                <div style="font-size: 12px">
                  <div style="height: 25px; color: #969896;line-height: 25px;">
                    <div style="float:left;margin-right: 1rem" v-if="item.staff">班主任：{{item.staff.name}}</div>
                    <div v-if="item.child" style="height: 25px; color: #969896">To: {{item.child.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-t" style="padding: 12px 0;text-align: center;background: #fff;color: #a2a2a2;" @click="detail(item)">
            查看详情
          </div>
        </div>
        <div style="padding: 15px;">
          <div style="width: 100px;overflow:hidden;margin: 0 auto">
            <img src="../../assets/img/icon/history/history_top.png" alt="" style="height: 14px;display: block;float:left;">
            <div style="color: #d6d6d6;float: left;">上拉加载更多</div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="layout-fixed" @click="shareScollTop">
      <img src="../../assets/img/icon/history/history_goTop.svg" alt="" width="25" height="25">
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'HistoryReportList',
    data() {
      return {
        // 上拉加载，下拉刷新
        searchCondition: {
          total: 0,
          page: 0,
          pageVal: 1,
          pageSize: 10,
        },
        allLoaded: false, // 是否可以上拉属性，false为可以上拉，true为禁止上拉
        status: '',
        bottomPullTextVal: '上划加载更多数据',
        bottomDropTextVal: '释放更新',
        bottomLoadingTextVal: '加载中...',
        topPullTextVal: '下拉加载更多数据',
        topDropTextVal: '释放更新',
        topLoadingTextVal: '加载中...',
        topStatus: '',
        bottomStatus: '',
        pickerFor: '',
        wrapperHeight: 0,
        // 结束
        createList: {
          list: [],
          pageNumber: '',
          pageSize: '',
          total: '',
        },
      };
    },
    computed: {
      ...mapState({
        teacherSelectedClassId: state => state.teacher.teacherSelectedClassId,
        parseTime: state => state.parseTime,
        saveScrollHistory: state => state.saveScrollHistory,
      }),
    },
    methods: {
      ...mapActions({
        getClassHistoryReportList: 'teacher/getClassHistoryReportList',
      }),
      // 上拉加载
      loadBottom() {
        if (this.searchCondition.page === this.createList.total) {
          this.allLoaded = true;
          this.$refs.loadmore.onBottomLoaded();
        } else {
          this.searchCondition.pageVal += 1;
          this.getListInfo();
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      shareScollTop() {
        document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop = 0;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      getListInfo() {
        if (this.searchCondition.pageVal === 0) {
          this.historyListInfo();
        } else if (this.searchCondition.pageVal !== 0) {
          if (this.searchCondition.page < this.createList.total) {
            this.historyListInfo();
          } else if (this.searchCondition.page > this.createList.total) {
            this.allLoaded = true;
          }
        }
      },
      historyListInfo() {
        this.getClassHistoryReportList({
          classId: this.classId,
          pageNumber: this.searchCondition.pageVal,
        }).then((res) => {
          this.pickerFor = res.obj.total;
          this.searchCondition.total = res.obj.total;
          this.searchCondition.page = res.obj.list.length;
          res.obj.list.forEach((item) => {
            this.createList.list.push(item);
          });
          this.createList.pageNumber = res.obj.pageNumber;
          this.createList.pageSize = res.obj.pageSize;
          this.createList.total = res.obj.total;
          return this.createList;
        });
      },
      detail(item) {
        this.$router.push({
          path: '/dayInfo',
          query: {
            reportId: item.id,
            childId: item.child ? item.child.id : '',
          },
        });
      },
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      if (document.getElementsByClassName('page-loadmore-wrapper')) {
        setTimeout(() => {
          this.$nextTick(() => {
            document.getElementsByClassName('page-loadmore-wrapper')[0].addEventListener('scroll', () => {
              this.$store.commit('saveHistoryScroll', document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop);
            });
          });
        }, 1000);
      }
    },
    activated() {  // activated 为keep-alive加载时调用
      if (this.classId !== this.teacherSelectedClassId) {
        this.classId = this.teacherSelectedClassId;
        this.pickerFor = 0;
        this.searchCondition.total = 0;
        this.searchCondition.page = 0;
        this.createList.list = [];
        this.createList.pageNumber = 0;
        this.createList.pageSize = 0;
        this.createList.total = 0;
        this.searchCondition.pageVal = 1;
        document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop = 0;
        this.historyListInfo();
      } else if (this.classId === this.teacherSelectedClassId) {
        if (this.saveScrollHistory > 0) {
          document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop = this.saveScrollHistory;
        }
      }
    },
    beforeUpdate() {
      this.$nextTick(() => {
        document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop = this.saveScrollHistory;
      });
    },
    created() {
      this.classId = this.teacherSelectedClassId;
      this.historyListInfo();
    },
  };
</script>

<style scoped lang="less">
  @import '../../assets/css/global';
  .hello {
    text-align: center;
    margin-top: 20px;
  }
  .list{
    width: 4.5rem;
    height: 5rem;
    margin-right: 1rem;
    .list-right{
    width:4.5rem;
    height:4.5rem;
    display: inline-block;
    margin-top: 0
  }
  }
  .page-loadmore-wrapper{
    overflow:auto;
    -webkit-overflow-scrolling : touch; // 解决view滑动速度慢或者卡顿问题
  }
  .layout-fixed{
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 3.5rem;
    background-color: #fff;
    box-shadow: 0 3px 5px #cccccc,0 -3px 5px #cccccc, 3px 0px 5px #cccccc, -3px 0px 5px #cccccc;
     img {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
     }
  }
</style>
