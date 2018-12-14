<template>
    <form class="form" novalidate="true" @submit.prevent='submit' ref='form'>
        <slot></slot>
    </form>
</template>
<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {};
  },
  methods: {
    submit(event) {
      const list = this.$children.filter(item => item.name && !item.disabled)
        .map(item => ({ name: item.name, value: item.currentValue }));
      console.log(list);
    },
  },
};
</script>
<style lang="less" >
    .form{
        .mint-cell:last-child{
            background-image: inherit;
            background-size: inherit;
            .mint-cell-wrapper::after{
                background-size: 120% 0px;
            }
        }
    }
</style>

