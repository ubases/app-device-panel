import animate from './animate';

export default (Vue) => {
  Vue.directive('animate', {
    inserted: (el) => {},
    bind: (el, binding, vnode) => {
      const {
        name, value, oldValue, expression, arg, modifiers
      } = binding;
      
      animate(el, {classes:'pulse',duration:'150'}, modifiers);
    }
  })
};