<template>
  <div class="markdown-code" ref='markdown'></div>
</template>
<script>
  import hljs from 'highlightjs';
  import Markdownit from 'markdown-it';
  import axios from 'axios';
  import './index.less';
  import 'highlightjs/styles/github.css';

  const md = new Markdownit({
    html: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs doc-code"><code>${
                    hljs.highlight(lang, str, true).value
                    }</code></pre>`;
        } catch (__) {
          console.error(__);
        }
      }
      return `<pre class="hljs doc-code"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

hljs.initHighlightingOnLoad();
  export default {
    props: {
      name: String,
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
    created() {},
    mounted() {
      const markdownDom = this.$refs.markdown;
      import(`../${this.name}/${this.name}.md`).then(res => axios(res))
        .then((res) => {
          const tagString = md.render(res.data);
          const range = document.createRange();
          range.selectNode(document.body);
          const documentFragment = range.createContextualFragment(tagString);
          markdownDom.appendChild(documentFragment);
        })
  
        .catch((err) => {
          console.log('Failed to load moment', err);
        });
    },
  };

</script>
<style lang="less" scoped>

</style>
