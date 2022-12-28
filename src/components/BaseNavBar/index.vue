<template>
  <div class="base-nav-bar" :class="{'base-nav-bar-fixed': fixed}">
    <div class="nav-bar-left" >
      <slot name="left">
        <div @click="clickLeft">
          <base-icon name="left" @click="clickLeft" icon="icon-xitongfanhui" :color="global.arrowLeftColor" size="24"></base-icon>
        </div>
      </slot>
    </div>
    <div class="nav-bar-center van-ellipsis">
      {{title}}
    </div>
    <div class="nav-bar-right" @click="clickRight">
      <slot name="right">{{rightText}}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseNavBar',
  data(){
    return {
    }
  },
  props: {
    title: String,
    rightText: String,
    fixed: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    clickRight(){
      this.$emit("clickRight")
    },
    clickLeft(){
      this.$route.query.back = true
      this.$router.back(-1)
    },
  }
}
</script>

<style lang="less">
.base-nav-bar{
  display: flex;
  align-items: center;
  padding: 44px 20px 0;
  height: 44px;
  background-color: @content-color;
  .nav-bar-left{
    flex: 1;
    img{
      width: 24px;
      height: 24px;
    }
  }
  .nav-bar-center{
    flex: 1;
    height: 22px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: @main-color;
  }
  .nav-bar-right{
    display: flex;
    justify-content: flex-end;
    flex: 1;
    color: @theme-color;
    font-size: 15px;
    font-weight: 400;
    
    img{
      width: 24px;
      height: 24px;
    }
  }
}

.base-nav-bar-fixed{
  position: fixed;
  z-index: 100;
  width: calc(100vw - 40px);
}
</style>
