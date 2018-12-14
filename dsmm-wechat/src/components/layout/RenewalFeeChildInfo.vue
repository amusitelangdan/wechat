<template>
  <div>
    <div :class="{layoutChange: isJump}" class="card" @touchstart="openRenewal" @touchend="closeRenewal(childInfo)" @touchmove="moveRenewal">
      <dw-avatar-reveal v-bind:avatar-url="childInfo.photo" style="width: 34px;height: 34px;margin: 0 auto;"></dw-avatar-reveal>
      <div class="info">
        <div class="info-first">
          <div>{{childInfo.name}}</div>
          <div v-if="childInfo.isOwn" class="mark"></div>
          <span class="expire" v-if="childInfo.exceed">剩{{childInfo.exceedDate}}天到期</span>
        </div>
        <div class="info-two">
          应续费日期: {{childInfo.endDate}}
        </div>
        <span class="className">{{childInfo.storeName}}{{childInfo.className}}</span>
      </div>
      <div class="recording">{{childInfo.followNum}}条跟进记录</div>
    </div>
  </div>
</template>
<script>
  import DwAvatarReveal from './base/AvatarShow';

  export default {
    data() {
      return {
        touchBackground: false,
        touchRenewal: true,
      };
    },
    components: {
      DwAvatarReveal,
    },
    props: {
      childInfo: Object,
      isJump: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      openRenewal() {
        if (this.isJump) {
          this.touchRenewal = true;
        }
      },
      moveRenewal() {
        if (this.isJump) {
          this.touchRenewal = false;
        }
      },
      closeRenewal(childInfo) {
        if (this.isJump && this.touchRenewal) {
          this.$router.push({
            path: '/teacher/renewalDetail',
            query: {
              id: childInfo.id,
            },
          });
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  div.layoutChange:active{
    background: rgba(0,0,0,0.05);
  }
  .card {
    padding: 10px 15px;
    display: flex;
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 100%;
    }
    .default-avatar {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      background: url(../../assets/img/img/avatar/defaultAvatar.png) no-repeat center;
      background-size: cover;
    }
    .info {
      flex: 1;
      padding-left: 1rem;
      .info-first {
        display: flex;
        div:first-child {
          padding-right: .5rem;
        }
        .expire {
          color: #f6ae36;
          font-size: 12px;
          padding: 0 .3rem;
          line-height: 20px;
          border: 1px #f6ae36 solid;
          border-radius: 1rem;
          height: 18px;
        }
      }
      .info-two {
        font-size: 12px;
        color: #767676;
      }
      .className {
        background-color: #e8e8e8;
        color: #999999;
        font-size: 12px;
        padding: .2rem .3rem;
        border-radius: 2px;
      }
    }
    .recording {
      text-align: right;
      color: #b3b3b3;
      font-size: 12px;
    }
  }
  .mark{
    width: 15px;
    height: 15px;
    margin-top: 2px;
    margin-right: 5px;
    background: url(../../assets/img/img/page/beResponsibleFor.png) no-repeat center;
    background-size: cover
  }
</style>
