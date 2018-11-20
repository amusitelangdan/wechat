### 无数据展示组件
<div style='width:475px;height: 375px;position: relative;    border: 1px solid #eee;border-radius: 8px;'>
    <div id="blankComm"></div>
</div>
<script type="text/javascript" defer>
window.BlankComm.$mount('#blankComm')
</script>

### 案例
```html
<div style=''>
    <div id="blankComm"></div>
</div>
```

```javascript
const Blank = Vue.extend({
  components: { blank },
  render(h) {
    return <blank text="目前本班级没有在读学员哦~"></blank>;
  },
});
```

### 使用场景

### 属性


<div class="markdown-grid">

| 名称            |    类型           | 描述                          |默认值
| :--------      | :--------        | :--                           |:--             
| text       | String         | 文字展示  |    无
