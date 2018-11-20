<template>
  <div>
    <div class="card layout-card">
      <div class="logo" v-if="review.status === 20" :style="{backgroundImage: `url(${require('../../../assets/img/icon/sendDetailComponents/through.png')})`}"></div>
      <div class="logo" v-if="review.status === 30" :style="{backgroundImage: `url(${require('../../../assets/img/icon/sendDetailComponents/noThrough.png')})`}"></div>
      <div class="logo" v-if="review.status === 10 || review.status === 15" :style="{backgroundImage: `url(${require('../../../assets/img/icon/sendDetailComponents/underReview.png')})`}"></div>
      <div class="font" v-if="review.status === 20">审核已通过,恭喜您获得好评</div>
      <div class="font" v-if="review.status === 10 || review.status === 15">您的提交审核中,请耐心等候~</div>
      <div class="font" v-if="review.status === 30">审核未通过</div>
      <div class="fail border-t" v-if="review.status === 30">
        <div style="color: #999999;margin-bottom: .5rem">未通过原因</div>
        <div>
          {{review.checkMemo}}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-cell layout-flex">
        <div class="type">好评类型</div>
        <div class="typeValue" v-if="review.type === 1">锦旗</div>
        <div class="typeValue" v-if="review.type === 2">好评</div>
        <div class="typeValue" v-if="review.type === null">未填写</div>
      </div>
      <div class="card-cell layout-flex" v-if="evaluationDate">
        <div class="type">好评时间</div>
        <div class="typeValue">{{evaluationDate}}</div>
      </div>
      <div class="card-cell layout-flex">
        <div class="photo" v-for="(item, index) in photos" :key="index" :style="{background: `url(${item}) no-repeat center`, backgroundSize: 'cover'}"></div>
      </div>
      <div class="card-cell" v-if="review.memo">
        <div style="color: #999999;">好评备注</div>
        <div>
          {{review.memo}}
        </div>
      </div>
      <div class="card-cell" style="color: #999999;display: flex">
        <div style="margin-right: 5px">提交时间: </div>
        <div>
          {{review.create_time}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import moment from 'moment';

  export default {
    data() {
      return {
        id: '',
        review: {
        },
        photos: [],
        evaluationDate: '',
      };
    },
    computed: {
      ...mapState({
        expandList: state => state.teacher.expandList,
        evaluationList: state => state.teacher.evaluationList,
      }),
    },
    mounted() {
      this.id = this.$route.query.id;
      this.evaluationList.forEach((item) => {
        item.forEach((data) => {
          if (data.id !== null) {
            if (this.id.toString() === data.id.toString()) {
              this.review = data;
              console.log(data);
              this.evaluationDate = moment(data.evaluationDate).format('YYYY年MM月DD日');
              this.photos = JSON.parse(data.photos);
            }
          }
        });
      });
    },
  };
</script>

<style lang="less" scoped>
  .layout-card {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    .logo {
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      margin: 1rem auto;
      background-size: cover;
      background-repeat: no-repeat
    }
    .font {
      text-align: center;
      margin-bottom: 1rem;
    }
    .fail {
      padding: 1rem 0;
    }
  }

  .layout-flex {
    display: flex;
    flex-wrap: wrap;
    .type {
      flex: 1;
      text-align: left;
      color: #999999;
    }
    .typeValue {
      flex: 1;
      text-align: right;
    }
    .photo {
      width: 7.2rem;
      height: 7.2rem;
      border-radius: 5px;
      margin: .5rem;
    }
  }
</style>
