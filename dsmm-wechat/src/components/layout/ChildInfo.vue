<template>
  <div>
    <div style="display: inline-block; width: 160px">
      <el-row type="flex" :gutter="14" align="middle">
        <el-col :span="9">
          <div style="border-radius: 50%; overflow: hidden; width: 48px; height: 48px; position: relative;margin-top: .3rem">
            <img v-if="photo" :src="photo" style="width: 100%; vertical-align: middle; top: 50%; position: absolute; transform: translateY(-50%)">
            <img v-else-if="!photo" src="../../assets/img/icon/defaultAvatar/defaultAvatar.png" style="width: 100%; vertical-align: middle; top: 50%; position: absolute; transform: translateY(-50%)">
          </div>
        </el-col>
        <el-col :span="15">
          <div style="white-space: nowrap">{{name}}</div>
          <div style="margin-top: 0.5rem; white-space: nowrap" v-if="gender || birthday">
            <img class="headInfoImg" src="../../assets/img/icon/personal/female_new.png" v-if="gender === 2">
            <img class="headInfoImg" src="../../assets/img/icon/personal/male_new.png" v-if="gender === 1">
            <span v-if="birthday" style="font-size: 12px">
            {{parseBirthday(birthday)}}
          </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    props: ['name', 'photo', 'nickname', 'gender', 'birthday', 'isSelected'],
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        parseBirthday: state => state.parseBirthday,
      }),
    },
    created() {
    },
  };
</script>
<style lang="less" scoped>
  .headInfoImg {
    width: 14px;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
</style>
