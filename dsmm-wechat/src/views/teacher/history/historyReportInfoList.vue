<template>
  <div>
    <select-type style="position: fixed;top: 0;left: 0;width: 100%;z-index: 2222;" v-on:selectType="selectType" v-bind:historyReportListType="historyReportListType"></select-type>
    <div class="page-loadmore-wrapper"   :style="{ height: wrapperHeight + 'px' }"  ref="wrapper">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                   :bottomPullText='bottomPullTextVal' :bottomDropText='bottomDropTextVal'
                   :bottomLoadingText='bottomLoadingTextVal' @bottom-status-change="handleBottomChange" :autoFill="false"  ref="loadmore" style="padding-top: 50px">
        <ShowReportDetail style="margin-bottom: 10px"  v-if="searchCondition.total !== 0"  v-for="(item, index) in createList.list" :key="index" :report="item" :childName="selectedChildName"></ShowReportDetail>
        <div style="padding: 15px;">
          <div style="width: 110px;overflow:hidden;margin: 0 auto">
            <div style="color: #d6d6d6;">
              <i class="iconfont icon-uparrow"></i>
              上拉加载更多</div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <!--<div class="layout-fixed" @click="shareScollTop">-->
      <!--<img src="../../../assets/img/icon/history/history_goTop.svg" alt="" width="25" height="25">-->
    <!--</div>-->
  </div>
</template>
<script>
  import SelectType from '../../../components/layout/SelectHistoryReport';
  import ShowReportDetail from '../../../components/report/ShowReportDetail';
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
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
    components: {
      SelectType,
      ShowReportDetail,
    },
    computed: {
      ...mapState({
        teacherSelectedClassId: state => state.teacher.teacherSelectedClassId,
        parseTime: state => state.parseTime,
        saveScrollHistory: state => state.saveScrollHistory,
        selectedChildName: state => state.parent.selectedChildName,
        historyReportListType: state => state.teacher.historyReportListType,
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
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      // 回到顶部按钮的函数
      // shareScollTop() {
      //   document.getElementsByClassName('page-loadmore-wrapper')[0].scrollTop = 0;
      // },
      // 获取列表信息
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
      // 选择type值
      selectType(index) {
        this.$store.commit('teacher/switchHistoryReportType', index);
        this.pickerFor = 0;
        this.searchCondition.total = 0;
        this.searchCondition.page = 0;
        this.createList.list = [];
        this.createList.pageNumber = 0;
        this.createList.pageSize = 0;
        this.createList.total = 0;
        this.searchCondition.pageVal = 1;
        this.historyListInfo();
      },
      // 接口请求的函数
      historyListInfo() {
        this.getClassHistoryReportList({
          classId: this.classId,
          pageNumber: this.searchCondition.pageVal,
          type: this.historyReportListType,
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
<style lang="less" scoped>
  @import '../../../assets/css/global';
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
    box-shadow: 0 3px 5px rgba(204,204,204,0.2),0 -3px 5px rgba(204,204,204,0.2), 3px 0px 5px rgba(204,204,204,0.2), -3px 0px 5px rgba(204,204,204,0.2);
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
