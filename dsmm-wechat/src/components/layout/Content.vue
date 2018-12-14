<template>
  <div class="g-box"  @touchstart="startPress" @touchend="endPress" @touchmove="movePress">
    <div class="box">
      <div class="icon" style="text-align: center">
        <i class="iconfont" :class="content.icon" :style="{color: content.color}"></i>
      </div>
      <div style="text-align: center;padding-top: .5rem">{{content.name}}</div>
      <dw-num-check v-if="content.selectIcon" class="location" v-bind:calculated="content.checkedCount" v-bind:total="content.studentCount"></dw-num-check>
    </div>
  </div>
</template>

<script>
  import DwNumCheck from '../../components/planning/base/layout/NumCheck';

  export default {
    data() {
      return {
        isJump: false,
      };
    },
    components: {
      DwNumCheck,
    },
    props: ['content'],
    methods: {
      startPress() {
        this.isJump = true;
      },
      endPress() {
        if (this.isJump) {
          if (this.content.isJump) {
            if (this.content.examined) {
              this.$router.push(this.content.link);
            } else {
              this.$toast('今日已发送过课程信息');
            }
          } else {
            this.$toast('今日暂时没有安排');
          }
        }
      },
      movePress() {
        this.isJump = false;
      },
    },
  };
</script>

<style lang="less" scoped>
.box{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
  .location{
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .icon{
    i{
      font-size: 30px;
      line-height: normal
    }
  }
  .g-box{
    position: relative;
    width: 100%;
    height: 100%;
  }
.g-box:active{
  background: rgba(0,0,0,0.05);
}
</style>
