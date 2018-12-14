import { Field } from 'mint-ui';
import './index.less';
import onValidate from '../../utils/validate';

export default {
  extends: Field,
  name: 'dw-field',
  props: {
    name: {
      type: String,
      default: '',
    },
    rule: {
      type: [Array, Object],
      default: [],
    },
  },
  watch: {
    currentValue(val) {
      this.$parent.$emit('input-validate', {
        name: this.name,
        val,
        validate: onValidate(val, this.rule),
      });
    },
  },
};
