<template>
  <div class="base-icon">
    <div class="warp" :style="{
      'width':`${size}px`, 
      'height':`${size}px`, 
      'background': background, 
      'borderRadius': `${round?'50%':'10%'}`,
      'border': `${border?'1px solid #929395':'unset'}`
    }">
      <i :class="['i','iconfont',`${icon}`]" :style="{'fontSize': `${fontSize}`, 'color': color}"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
    color: String,
    background: {
      type: String,
      default: 'transparent'
    },
    size: {
      type: [Number, String],
      default: 40
    },
    round: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      fontSize: 0,
    };
  },
  created(){
    this.fontSize = (isNaN(this.size) ? this.size : this.size + 'px')
  },
  methods: {
  },
};
</script>
<style lang='less' scoped>
.base-icon {
 .warp{
   display: flex;
   justify-content: center;
   align-items: center;
   box-sizing: border-box;
 }
}
</style>