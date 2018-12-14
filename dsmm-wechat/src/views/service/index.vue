<template>
  <div style="padding: 1rem 1rem">
    <el-row :gutter="14">
      <el-col :span="12">
        <div @click="toPath('/service/notice')" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <i class="iconfont icon-notice icon-icon icon-icon"></i>
          <div style="margin-top: 1rem;">入园须知</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div @click="toPath('/service/phoneBook')" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <i class="iconfont icon-headquarters-phone icon-icon"></i>
          <div style="margin-top: 1rem;">服务电话</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="14" style="margin-top: 1rem; margin-bottom: 1rem">
      <el-col :span="12">
        <div @click="toPath(`/service/feedback?childId=${selectedChildId}&className=${encodeURIComponent(selectedClassName)}`)" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <i class="iconfont icon-option-feedback icon-icon"></i>
          <div style="margin-top: 1rem;">意见反馈</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div @click="toPath(`/service/complaint?childId=${selectedChildId}&className=${encodeURIComponent(selectedClassName)}`)" style="background: #ffffff;text-align: center;padding-top: 2rem; padding-bottom: 2rem">
          <i class="iconfont icon-complaint icon-icon"></i>
          <div style="margin-top: 1rem">投诉举报</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div @click="toPath(`/service/personal?childId=${selectedChildId}`)"  style="padding-top: 2rem; padding-bottom: 2rem;background: #ffffff;text-align: center;">
          <i class="iconfont icon-parent-personal icon-icon"></i>
          <div style="margin-top: 1rem">个人中心</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        selectedChildId: state => state.parent.selectedChildId,
        selectedClassName: state => state.parent.selectedClassName,
      }),
    },
    methods: {
      ...mapActions({
      }),
      toPath(value) {
        this.$router.push(value);
      },
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
  @import "../../components/planning/vars";
  i.icon-icon{
    font-size: @font_size_general;
    line-height: normal;
  }
  i.icon-notice{
    color: @color_green;
  }
  i.icon-headquarters-phone{
    color: @color_primary;
  }
  i.icon-option-feedback{
    color: @color_blue;
  }
  i.icon-complaint{
    color: @color_pink;
  }
  i.icon-parent-personal{
    color: @color_blue;
  }
</style>
