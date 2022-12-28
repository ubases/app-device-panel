<template>
  <div class="base-popup">
    <van-overlay :show="show" z-index="100" @click="hide">
      <div class="base-popup-content" @click.stop>
        <div class="popup-header">
          <div class="close"></div>
          <div class="title">{{title}}</div>
          <div class="confirm" @click="hide">
            <base-icon icon="icon-shanchu" :color="global.arrowRightColor" size="24"></base-icon>
          </div>
        </div>
        <slot name="default">
          <div class="popup-content">
            <base-picker @change="onChange" :index="index" :columns="columns" :visible_item_count="3" value_key="label"></base-picker>
          </div>
          <div class="popup-floor">
            <van-button type="primary" size="large" @click="confirm">{{$t("ap_sure")}}</van-button>
          </div>
        </slot>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
	model: {
    prop: "value",
    event: "change"
  },
  props: {
    columns: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
    index: {
      type: [String, Number],
      default: 0,
    }
  },
  mounted(){
    this.currIndex = this.index
  },
  watch: {
    value(newVal) {
      this.show = newVal;
    }
  },
  data() {
    return {
      currIndex: 0,
      show: false,
    };
  },
  methods: {
    onChange(picker, value, index) {
      this.currIndex = index
    },
    confirm(){
      this.show = false
      this.$emit("onChange", this.columns[this.currIndex], this.currIndex);
      this.$emit("change", this.show);
      this.$emit("update:index", this.currIndex);
    },
    hide(){
      this.show = false
      this.$emit("change", this.show);
    }
  },
};
</script>
<style lang='less' scoped>
.base-popup {
  .base-popup-content{
    position: fixed;
    bottom: 0;
    background-color: @content-color;
    width: 100%;
    z-index: 200;
    border-radius: 10px 10px 0 0;
    .popup-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 72px;
      .close{
        width: 44px;
        padding:  0 20px;
      }
      .title{
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: @main-color;
        line-height: 22px;
      }
      .confirm{
        padding: 0 30px;
        img{
          width: 24px;
          height: 24px;
        }
      }
    }
    .popup-content{
      padding: 30px 0 25px;
      text-align: center;
      .column{
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: 500;
        color: @detail-color;
      }
      .active{
        background: @page-color;
        color: @theme-color;
      }
    }
    .popup-floor{
      box-shadow: 0px -1px 4px 2px @tabbar-shadow;
      padding: 10px 20px;
      padding-bottom: calc(constant(safe-area-inset-bottom) + 25px);
      padding-bottom: calc(env(safe-area-inset-bottom) + 25px);
      /deep/ .van-button{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: @content-color;
      }
    }
  }
}
</style>