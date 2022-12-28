<template>
  <div class="offLine">
    <div class="offLine-box">
      <base-icon class="warningIcon" icon="icon-shibai" color="#F75959" background="#ffffff" border size="48"></base-icon>
      <div class="info-title">{{ $t("ap_offline_title") }}</div>
      <div class="info-list">{{ $t("ap_offline_tip") }}</div>
      <div class="info-list">{{ $t("ap_offline_tips1") }}</div>
      <div class="info-list">{{ $t("ap_offline_tips2") }}</div>
      <div class="info-list">
        <div>{{ $t("ap_offline_tips3")}}</div> 
        <span @click="reconnection">{{ $t("ap_offline_relink") }}</span>
      </div>
      <div class="info-list">{{ $t("ap_offline_tips4") }}</div>
      <div class="footer-button" @click="backHome">{{ $t("ap_backhome") }}</div>
    </div>
  </div>
</template>  
<script>
import { mapGetters } from 'vuex'
export default {
  props:{
    productId: [String,Number]
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['devInfo'])
  },
  methods: {
    backHome(){
      Control.end()
      this.goHome()
    },
    reconnection(){
      Control.end()
      this.goHome(`#/resetdevice?productId=${this.productId}`,false)
    }
  },
};
</script>
<style lang='less' scoped>
.offLine {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.49);
}
.offLine-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 335px;
  height: 380px;
  background: @dialog-bg-color;
  border-radius: 10px;
  .warningIcon {
    display: block;
    width: 48px;
    height: 48px;
    margin: 35px auto 0;
  }
  .info-title {
    padding: 15px 0 20px;
    text-align: center;
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: @main-color;
    line-height: 22px;
  }
  .info-list {
    padding: 0 30px;
    font-size: 14px;
    font-weight: 400;
    color: @detail-color;
    line-height: 20px;

    span {
      text-decoration: underline;
      color: @theme-color;
    }
  }
  .footer-button {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 335px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: @theme-color;
    background: @content-color;
    border-radius: 0px 0px 10px 10px;
  }
}
</style>