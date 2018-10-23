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
            <child-info :name="item.child.name" :photo="item.child.photo"></child-info>
          </el-col>
          <el-col style="text-align: right" :span="12">
            <div class="button-list" v-if="checkedStudentIds.indexOf(item.child.id) < 0 || type === '6'" @click="sendDetail(item)">
              <span v-if="type === '1'">
                添加晨检
              </span>
              <span v-else-if="type === '2'">
                添加午睡
              </span>
              <span v-else-if="type === '3'">
                添加午餐
              </span>
              <span v-else-if="type === '4'">
                添加课程
              </span>
              <span v-else-if="type === '5'">
                添加日总结
              </span>
              <span v-else-if="type === '6'">
                添加自定义信息
              </span>
            </div>
            <div v-else-if="checkedStudentIds.indexOf(item.child.id) >= 0 && type !== '6'" class="button-inline-list">今日已添加</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <blank v-if="classReadingChildList.length === 0" text="目前本班级没有在读学员哦~">
    </blank>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import ChildInfo from '../../components/layout/ChildInfo';
  import Blank from '../../components/layout/Blank';

  export default {
    name: 'DayCheckList',
    data() {
      return {
        type: '',
        checkedStudentIds: [],
      };
    },
    components: {
      ChildInfo,
      Blank,
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
      }),
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
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style scoped lang="less">
  @import '../../assets/css/global';
  .button-list{
    display: inline-block;
    border-radius: 0.25rem;
    text-align: center;
    padding: .3rem 1rem;
    font-weight: lighter;
    border: 1px solid @color-primary;
    color: @color-primary;
  }
  .button-inline-list{
    display: inline-block;
    border-radius: 0.25rem;
    text-align: center;
    padding: .3rem 1rem;
    font-weight: lighter;
    border: 1px solid @color-text-grey;
    color: @color-text-grey;
  }
</style>

