
import markdown from '../markdown/index';
import Vue from 'vue';
import './index.less';
import blank from '../../src/components/layout/Blank';

const Blank = Vue.extend({
  components: { blank },
  render(h) {
    return <blank text="目前本班级没有在读学员哦~"></blank>;
  },
});
window.BlankComm = new Blank();
export default {
  components: { markdown },
  render(h) {
    return <markdown name="blank"></markdown>;
  },
}
;
