<template>
  <div class="axy-radio">
    <div class="item" :class="{'fullBorder':fullBorder}" @click="change(item.value)" v-for="(item,index) in dictList" :key="index">
      <div class="left" :class="{active:active==item.value}">
        <div>{{item.label}}</div>
        <div class="tag" v-if="item.tag">{{item.tag}}</div>
      </div>
      <img v-show="active==item.value" src="images/true.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'axy-radio',
  props: {
    value: String,
    dictList: Array,
    fullBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted(){
    this.$nextTick(()=>{
      this.active = this.value
    })
  },
  watch: {
    active(newVal){
      this.$emit("input", newVal);
    },
    value(newVal){
      this.active = newVal
    }
  },
  data () {
    return {
      active: ""
    }
  },
  methods:{
    change(value){
      this.active = value
      this.$emit("change", value);
    }
  }
}
</script>

<style lang="less">
.axy-radio{
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    border-bottom: 1px solid @page-color;
    margin: 0 20px;
    .left{
      display: flex;
      align-items: center;
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      color: @detail-color;
      line-height: 22px;
      .tag{
        background: rgba(131, 146, 167, 0.5);
        border-radius: 9px;
        padding: 0px 8px;
        text-align: center;
        height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 18px;
        margin-left: 10px;
      }
    }
    .active{
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      color: @theme-color;
      line-height: 22px;
      .tag{
        background: @theme-color;
      }
    }
    img{
      width: 20px;
      height: 20px;
    }
  }
  .fullBorder{
    padding: 0 20px;
    margin: 0;
  }
}
</style>
