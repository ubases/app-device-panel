<template>
  <div class="empty">
    <img :src="icon" class="empty-icon" />
    <div class="empty-text">{{ message || $t("public.dataisempty") }}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    icon: [String],
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.empty {
  padding: 145px 0 0;
  text-align: center;
}
.empty-icon {
}
.empty-text {
  height: 20px;
  line-height: 20px;
  padding: 10px 0 20px;
  font-size: 14px;
  font-weight: 400;
  color: @detail-color;
}
.empty-button {
  padding: 11px 20px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: @theme-color;
  border-radius: 20px;
  border: none;
}
</style>