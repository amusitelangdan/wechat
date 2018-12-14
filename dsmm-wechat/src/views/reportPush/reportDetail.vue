<template>
  <div>
    <ShowReportDetail :report="reportInfo" :childName="selectedChildName"></ShowReportDetail>
  </div>
</template>

<script>
  import ShowReportDetail from '../../components/report/ShowReportDetail';
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        reportInfo: {},
        childName: '',
      };
    },
    computed: {
      ...mapState({
        selectedChildName: state => state.parent.selectedChildName,
      }),
    },
    components: {
      ShowReportDetail,
    },
    methods: {
      ...mapActions({
        getReportDetail: 'getReportDetail',
      }),
    },
    created() {
      this.getReportDetail({
        reportId: this.$route.query.reportId,
      }).then((res) => {
        this.reportInfo = res.obj;
        this.reportInfo.createChildId = this.$route.query.childId;
        this.reportInfo.createChildName = this.$route.query.childName;
      });
    },
  };
</script>

<style scoped>

</style>
