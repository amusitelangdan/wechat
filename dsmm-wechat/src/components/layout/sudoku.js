import './sudoku.less';

export default {
  name: 'dw-sudoku',
  props: {
    number: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      sideLength: 'auto',
    };
  },
  render(h) {
    return <div class="sudoku-box" ref="box">
      {
        this.$slots.default.map((item, index) => {
          if ((index + 1) % this.number) {
            return <div class="sudoku-box-item" style={{ width: this.sideLength, height: this.sideLength }}>{item}</div>;
          }
          return <div class="sudoku-box-item-right" style={{ width: this.sideLength, height: this.sideLength }}>{item}</div>;
        })
      }
    </div>;
  },
  mounted() {
    this.sideLength = `${((this.$refs.box.offsetWidth - this.number) + 1) / this.number}px`;
  },

};
