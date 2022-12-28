<template>
  <div id="app">
     <transition :name="transition">
       <div>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
       </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transition: "",
      include: "index", // 缓存组件 
    };
  },
  created() {
  },
  watch: {
    $route(to, from) {
      if(from.query.back){
        this.transition = "slide-fade-left";
      }else {
        this.transition = "slide-fade-right";
      }
    }
  },
  mounted(){
  },
  methods: {
    
  }
}
</script>
<style lang='less'>
  #app{
    background-color: @page-color;
    font-family: PingFangSC-Regular,PingFang-SC-Medium,sans-serif;
    color: @text-color;
  }
  .van-dialog{
    .van-dialog__header{
      padding-top: 25px;
      height: 22px;
      font-size: 16px;
      font-weight: 500;
      color: @main-color;
      line-height: 22px;
    }

    .van-button{
      background-color: @dialog-bg-color;
      height: 54px;
      font-size: 14px;
      font-weight: 400;
      border-radius: 0;
    }
    .van-hairline--top::after{
      border-top: 2px solid @hairline-color;
    }
    .van-hairline--left::after{
      border-left: 2px solid @hairline-color;
    } 
    .van-dialog__message--has-title{
      padding: 26px 30px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: @detail-color;
      line-height: 20px;
    }
  }
</style>
