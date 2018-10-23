<template>
  <div>
    <div style="overflow:hidden;position: relative;">
      <div class="bg background-blur"></div>
      <div style="width: 100%;height: 14.3rem;background:rgba(150,150,150,0.1);position: absolute;top: 0;left: 0;"></div>
      <div style="width: 100%;height: 14rem;position: absolute;top: 0;left: 0;">
        <div v-for="(child, index) in childList" :key="index">
          <div v-if="child.id === selectChildId">
            <div style="width: 80px;height: 80px;border-radius: 80px;background: rgba(255,255,255,0.6);margin: 4rem auto 0;position: relative;overflow:hidden;">
              <img v-if="child.photo" :src="child.photo" style="width: 65px; vertical-align: middle;left: 50%; top: 50%; position: absolute; transform: translate(-50%,-50%);overflow:hidden;">
              <img v-if="!child.photo" :src="require('../../assets/img/icon/defaultAvatar/defaultAvatar.png')" style="width: 65px; vertical-align: middle;left: 50%; top: 50%; position: absolute; transform: translate(-50%,-50%)">
            </div>
            <div style="text-align:center;margin: .6rem auto 0;color: #ffffff;">
              <div style="padding: .1rem 0;">宝宝: {{child.name}}</div>
              <div style="padding: .1rem 0;"><span>{{parseBirthday(child.birthday)}}</span></div>
            </div>
          </div>
        </div>
        <div style="color: #fff;padding: .5rem;border: 1px #ffffff solid;border-radius: 1.5rem;position: absolute;top: 1.5rem;right: 1rem;" @click="toPath('/service/select/child', { childId: selectChildId })">切换宝宝</div>
      </div>
    </div>

    <div class="card" style="position: relative">
      <div class="card-cell" style="padding: 2rem 0">
        <el-row type="flex">
          <el-col style="text-align: center" @click.native="remind">
            <img src="../../assets/img/icon/personal/health.png" style="height: 48px">
            <div>健康记录</div>
          </el-col>
          <el-col style="text-align: center" @click.native="remind">
            <img src="../../assets/img/icon/personal/nutrition.png" style="height: 48px">
            <div>营养记录</div>
          </el-col>
          <el-col style="text-align: center" @click.native="remind">
            <img src="../../assets/img/icon/personal/learn.png" style="height: 48px">
            <div>学习记录</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card" style="margin: .5rem 0;">
      <div class="card-cell_link" @click="toPath('/service/phoneBook', { childId: selectChildId })">
        学校通讯录
      </div>
    </div>
    <div class="card" style="margin: .5rem 0;">
      <div class="card-cell_link" @click="toPath('/parent/list', { childId: selectChildId })" style="overflow:hidden;">
        <el-col :span="12">宝宝家人</el-col>
        <el-col :span="12" style="text-align: center;color: #898989;font-size: 12px">点击邀请家人朋友</el-col>
      </div>
      <div class="card-cell_link" @click="toPath('/service/notice', { childId: selectChildId })">
        入园须知
      </div>
    </div>
    <div class="card" style="margin: .5rem 0;">
      <div class="card-cell_link" @click="toPath('/service/feedback', { childId: selectChildId })">
        建议反馈
      </div>
      <div class="card-cell_link" @click="toPath('/service/complaint', { childId: selectChildId })">
        投诉举报
      </div>
    </div>
    <div class="card" style="margin: 0;">
      <div class="card-cell_link" @click="logout">
        退出登录
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import Confirmation from '../../components/button/PopUpConfirmation';
  import HeadInfo from '../../components/layout/ChildInfo';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        selectChildId: '',
      };
    },
    components: {
      Confirmation,
      HeadInfo,
    },
    computed: {
      ...mapState({
        childList: state => state.parent.childList,
        parseBirthday: state => state.parseBirthday,
        selectedChildId: state => state.parent.selectedChildId,
      }),
    },
    watch: {
      $route(to, from) {
      },
    },
    methods: {
      ...mapActions({
        getParentChildList: 'parent/getParentChildList',
      }),
      toPath(path, query) {
        this.$router.push({
          path,
          query,
        });
      },
      remind() {
        Toast('即将推出，敬请期待~');
      },
      logout() {
        this.$store.commit('logout');
      },
      init() {
        this.getParentChildList().then(() => {
          this.selectChildId = this.$route.query.childId ?
            parseInt(this.$route.query.childId, 10) : this.selectedChildId;
        });
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style>
  .hideScrollBar::-webkit-scrollbar {
    display: none;
  }
  .headInfoImg {
    width: 14px;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
  .bg{
    width: 100%;
    height: 14rem;
    background-image: url(../../assets/img/icon/personal/background-Image.png);
    margin-bottom: .8rem;
  }
  .background-blur{
    float: left;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
  }
</style>
