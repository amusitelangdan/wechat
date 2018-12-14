<template>
  <div style="display: inline-block;">
    <el-row type="flex" :gutter="14" align="middle">
      <el-col :span="8" v-if="!type">
        <div style="border-radius: 50%;  overflow: hidden; width: 56px; height: 56px; position: relative">
          <img v-if="photo" :src="photo" style="width: 100%; vertical-align: middle; top: 50%; position: absolute; transform: translateY(-50%)">
          <img v-else src="../../assets/img/img/avatar/teacher_default_avator.png" style="width: 100%; vertical-align: middle; top: 50%; position: absolute; transform: translateY(-50%)">
        </div>
      </el-col>
      <el-col :span="16" v-if="!type">
        <div style="margin-top: .5rem">
          <span style="font-size: 16px">{{name}}</span>
          <el-tag type="info" size="mini" style="margin-left: 0.5rem; vertical-align: top" v-if="staffType">{{staffType}}</el-tag>
        </div>
        <div style="margin-top: 0.5rem">
          {{phone}}
        </div>
      </el-col>
      <el-col :span="10" v-if="type">
        <div style="overflow: hidden; width: 56px; height: 56px; position: relative;">
          <img v-if="type === '客服'" src="../../assets/img/img/page/客服.png" style="vertical-align: middle; top: 50%; left: 50%; position: absolute; transform: translateY(-50%) translateX(-50%); height: 36px">
          <img v-if="type === '监督'" src="../../assets/img/img/page/监督.png" style="vertical-align: middle; top: 50%; left: 50%; position: absolute; transform: translateY(-50%) translateX(-50%); height: 36px">
        </div>
      </el-col>
      <el-col :span="14" v-if="type">
        <div style="margin-top: .5rem">
          <span style="font-size: 16px;">{{name}}</span>
        </div>
        <div style="margin-top: 0.5rem">
          {{phone}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    props: ['name', 'photo', 'staffType', 'phone', 'type'],
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
      }),
    },
  };
</script>
<style lang="less" scoped>
</style>
