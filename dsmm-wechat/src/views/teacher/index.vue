<template>
  <div>
    <!--班级及老师信息-->
    <div class="card" style="padding-top: 2rem; padding-bottom: 2rem">
      <el-row type="flex" align="middle">
        <el-col :span="16" class="border-r">
          <div style="margin-bottom: 1rem;"><img src="../../assets/img/icon/teacherIndex/store.png" style="width: 20px; margin-right: 0.5rem; vertical-align: middle">{{storeName}}</div>
          <el-col :span="16">
            <div><img src="../../assets/img/icon/teacherIndex/class.png" style="width: 20px; margin-right: 0.5rem; vertical-align: middle">{{className}}</div>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <span style="font-size: 12px; margin-right: 1rem" @click="classSelect">[切换班级]</span>
          </el-col>
        </el-col>
        <el-col :span="8">
          <div v-if="tokenTeacherInfo.photo"  style="width: 50px;height: 50px; display: block; border-radius: 50%; margin: auto; overflow: hidden; position: relative;background-repeat: no-repeat;background-size: cover" :style="{backgroundImage: `url(${tokenTeacherInfo.photo})`}">
          </div>
          <div v-else style="width: 50px;height: 50px; display: block; border-radius: 50%; margin: auto; overflow: hidden; position: relative;background-repeat: no-repeat;background-size: cover;" :style="{backgroundImage: `url(${require('../../assets/img/icon/defaultAvatar/teacher_default_avator.png')})`}">
          </div>
          <div style="text-align: center;margin-top:.8rem">{{tokenTeacherInfo.name}}</div>
        </el-col>
      </el-row>
    </div>
    <!--工作台-->
    <div class="card" style="padding: 0">
      <div class="card-cell">
        <div style="padding:0 1rem;height: 100%;line-height: 100%;">
          工作台
        </div>
      </div>
      <!--@click.native='toPage(`/teacher/sendList?type=1`)'-->
      <el-row type="flex" justify="center" align="middle" style="text-align: center" class="border-b">
        <el-col :span="8" class="border-r background-touch" style="padding: 1.5rem;background: #fff" @touchstart.native="startPress(0)" @touchend.native="endPress(0, `/teacher/sendList?type=1`)">
          <img src="../../assets/img/icon/teacherIndex/check.png" style="height: 24px">
          <div>入园晨检</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.morningCheck.checkedCount === todayReportCount.morningCheck.studentCount"></i>
              <i  style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.morningCheck.checkedCount}}/{{todayReportCount.morningCheck.studentCount}}
            </span>
          </div>
        </el-col>
        <!--@click.native='toPage(`/teacher/sendList?type=3`)'-->
        <el-col v-if="todayLunch !== null" :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(1)" @touchend.native="endPress(1, `/teacher/sendList?type=3`)">
          <img src="../../assets/img/icon/teacherIndex/lunch.png" style="height: 24px">
          <div>午餐通知</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.lunch.checkedCount === todayReportCount.lunch.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.lunch.checkedCount}}/{{todayReportCount.lunch.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col v-else :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(2)" @touchend.native="endPress(2, '无')">
          <img src="../../assets/img/icon/teacherIndex/lunch.png" style="height: 24px">
          <div>午餐通知</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.lunch.checkedCount === todayReportCount.lunch.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.lunch.checkedCount}}/{{todayReportCount.lunch.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col class="background-touch" :span="8" style="padding: 1.5rem" @touchstart.native="startPress(2)" @touchend.native="endPress(2, `/teacher/sendList?type=2`)">
          <img src="../../assets/img/icon/teacherIndex/sleep.png" style="height: 24px">
          <div>午睡消息</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.nap.checkedCount === todayReportCount.nap.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.nap.checkedCount}}/{{todayReportCount.nap.studentCount}}
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" style="text-align: center" class="border-b">
        <el-col v-if="todayReportCount.dailyLesson.checkedCount !== todayReportCount.dailyLesson.studentCount && todayLesson !== null" :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(3)" @touchend.native="endPress(3, `/teacher/dayTeach/sendDetail?type=4`)">
          <img src="../../assets/img/icon/teacherIndex/teach.png" style="height: 24px">
          <div>每日课程</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.dailyLesson.checkedCount === todayReportCount.dailyLesson.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.dailyLesson.checkedCount}}/{{todayReportCount.dailyLesson.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col v-if="todayReportCount.dailyLesson.checkedCount === todayReportCount.dailyLesson.studentCount && todayLesson !== null" :span="8" class="border-r background-touch" style="padding: 1.5rem"  @touchstart.native="startPress(3)" @touchend.native="endPress(3, `/teacher/dayTeach/sendDetail?type=4`)">
          <img src="../../assets/img/icon/teacherIndex/teach.png" style="height: 24px">
          <div>每日课程</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.dailyLesson.checkedCount === todayReportCount.dailyLesson.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.dailyLesson.checkedCount}}/{{todayReportCount.dailyLesson.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col v-if="todayLesson === null" :span="8" class="border-r background-touch" style="padding: 1.5rem;" @touchstart.native="startPress(3)" @touchend.native="endPress(3, '无')">
          <img src="../../assets/img/icon/teacherIndex/teach.png" style="height: 24px">
          <div>每日课程</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.dailyLesson.checkedCount === todayReportCount.dailyLesson.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.dailyLesson.checkedCount}}/{{todayReportCount.dailyLesson.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(4)" @touchend.native="endPress(4, `/teacher/sendList?type=5`)">
          <img src="../../assets/img/icon/teacherIndex/summary.png" style="height: 24px">
          <div>日总结</div>
          <div>
            <span style="font-size: 16px">
              <i class="el-icon-circle-check color-success" v-if="todayReportCount.leave.checkedCount === todayReportCount.leave.studentCount"></i>
              <i style="font-size: 14px" class="el-icon-warning color-danger" v-else></i>
            </span>
            <span>
              {{todayReportCount.leave.checkedCount}}/{{todayReportCount.leave.studentCount}}
            </span>
          </div>
        </el-col>
        <el-col class="background-touch" :span="8" style="padding: 1.5rem" @touchstart.native="startPress(5)" @touchend.native="endPress(5, `/teacher/customize/select?classId=${teacherSelectedClassId}`)">
          <div style="height: .8rem;"></div>
          <img src="../../assets/img/icon/teacherIndex/custom_info.png" style="height: 24px">
          <div>自定义信息</div>
          <div style="height: .8rem;"></div>
        </el-col>
      </el-row>
      <el-row justify="center" align="middle" style="text-align: center">
        <el-col :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(6)" @touchend.native="endPress(6, `/teacher/student/list`)">
          <div style="height: .8rem;"></div>
          <img src="../../assets/img/icon/teacherIndex/student.png" style="height: 24px">
          <div>学员名单</div>
          <div style="height: .8rem;"></div>
        </el-col>
        <el-col :span="8" class="border-r background-touch" style="padding: 1.5rem" @touchstart.native="startPress(7)" @touchend.native="endPress(7, `/teacher/history/report/list`)">
          <div style="height: .8rem;"></div>
          <img src="../../assets/img/icon/teacherIndex/history.png" style="height: 24px">
          <div>历史消息</div>
          <div style="height: .8rem;"></div>
        </el-col>
      </el-row>
    </div>
    <mt-popup
      :closeOnClickModal=false
      v-model="classSelectPopupVisible"
      position="bottom" style="width: 100%;">
      <Confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect"></Confirmation>
      <mt-picker value-key="name" ref="pickered" :slots="slots" ></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex';
  import Confirmation from '../../components/button/PopUpConfirmation';
  import moment from 'moment';

  export default {
    data() {
      return {
        todayReportCount: {
          dailyLesson: {
            checkedCount: '',
            studentCount: '',
          }, // 每日课程
          leave: {
            checkedCount: '',
            studentCount: '',
          }, // 离园+日总结
          lunch: {
            checkedCount: '',
            studentCount: '',
          }, // 午餐情况
          morningCheck: {
            checkedCount: '',
            studentCount: '',
          }, // 每日晨检
          nap: {
            checkedCount: '',
            studentCount: '',
          }, // 午睡情况
        },
        classSelectPopupVisible: false,
        storeName: '',
        className: '',
        todayLesson: '',
        todayLunch: '',
      };
    },
    computed: {
      ...mapState({
        tokenTeacherInfo: state => state.teacher.tokenTeacherInfo,
        tokenClassInfoList: state => state.teacher.tokenClassInfoList,
        teacherSelectedClassId: state => state.teacher.teacherSelectedClassId,
      }),
      slots() {
        const arr = [];
        this.tokenClassInfoList.forEach((item) => {
          const obj = {};
          obj.name = `${item.store.name}-${item.name}`;
          obj.id = `${item.store.id}-${item.id}`;
          arr.push(obj);
        });
        return [{
          flex: 1,
          values: arr,
          className: 'slot1',
          textAlign: 'center',
        }];
      },
    },
    watch: {
      teacherSelectedClassId() {
        this.getSelectClassInfo();
      },
    },
    methods: {
      ...mapActions({
        getTokenTeacherInfo: 'teacher/getTokenTeacherInfo',
        getTokenClassInfoList: 'teacher/getTokenClassInfoList',
        getClassReadingChildList: 'teacher/getClassReadingChildList',
        getTodayReportCount: 'teacher/getTodayReportCount',
        getTodaySchedule: 'teacher/getTodaySchedule',
        refreshToken: 'refreshToken',
        getWeekLesson: 'getWeekLesson',
      }),
      startPress(index) {
        document.getElementsByClassName('background-touch')[index].style.background = '#e4e4e4';
      },
      endPress(index, link) {
        document.getElementsByClassName('background-touch')[index].style.background = '';
        if (link === '无') {
          this.$toast('今日暂时没有安排');
        } else if (link !== '无') {
          if (this.todayReportCount.dailyLesson.checkedCount === this.todayReportCount.dailyLesson.studentCount && link === '/teacher/dayTeach/sendDetail?type=4') {
            this.$toast('今日已经发送过课程');
          } else {
            this.$router.push(link);
          }
        }
      },
      classSelect() {
        this.classSelectPopupVisible = true;
      },
      // 点击确认触发
      confirmSelect() {
        const names = this.$refs.pickered.getSlotValue(0).name;
        this.storeName = names.match(/(\S*)-/)[1];
        this.className = names.match(/-(\S*)/)[1];
        const ids = this.$refs.pickered.getSlotValue(0).id;
        this.$store.commit('teacher/switchTeacherSelectedClassId', parseInt(ids.match(/-(\S*)/)[1], 10));
        this.classSelectPopupVisible = false;
      },
      // 点击取消触发
      cancelSelect() {
        this.classSelectPopupVisible = false;
      },
      getSelectClassInfo() {
        // 获取已发送报告人数
        this.getTodayReportCount().then((res) => {
          this.todayReportCount = res.obj;
        });
        // 获取学员名单
        this.getClassReadingChildList();
        // 获取今日午餐和每日课程
        this.getTodaySchedule().then((res) => {
          this.todayLesson = res.obj.todayLesson;
          this.todayLunch = res.obj.todayLunch;
        });
      },
      init() {
        // console.log(this.tokenTeacherInfo);
        this.getTokenTeacherInfo().then((resTeacher) => {
          if (resTeacher.obj) {
            // 确定是职员才请求班级列表
            this.getTokenClassInfoList().then((res) => {
              if (res.obj.length !== 0) {
                // 显示当前选中的班级
                this.tokenClassInfoList.forEach((item) => {
                  if (this.teacherSelectedClassId === item.id) {
                    this.storeName = item.store.name;
                    this.className = item.name;
                  }
                });
                this.getWeekLesson({ date: moment().format('YYYY-MM-DD') });
                this.getSelectClassInfo();
              } else {
                this.$router.replace('/teacher/noClass');
              }
            });
          } else {
            this.$router.replace('/teacher/noStaff');
          }
        });
      },
    },
    components: {
      Confirmation,
    },
    created() {
      this.init();
    },
  };
</script>
<style lang="less">
</style>
