<template>
  <div>
    <div class="card" v-if="classReadingChildList.length !== 0">
      <div class="card-cell color-info">
        <div v-if="type === '1'">
          入园晨检信息列表
        </div>
        <div v-else-if="type === '2'">
          午睡信息列表
        </div>
        <div v-else-if="type === '3'">
          午餐信息列表
        </div>
        <div v-else-if="type === '4'">
          课程信息列表
        </div>
        <div v-else-if="type === '5'">
          日总结信息列表
        </div>
        <div v-else-if="type === '6'">
          添加自定义信息
        </div>
      </div>
      <div class="card-cell" v-for="(item,index) in classReadingChildList" :key="index">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="12">
            <!--<child-info :name="item.child.name" :photo="item.child.photo" :gender="item.child.gender" :birthday="item.child.birthday"></child-info>-->
            <DwChildInfo :name="item.child.name" :gender="item.child.gender" :birthday="item.child.birthday" memo="5:30PM前记录">
              <div slot="avatar" style="width: 34px;height: 34px;">
                <img :src="item.child.photo" alt="" v-if="item.child.photo" style="width: 100%;height: 100%">
                <img src="../../../assets/img/img/avatar/defaultAvatar.png" alt="" v-if="!item.child.photo" style="width: 100%;height: 100%">
              </div>
            </DwChildInfo>
          </el-col>
          <el-col style="text-align: right" :span="12">
            <div class="button-list"  @click="amend(item, type)" v-if="type === '1' || (type === '5' && checkedStudentIds.indexOf(item.child.id) < 0)">
              <span v-if="type === '1'">
                请假
              </span>
              <span v-else-if="type === '5'">
                早/晚接
              </span>
            </div>
            <div class="button-list-background" v-if="checkedStudentIds.indexOf(item.child.id) < 0 || type === '6'" @click="sendDetail(item)">
              <i class="iconfont icon-add" style="line-height: normal;font-size: 12px;"></i>
              <span v-if="type === '1'">
                晨检
              </span>
              <span v-else-if="type === '2'">
                午睡
              </span>
              <span v-else-if="type === '3'">
                午餐
              </span>
              <span v-else-if="type === '4'">
                课程
              </span>
              <span v-else-if="type === '5'">
                日总结
              </span>
              <span v-else-if="type === '6'">
                自定义信息
              </span>
            </div>
            <div v-else-if="checkedStudentIds.indexOf(item.child.id) >= 0 && type !== '6' && type !== '2'" class="button-inline-list-background">
              已添加
            </div>
            <div style="flex: 1" v-else-if="checkedStudentIds.indexOf(item.child.id) >= 0 && type !== '6' && type === '2'" class="button-list">
              修改午睡
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <blank v-if="classReadingChildList.length === 0" text="目前本班级没有在读学员哦~">
    </blank>
    <dw-dialog v-model="openSummaryPopup" v-on:confirm="confirm" widthPercent="70%">
      <div slot="popup-content">
        <div style="margin-bottom: 10px">早接/晚接接送记录</div>
        <textarea rows="5" placeholder="请填写接送备注" v-model="modifySummary.memo"></textarea>
      </div>
    </dw-dialog>
    <dw-dialog v-model="openCheckPopup" v-on:confirm="confirmCheck" widthPercent="70%">
      <div slot="popup-content">
        <dw-radio v-model="modifyCheck.selected" :options="modifyCheck.selectArray" style="margin-bottom: 10px"></dw-radio>
        <textarea rows="5" placeholder="请填写请假原因" v-model="modifyCheck.memo"></textarea>
      </div>
    </dw-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import ChildInfo from '../../../components/layout/ChildInfo';
  import Blank from '../../../components/layout/Blank';
  import DwChildInfo from '../../../components/planning/ChildInfoGrid';
  import DwDialog from '../../../components/planning/base/layout/Dialog';
  import DwRadio from '../../../components/planning/base/input/Radio';
  import moment from 'moment';

  export default {
    name: 'DayCheckList',
    data() {
      return {
        type: '',
        checkedStudentIds: [],
        openSummaryPopup: false,
        openCheckPopup: false,
        modifySummary: {
          childId: '',
          memo: '',
        },
        modifyCheck: {
          childId: '',
          memo: '',
          value: '',
          selected: '',
          selectArray: ['今日请假', '晚到'],
        },
      };
    },
    components: {
      ChildInfo,
      Blank,
      DwChildInfo,
      DwDialog,
      DwRadio,
    },
    computed: {
      ...mapState({
        teacherSelectedClassId: state => state.teacher.teacherSelectedClassId,
        classReadingChildList: state => state.teacher.classReadingChildList,
      }),
    },
    methods: {
      ...mapActions({
        getTodayReportedChildList: 'teacher/getTodayReportedChildList',
        getTeacherSelectedChildInfo: 'teacher/getTeacherSelectedChildInfo',
        getClassReadingChildList: 'teacher/getClassReadingChildList',
      }),
      amend(item, index) {
        console.log(item);
        if (index === '5') {
          this.openSummaryPopup = true;
          this.modifySummary.childId = item.child.id;
        } else if (index === '1') {
          this.openCheckPopup = true;
          this.modifyCheck.childId = item.child.id;
        }
      },
      confirm() {
        console.log(this.modifySummary.childId);
        console.log(this.modifySummary.memo);
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
        console.log('日总结时临时早晚接提交事件');
      },
      confirmCheck() {
        console.log(this.modifyCheck.childId);
        console.log(this.modifyCheck.selected);
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
        console.log('晨检请假提交事件');
      },
      sendDetail(item) {
        // 请求孩子详情并存入store，供后面页面直接使用
        this.getTeacherSelectedChildInfo({
          childId: item.child.id,
        });
        if (this.type === '1') {
          this.$router.push({
            path: '/teacher/dayCheck/sendDetail',
          });
        } else if (this.type === '2') {
          this.$router.push({
            path: '/teacher/daySleep/sendDetail',
          });
        } else if (this.type === '3') {
          this.$router.push({
            path: '/teacher/dayLunch/sendDetail',
          });
        } else if (this.type === '4') {
          this.$router.push({
            path: '/teacher/dayCheck/sendDetail',
          });
        } else if (this.type === '5') {
          this.$router.push({
            path: '/teacher/daySummary/sendDetail',
          });
        } else if (this.type === '6') {
          this.$router.push({
            path: '/teacher/customize/sendDetail?type=6',
          });
        }
      },
      // 获取已发送报告的学生信息(进入列表页)
      getStudentCheckList() {
        const payload = {
          classId: this.teacherSelectedClassId,
          type: this.type,
        };
        this.getTodayReportedChildList(payload).then((res) => {
          const list = [];
          res.obj.childList.forEach((item) => {
            const obj = {};
            obj.id = item.id;
            obj.name = item.name;
            list.push(obj);
          });
          list.forEach((item) => {
            this.checkedStudentIds.push(item.id);
          });
        });
      },
      // 微信链接js-sdk中的分享页面
      wxPreview() {
      },
      init() {
        this.wxPreview();
        this.type = this.$route.query.type;
        this.getStudentCheckList();
        this.getClassReadingChildList({
          classId: this.teacherSelectedClassId,
          type: this.type,
        }).then((res) => {
          console.log(res);
        });
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style scoped lang="less">
  @import '../../../assets/css/global';
  .button-list{
    display: inline-block;
    border-radius: 0.25rem;
    text-align: center;
    line-height: normal;
    padding: .5rem .8rem;
    font-weight: lighter;
    border: 1px solid @color-primary;
    color: @color-primary;
    font-size: 12px;
  }
  .button-list-background{
    display: inline-block;
    border-radius: 0.25rem;
    text-align: center;
    line-height: normal;
    padding: .5rem .8rem;
    font-weight: lighter;
    background: @color-primary;
    border: 1px solid @color-primary;
    color: @color-white;
    font-size: 12px;
  }
  .button-inline-list{
    display: inline-block;
    border-radius: 0.25rem;
    text-align: center;
    padding: .5rem .8rem;
    line-height: normal;
    font-weight: lighter;
    border: 1px solid @color-text-grey;
    color: @color-text-grey;
    font-size: 12px;
  }
  .button-inline-list-background{
    display: inline-block;
    border-radius: 0.25rem;
    line-height: normal;
    text-align: center;
    padding: .5rem .8rem;
    font-weight: lighter;
    background: #E8E8E8;
    border: 1px solid #E8E8E8;
    color: @color-text-grey;
    font-size: 12px;
  }
  textarea{
    outline: none;
    resize:none;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border-color: #cccccc;
    box-sizing: border-box;
  }
</style>

