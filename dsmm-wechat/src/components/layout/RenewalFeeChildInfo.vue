<template>
  <div>
    <div v-if="jump" class="card border-b" :class="{touchBackground: touchBackground}"  @touchstart="openRenewal" @touchend="closeRenewal(renewal)" @touchmove="moveRenewal">
      <div class="avatar" v-if="renewal.photo"
           :style="{backgroundImage: `url(${renewal.photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}"></div>
      <div class="default-avatar" v-else></div>
      <div class="info">
        <div>
          <div>{{renewal.name}}</div>
          <span class="expire" v-if="renewal.exceed">剩余{{renewal.exceedDate}}天到期</span>
        </div>
        <div>
          应续费日期: {{renewal.endDate}}
        </div>
        <span class="className">{{renewal.storeName}}{{renewal.className}}</span>
      </div>
      <div class="recording">{{renewal.followNum}}条跟进记录</div>
    </div>
    <div class="card border-b" v-if="!jump">
      <div class="avatar" v-if="renewal.photo"
           :style="{backgroundImage: `url(${renewal.photo})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}"></div>
      <div class="default-avatar" v-else></div>
      <div class="info">
        <div>
          <div>{{renewal.name}}</div>
          <span class="expire" v-if="renewal.exceed">剩余{{renewal.exceedDate}}天到期</span>
        </div>
        <div>
          应续费日期: {{renewal.endDate}}
        </div>
        <span class="className">{{renewal.storeName}}{{renewal.className}}</span>
      </div>
      <div class="recording">{{renewal.followNum}}条跟进记录</div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        touchBackground: false,
        touchRenewal: true,
      };
    },
    props: ['renewal', 'jump'],
    methods: {
      openRenewal() {
        this.touchBackground = true;
        this.touchRenewal = true;
      },
      moveRenewal() {
        this.touchRenewal = false;
      },
      closeRenewal(renewal) {
        this.touchBackground = false;
        if (this.touchRenewal) {
          this.$router.push({
            path: '/teacher/renewalDetail',
            query: {
              id: renewal.id,
            },
          });
        }
      },
    },
    mounted() {
      if (!this.jump) {
        this.jump = false;
      }
    },
  };
</script>
<style lang="less" scoped>
  .touchBackground{
    background: rgba(0,0,0,0.1);
  }
  .card {
    padding: 12px 1rem;
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
      background: url(../../assets/img/icon/defaultAvatar/defaultAvatar.png) no-repeat center;
      background-size: cover;
    }
    .info {
      flex: 1;
      padding-left: 1rem;
      div:first-child {
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
        }
      }
      div:nth-child(2) {
        font-size: 12px;
        color: #767676;
      }
      .className {
        background-color: #e8e8e8;
        color: #999999;
        font-size: 12px;
        padding: .2rem .3rem;
      }
    }
    .recording {
      text-align: right;
      color: #b3b3b3;
      font-size: 12px;
    }
  }
</style>
