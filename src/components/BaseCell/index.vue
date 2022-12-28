<template>
  <div class="base-cell" :class="{'is-link': showBg, 'disable': disable}">
    <div @click.stop :class="{'overlap': disable}"></div>
    <div class="base-content" @click="onClick">
      <div class="left">
        <base-icon :icon="icon" :color="global.themeColor" :background="global.icon1Color"/>
        <div class="info">
          <div class="title">{{title}}</div>
          <slot name="label">
            <div v-if="label" class="label">{{label}}</div>
          </slot>
        </div>
      </div>
      <div class="right">
        <slot name="right">
          <div class="value">{{value}}</div>
        </slot>
        <div v-if="isLink" class="right-icon">
          <base-icon icon="icon-jiantou" :color="global.shutDown" size="18"></base-icon>
        </div>
      </div>
    </div>
    <div class="border" v-show="border"></div>
  </div>
</template>
<script>
export default {
  name: 'BaseCell',
  props: {
    title: String,
    label: String,
    value: String,
    to: String,
    border:{
      type: Boolean,
      default: true
    },
    icon:{
      type: String,
    },
    isLink:{
      type: Boolean,
      default: false
    },
    disable:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      showBg: false
    }
  },
  methods:{
    onClick(){
      if(this.isLink){
        this.showBg = true
        let timeout = setTimeout(() => {
          this.showBg = false
          clearInterval(timeout)
        }, 100);
      }
      if(this.to){
        this.$router.push(this.to)
      }else{
        this.$emit("click")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base-cell{
  position: relative;
  padding: 0 20px;
  .base-content{
    min-height: 65px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    .left{
      display: flex;
      align-items: center;
      .info{
        margin-left: 15px;
        .title{
          height: 21px;
          font-size: 15px;
          font-weight: 400;
          color: @main-color;
          line-height: 21px;
        }
        .label{
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: @detail-color;
          line-height: 17px;
        }
      }
    }
    .right{
      display: flex;
      align-items: center;
      .value{
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: @detail-color;
        line-height: 20px;
        margin-left: 5px;
      }
      .right-icon{
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }
  }
  .border{
    height: 0.5px;
    background-color: @mask-selected-color;
  }

  .overlap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
}
.disable{
  opacity: 0.4;
}

.is-link{
  background-color: @icon-color;
}
</style>
