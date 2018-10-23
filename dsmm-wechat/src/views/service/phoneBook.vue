<template>
  <div>
    <div class="card">
      <div class="card-cell" v-for="teacher in teacherInfoList">
        <teacher-info style="width: 240px" :name="teacher.name" :phone="teacher.phone" :staffType="teacher.staffType.name" :photo="teacher.photo"></teacher-info>
      </div>
      <div class="card-cell">
        <teacher-info style="width: 180px" name="总部监督电话" :phone="18616665554" type="监督"></teacher-info>
      </div>
      <div class="card-cell">
        <teacher-info style="width: 180px" name="总部客服中心" :phone="4000886565" type="客服"></teacher-info>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import TeacherInfo from '../../components/layout/TeacherInfo';

  export default {
    data() {
      return {
        teacherInfoList: [],
      };
    },
    computed: {
      ...mapState({
        childList: state => state.parent.childList,
      }),
    },
    components: {
      TeacherInfo,
    },
    methods: {
      ...mapActions({
        getTeacherInfoList: 'parent/getTeacherInfoList',
      }),
      init() {
        if (this.$route.query.childId) {
          this.childList.forEach((child) => {
            if (child.id === parseInt(this.$route.query.childId, 10)) {
              child.classList.forEach((classItem) => {
                this.getTeacherInfoList({
                  classId: classItem.id,
                }).then((res) => {
                  res.obj.forEach((item) => {
                    this.teacherInfoList.push(item);
                  });
                });
              });
            }
          });
        }
      },
    },
    created() {
      this.init();
    },
  };
</script>

<style lang="less" scoped>
</style>
