<template>
  <div class="airQuality">
    <div v-show="!shutDown">
      <div class="radar radar1" :style="{'border': `1px solid ${background}`}"></div>
      <div class="radar radar2" :style="{'border': `1px solid ${background}`}"></div>
      <div class="radar radar3" :style="{'border': `1px solid ${background}`}"></div>
      <div class="radar content" v-show="!shutDown" :style="{'borderColor': `${background}`}">
        <base-icon class="bg" icon="icon-a-xingzhuangjiehe1" :color="global.contentColor" size="6rem"></base-icon>
        <div class="radar info">
          <div class="val" :style="{'color': `${background}`}">{{quality}}</div>
          <div class="aq">{{$t("ap_air_quality")}}</div>
        </div>
        <img class="yyimg" src="images/yy.png" />
      </div>
    </div>
    <div v-show="shutDown">
      <div class="radar content" :style="{'borderColor': `${global.airBorderColor}`}">
        <base-icon class="bg" icon="icon-a-xingzhuangjiehe1" :color="global.airBgColor" size="6rem"></base-icon>
        <div class="radar shutDown">
          {{$t("ap_poweroff")}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: "#43AB92"
    },
    shutDown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quality: '',
    };
  },
  mounted(){
    this.quality = this.value
  },
  watch: {
  },
  methods: {
  },
};
</script>
<style lang='less' scoped>
.airQuality {
  position: relative;
  height:282px;
  padding-top: 12px;
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 236px;
    height: 236px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 32px solid;
    position: relative;
   
    .bg{
      display: flex;
      justify-content: center; 
      align-items: center;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 50%;
      z-index: 20;
    }
      
    .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      .val{
        height: 48px;
        font-size: 32px;
        font-weight: 600;
        line-height: 48px;
      }
      .aq{
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #70757D;
        line-height: 17px;
      }
    }
    .yyimg{
      position: absolute;
      width: 100%;
      bottom: -2px;
      left: 0;
    }
    .shutDown{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 172px;
      height: 172px;
      border-radius: 50%;
      font-size: 30px;
      font-weight: 600;
      background: @air-bg-color;
      color: @air-color;
    }
  }
  .radar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation-timing-function: linear;
  }
  .radar1 {
    width: 236px;
    height: 236px;
    opacity: 0;
    animation: animate 3s linear infinite;
    -webkit-animation: animate 3s linear infinite;
  }
  .radar2 {
    width: 236px;
    height: 236px;
    opacity: 0;
    animation: animate 3s linear infinite;
    -webkit-animation: animate 3s linear infinite;
    animation-delay: 1s;
  }
  .radar3 {
    width: 236px;
    height: 236px;
    opacity: 0;
    animation: animate 3s linear infinite;
    -webkit-animation: animate 3s linear infinite;
    animation-delay: 2s;
  }
  
  @keyframes animate {
    0%{
      width: 236px;
      height: 236px;
      opacity: 0;  
    }
    35%{
      width: 252px;
      height: 252px; 
      opacity: 0.3; 
    }
    70%{
      width: 266px;
      height: 266px; 
      opacity: 0.2; 
    }
    100%{
      width: 282px;
      height: 282px;
      opacity: 0;
    }
  }
}
</style>