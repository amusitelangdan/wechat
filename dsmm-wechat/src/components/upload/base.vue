<template>
  <div>
    <slot></slot>
    <input type="file" class="upload-file"  :accept="accept" :multiple="multiple" @change="onUpload" >
  </div>
</template>
<script>
function noop() {}
export default {
  props: {
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: {
      type: String,
      default: 'multiple',
    },
    onUpload: {
      type: Function,
      default: noop,
    },
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {
  },
};

</script>
<style lang="less" scoped>
  .upload-file {
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    top: 0;
    opacity: 0;
  }

</style>
