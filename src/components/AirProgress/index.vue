<template>
  <div class="airProgress">
    <div class="titleUnit">
      <span class="title">{{title}} </span>
      <span class="unit">({{unit}})</span>
    </div>
    <div class="progress">
      <div class="maxProg" :style="{'width': `${only?'296':'121'}px`}">
      </div>
      <div class="valProg" :style="{'background': color, 'width': `${progress}px`}"></div>
      <div class="value" :style="{'left': `${only?'296':'127'}px`}">{{value}}</div>
    </div>
    <div class="info" :style="{'color': color}">{{info}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    unit: String,
    color: {
      type: String,
      default: '#43AB92'
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    info: String,
    only: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
     
    };
  },
  computed: {
    progress(){
      let maxWidth = this.only ? '296':'121'
      let value = this.value
      if(value > this.max){ value = this.max}
      let progress = (value/this.max).toFixed(2) * maxWidth
      return progress
    }
  },
  mounted(){
    
  },
  watch: {
    
  },
  methods: {
    
  },
};
</script>
<style lang='less' scoped>
.airProgress {
  .titleUnit{
    .title{
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: @main-color;
      line-height: 20px;
    }
    .unit{
      height: 17px;
      font-size: 12px;
      font-weight: 500;
      color: @detail-color;
      line-height: 17px;
    }
  }

  .progress{
    position: relative;
    width: 167px;
    height: 8px;
    margin-top: 8px;
    .maxProg{
      position: absolute;
      top: 0;
      left: 0;
      height: 8px;
      background: @icon-color;
      border-radius: 4px;
    }
    .valProg{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      height: 8px;
      border-radius: 4px;
    }
    .value{
      position: absolute;
      top: 0;
      height: 8px;
      line-height: 8px;
    }
  }

  .info{
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    margin-top: 8px;
  }
}
</style>