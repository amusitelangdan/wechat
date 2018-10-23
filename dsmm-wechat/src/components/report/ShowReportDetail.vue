<template>
  <div class="border-b" style="background: #ffffff;">
    <div class="card-cell" style="padding-bottom: 0">
      <!--报告头部-->
      <div v-if="report.staff" style="display: flex;" class="new_card">
        <div style="width: 30px;height: 30px;border-radius: 50%;margin-right: 1rem;overflow: hidden">
          <img v-if="report.staff.photo" :src="report.staff.photo" alt="" style="display: block;width: 30px;margin: 0 auto;">
          <img v-else-if="!report.staff.photo" :src="require('../../assets/img/icon/defaultAvatar/teacher_default_avator.png')" alt="" style="display: block;width: 30px;margin: 0 auto;">
        </div>
        <div style="flex: 1;">
          <div style="width: 100%;height: 20px;padding-top: .5rem">
            <div style="padding-right: .5rem;float:left;margin: 0;font-size: 16px">{{report.staff ? report.staff.name : ''}}</div>
            <div style="float: left;color: #a6a6a6;line-height: 18px;">
              <div v-if="report.type === 1">发布·晨检报告</div>
              <div v-else-if="report.type === 2">发表·午睡报告</div>
              <div v-else-if="report.type === 3">发表·午餐报告</div>
              <div v-else-if="report.type === 4">发表·每日课程</div>
              <div v-else-if="report.type === 5">发表·离园报告</div>
              <div v-else-if="report.type === 6">发表·报告</div>
              <div v-else-if="report.type === 7">发表·报告</div>
            </div>
            <div style="float: right;color: #989898;font-size: 12px;margin-top: 2px;">{{parseTime(report.createTime)}}</div>
          </div>
        </div>
      </div>
      <!--报告详情-->
      <div class="card-cell" style="padding-bottom: 0;padding-top: 0">
        <!--报告备注-->
        <div class="card" v-if="report.memo" style="padding-top: .5rem">
          <div  style="padding: .3rem 0 0;word-wrap:break-word;" v-for="(item, index) in report.memo.split('<br>')" :key="index">{{item}}</div>
        </div>
        <!--报告照片，视频-->
        <div>
          <div v-if="report.photos && JSON.parse(report.photos).length !== 0" class="card" style="display: flex;flex-wrap: wrap;margin: .5rem 0">
            <el-col :span="8" v-for="(item, index) in JSON.parse(report.photos)" :key="index">
              <div style="width: 7.5rem;height: 7.5rem;margin: .3rem auto;overflow:hidden;background-size: cover;background-repeat: no-repeat" :style="{backgroundImage: `url(${item})`}" @click="preview(item)"></div>
            </el-col>
          </div>
          <div v-if="report.video" class="card" style="display: flex;flex-wrap: wrap;margin-top: 1rem">
            <el-col :span="24"  >
              <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
            </el-col>
            <!--<el-col :span="24">-->
              <!--<play-video v-bind:videoUrl="report.video"></play-video>-->
            <!--</el-col>-->
          </div>
        </div>
        <!--不同类型报告卡片-->
        <!--每日晨检-->
        <day-check  v-if="report.type === 1" v-bind:content="report"></day-check>
        <!--午睡报告-->
        <day-sleep v-if="report.type === 2"  v-bind:content="report"></day-sleep>
        <!--今日午餐-->
        <day-lunch v-if="report.type === 3"  v-bind:content="report"></day-lunch>
        <!--今日课程-->
        <day-teach v-if="report.type === 4" v-bind:content="report"></day-teach>
        <!--成长报告-->
        <day-summary  v-if="report.type === 5" v-bind:content="report"></day-summary>
        <!--点赞评论按钮及功能-->
        <div class="card-cell" style="padding-bottom: 0">
          <!--评论按钮-->
          <div class="card" style="overflow:hidden;">
            <div style="float: right;padding: .2rem .8rem;border: 1px #cccccc solid;border-radius: .9rem;margin-left: 1rem">
              <img :src="require('../../assets/img/icon/parentIndex/parent_comment.png')" alt="" style="width: 1rem;height: 1rem;float: left;margin-top: .2rem;margin-right: .2rem">
              <div style="float: left;" @click="openComment">评论</div>
            </div>
            <!--点赞按钮-->
            <div v-if="report.like === false" style="float: right;padding: .2rem .8rem;border: 1px #cccccc solid;border-radius: .9rem">
              <img :src="require('../../assets/img/icon/parentIndex/parent_NotLike.png')" alt="" style="width: 1.1rem;height: 1rem;float: left;margin-top: .2rem;margin-right: .2rem">
              <div style="float: left;" @click="parentLike">点赞</div>
            </div>
            <div v-else-if="report.like === true" style="float: right;padding: .2rem .8rem;border: 1px #cccccc solid;border-radius: .9rem">
              <img :src="require('../../assets/img/icon/parentIndex/parent_like.png')" alt="" style="width: 1.1rem;height: 1rem;float: left;margin-top: .2rem;margin-right: .2rem">
              <div style="float: left;color: #F5A626" @click="parentLike">已赞</div>
            </div>
          </div>
          <div class="card">
            <div v-if="report.like || report.wechatReportCommentList ? report.wechatReportCommentList.length !== 0 : 0" style="background: #eeeeee;width: 100%;height: 1px;margin-bottom: 1rem"></div>
          </div>
          <!--点赞内容显示-->
          <div class="card" style="overflow: hidden;">
            <img v-if="(report.wechatReportLikeList ? report.wechatReportLikeList['length']  : 0) > 0" :src="require('../../assets/img/icon/parentIndex/parent_like.png')" alt="" style="width: 1.1rem;height: 1rem;float: left;margin-top: .2rem;margin-right: .2rem">
            <div v-for="(parent, parentList) in report.wechatReportLikeList" :key="parentList" style="float:left;">
              <div v-if="parent.isDel === 0" style="font-weight: bolder;margin-right: 5px;">{{parent.likeUsername}}</div>
            </div>
          </div>
          <!--评论输入框-->
          <div class="card" v-if="openInput">
            <div class="card-cell border-b" style="display: flex">
              <input type="text" placeholder="欢迎评论" v-model="content" style="flex: 1;border: 0;">
              <div v-if="content.replace(/^\s+|\s+$/g,'')" class="button-inline_primary" @click="commentSubmission">提交</div>
              <div v-else-if="!content.replace(/^\s+|\s+$/g,'')" class="button-inline_primary" style="background: #dbdbdb">提交</div>
            </div>
          </div>
          <!--评论内容显示-->
          <div class="card">
            <div v-for="(index, object) in report.wechatReportCommentList" :key="object" @click="replyComment(index)">
              <div v-if="index.content.replace(/^\s+|\s+$/g,'') !== ''">
                <span v-if="index.replyChildName !== null"><span  style="font-weight: bolder">{{index.commonUserName}}</span>回复 <span  style="font-weight: bolder">{{index.replyChildName}}{{index.replyParentRelation}}:&nbsp;&nbsp;</span></span><span v-else style="font-weight: bolder">{{index.commonUserName}}:&nbsp;&nbsp;</span>{{index.content}}
              </div>
            </div>
          </div>
          <!--回复评论输入框-->
          <div class="card" v-if="openReplyInput">
            <div class="card-cell border-b" style="display: flex">
              <input type="text" placeholder="回复评论" v-model="replyCommentContent" style="flex: 1;border: 0;">
              <div v-if="replyCommentContent.replace(/^\s+|\s+$/g,'')" class="button-inline_primary" @click="commentReplySubmission">提交</div>
              <div v-else-if="!replyCommentContent.replace(/^\s+|\s+$/g,'')" class="button-inline_primary" style="background: #dbdbdb">提交</div>
            </div>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import { videoPlayer } from 'vue-video-player';
  import PlayVideo from '../layout/PlayVideo';
  import DayCheckReportCard from './showDetailCard/DayCheckReportCard';
  import DaySleepReportCard from './showDetailCard/DaySleepReportCard';
  import DayLunchReportCard from './showDetailCard/DayLunchReportCard';
  import DayTeachReportCard from './showDetailCard/DayTeachReportCard';
  import DaySummaryReportCard from './showDetailCard/DaySummaryReportCard';

  export default {
    data() {
      return {
        memo: [],
        openInput: false,
        openReplyInput: false,
        issActive: true,
        content: '',
        reportId: '',
        replyCommentId: '',
        replyCommentContent: '',
        createChildName: '',
        flag: true,
      };
    },
    components: {
      'video-player': videoPlayer,
      'day-check': DayCheckReportCard,
      'day-sleep': DaySleepReportCard,
      'day-lunch': DayLunchReportCard,
      'day-teach': DayTeachReportCard,
      'day-summary': DaySummaryReportCard,
      'play-video': PlayVideo,
    },
    props: ['report', 'childName', 'singleStudent'],
    computed: {
      ...mapState({
        parseTime: state => state.parseTime,
        selectedChildId: state => state.parent.selectedChildId,
      }),
      playerOptions() {
        const options = JSON.parse(JSON.stringify(this.$store.state.playerOptions));
        options.sources = [
          {
            type: '',
            src: this.report.video, // url地址
          },
        ];
        return options;
      },
    },
    methods: {
      ...mapActions({
        postReportComment: 'postReportComment',
        getReportDetail: 'getReportDetail',
        postReportLike: 'postReportLike',
        getParentChildList: 'parent/getParentChildList',
        getWxConfig: 'getWxConfig',
      }),
      openComment() {
        this.openInput = !this.openInput;
      },
      // 获取单个报告信息
      getSingleReport(index) {
        this.getReportDetail({
          reportId: index,
        }).then((res) => {
          this.report.wechatReportLikeList = res.obj.wechatReportLikeList;
          this.report.like = res.obj.like;
          this.$nextTick();
        });
      },
      // 点赞功能
      parentLike() {
        //  请求点赞
        if (this.flag) {
          this.flag = false;
          let childId = '';
          if (this.selectedChildId) {
            childId = this.selectedChildId;
          } else if (this.report.createChildId) {
            childId = this.report.createChildId; // 老师私信提醒时家长点击进入
          }
          this.postReportLike({
            reportId: this.report.id,
            childId: parseInt(childId, 10),
          }).then((res) => {
            // 获取单个报告信息
            this.getSingleReport(this.report.id);
            this.flag = true;
          });
        }
      },
      // // 提交评论
      commentSubmission() {
        // 请求评论
        let childId = '';
        console.log(this.report);
        if (this.selectedChildId) {
          childId = this.selectedChildId;
        } else if (this.report.createChildId) {
          childId = this.report.createChildId; // 老师私信提醒时家长点击进入
        }
        this.postReportComment({
          reportId: this.report.id, // 报告id
          createChildId: parseInt(childId, 10),  // 回复关联的宝宝id
          createChildName: this.childName ? this.childName : this.report.createChildName, // 回复关联的宝宝姓名
          content: this.content,  // 评论内容
        }).then(() => {
          this.getReportDetail({
            reportId: this.report.id,
          }).then((req) => {
            this.report.wechatReportCommentList = req.obj.wechatReportCommentList;
          });
          this.content = '';
          this.openInput = false;
        });
      },
      // 回复评论
      replyComment(index) {
        this.replyCommentId = index.id;
        this.createChildName = index.createChildName;
        this.openReplyInput = !this.openReplyInput;
      },
      commentReplySubmission() {
        // 请求评论
        let childId = '';
        console.log(this.report);
        if (this.selectedChildId) {
          childId = this.selectedChildId;
        } else if (this.report.createChildId) {
          childId = this.report.createChildId; // 老师私信提醒时家长点击进入
        }
        this.postReportComment({
          reportId: this.report.id, // 报告id
          createChildId: parseInt(childId, 10),  // 回复关联的宝宝id
          createChildName: this.childName ? this.childName : this.report.createChildName, // 回复关联的宝宝姓名
          content: this.replyCommentContent,  // 评论内容
          replyCommentId: this.replyCommentId, // 评论id
        }).then(() => {
          this.getReportDetail({
            reportId: this.report.id,
          }).then((req) => {
            this.report.wechatReportCommentList = req.obj.wechatReportCommentList;
          });
          this.replyCommentContent = '';
          this.openReplyInput = false;
        });
      },
      // 微信预览图片接口
      preview(item) {
        const data = [];
        JSON.parse(this.report.photos).forEach((index) => {
          data.push(`https://${index.slice(index.match('dsmm').index)}`.replace(/(^\s*)|(\s*$)/g, ''));
        });
        this.getWxConfig({
          url: window.location.href,
        }).then((res) => {
          wx.config(res.obj);
          wx.ready(() => {
            wx.previewImage({
              current: `https://${item.slice(item.match('dsmm').index)}`.replace(/(^\s*)|(\s*$)/g, ''), // 当前显示的图片的HTTP链接
              urls: data, // 需要预览的图片http链接列表
              success(resolve) {
                console.log('成功');
                console.log(resolve);
              },
              cancel(err) {
                console.log(`错误:${err}`);
              },
            });
          });
          wx.error((err) => {
            console.log(`错误原因：->${err}->没有走ready`);
          });
        });
      },
    },
    created() {
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
