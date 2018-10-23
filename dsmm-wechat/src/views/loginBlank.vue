<template>
  <h1></h1>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        query: {},
        userPhone: '',
        phoneCode: '',
        code: '',
        sourcePathName: '',
      };
    },
    methods: {
      ...mapActions({
        postLoginToken: 'postLoginToken',
      }),
      GetQuery() {
        const url = window.location.href;
        this.code = url.match(/\?.*code=([^&]*).*/)[1];
        this.userPhone = url.match(/\?.*userPhone=([^&]*).*/)[1];
        this.phoneCode = url.match(/\?.*phoneCode=([^&]*).*/)[1];
        this.sourcePathName = decodeURI(url.match(/\?.*sourcePathName=([^&]*).*/)[1]);
        localStorage.setItem('phone', this.userPhone);
      },
      init() {
        this.GetQuery();
        this.postLoginToken({
          userPhone: this.userPhone,
          code: this.code,
          phoneCode: this.phoneCode,
        }).then((res) => {
          if (res.obj['w-token']) {
            this.$router.replace({
              name: this.sourcePathName,
            });
          }
        });
      },
    },
    created() {
      this.init();
    },
  };
</script>
<style>

</style>
