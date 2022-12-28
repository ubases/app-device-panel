<template>
  <div class="picker-box">
    <van-picker
      :default-index="index"
      :columns="columns"
      :visible-item-count="visible_item_count"
      :value-key="value_key"
      :item-height="item_height"
      @change="onChange"
    />
    <div class="white-board" :style="{ top: item_height * ((visible_item_count - 1) / 2) + 'px', height: item_height + 'px', 'line-height': item_height + 'px' }" >
      <span> {{ hint }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: [String, Number],
      default: 0,
    },
    columns: {
      type: Array,
      default: [],
    },
    visible_item_count: {
      type: [String, Number],
      default: 7,
    },
    item_height: {
      type: [String, Number],
      default: 40,
    },
    hint: {
      type: String,
      default: "",
    },
    value_key: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    onChange(picker, value, index) {
      this.$emit("change", picker, value, index);
    },
  },
};
</script>
<style lang='less' scoped>
.picker-box {
  position: relative;
  .white-board {
    position: absolute;
    padding-left: 30px;
    text-align: center;
    z-index: 1;
    width: 100%;
    font-size: 14px;
    color: @theme-color;
    background-color: @mask-selected-color;
  }
  /deep/ .van-picker {
    z-index: 2;
    background-color: rgba(0, 0, 0, 0);
    .van-picker__mask {
      background-image: none;
    }
    .van-picker-column__item{
      line-height: 40px;
      color: @detail-color;
    }
    .van-picker-column__item--selected {
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: @theme-color;
    }
    .van-picker__frame {
      left: 0;
      right: 0;
    }
    .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }
  }
}
</style>