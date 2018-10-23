<template>
  <div>
    <div class="card" style="background-color: transparent">
      <div class="card-cell" style="border: 0;padding-top: 6rem">
        <div style="width: 7.5rem;height: 7.5rem;margin: 0 auto;" @click="toPage('/teacher/customize/sendDetail?type=7')">
          <img src="../../assets/img/icon/teacherList/openPersonal.png" alt="" style="width: 100%">
        </div>
        <div style="text-align: center;color: #4d4d4d;">公开发送</div>
      </div>
      <div class="card-cell" style="border: 0">
        <div style="width: 7.5rem;height: 7.5rem;margin: 0 auto;" @click="toPage('/teacher/sendList?type=6')">
          <img src="../../assets/img/icon/teacherList/alonePersonal.png" alt="" style="width: 100%">
        </div>
        <div style="text-align: center;color: #4d4d4d;">单独发送</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPage(index) {
      this.$router.push(index);
    },
  },
};
</script>
<style lang="less" scoped>

</style>
