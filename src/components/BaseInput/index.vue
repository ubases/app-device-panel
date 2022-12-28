<template>
  <div class="axy-input">
    <van-field v-model="inputValue" center
              :type="type" 
              :maxlength="maxlength" 
              :placeholder="placeholder" 
              :right-icon="rightIcon"
              :border="false"
              @click-right-icon="clickRightIcon"/>
    <div class="border" v-show="border"></div>
  </div>
</template>

<script>
export default {
  name: 'axyInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    maxlength:{
      type: String,
      default: '50'
    },
    value: String,
    placeholder: String,
    border:{
      type: Boolean,
      default: true
    },
    rightIcon: String
  },
  watch: {
    inputValue(newVal){
      this.$emit("input", newVal);
    },
    value(newVal){
      this.inputValue = newVal
    }
  },
  mounted(){
    this.inputValue = this.value
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods:{
    clickRightIcon(){
      this.$emit("clickRightIcon")
    }
  }
}
</script>

<style lang="less">
.axy-input {
  .border{
    margin-top: 10px;
    height: 1px;
    background-color: #DAE6F8;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 14px;
  }
  .van-field__control{
    line-height: 20px;
  }
  .van-icon{
    display: flex !important;
  }
}
</style>
