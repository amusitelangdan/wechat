<template>
  <div>
    <div class="doc-comm-box">
      <ul class="doc-comm-nav">
        <li v-for="(item,index) in list" :key="index" @click='onSelect(item.name)' :class="item.name === curDoc ? 'active' :''">
          {{ item.label}}
        </li>
      </ul>
      <div class="doc-comm-content">
        <keep-alive>
          <component v-for="(item) in list" :key="item.name" v-bind:is="item.component" v-if='item.name === curDoc'></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import project from './project'
  import blank from './blank'

  const list = [{
      label: '项目文档',
      component: project,
      name: 'project'
    },
    {
      label: 'blank-无数据组件',
      component: blank,
      name: 'blank'
    }
  ]
  export default {
    data() {
      return {
        list,
        curDoc: 'project'
      };
    },
    computed: {},
    components: {
      project,
      blank
    },
    methods: {
      onSelect(params) {
        this.curDoc = params;
      }
    },
    created() {},
    mounted() {},
  };

</script>
<style lang="less" scoped>
  .doc-comm-box {
    display: flex;
    width: 90%;
    padding: 0;
    margin: 0 auto;
    position: relative;
  }

  .doc-comm-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 10%;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;
    overflow: hidden;

    li {
      font-size: 16px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: .15s ease-out;
      font-weight: 700;
      cursor: pointer;
    }

    .active {
      color: #409eff;
    }
  }

  .doc-comm-content {
    margin-left: 10%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10%;
    width: 80%;
     margin-top: 40px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius:16px; 
  }

</style>
