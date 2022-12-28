<template>
  <div id="index">
    <base-nav-bar fixed :title="device.name">
      <template v-slot:left>
        <div @click="clickLeft">
          <base-icon @click="clickLeft" icon="icon-xitongfanhui" :color="global.arrowLeftColor" size="24"></base-icon>
        </div>
      </template>
      <template v-slot:right>
        <div @click="linkToPage(`#/set?devId=${devId}&role=${role}&fwVer=${devInfo.fwVer}`)">
          <base-icon icon="icon-shezhi" :color="global.arrowRightColor" size="24"></base-icon>
        </div>
      </template>
    </base-nav-bar>
    <div class="content">
      <!-- 模式 -->
      <div class="cards">
        <div :class="{'disable': shutDown}"></div>
        <div class="speedCard">
          <div class="speedTitle">{{$t("ap_mode")}}</div>
          <div class="speedContent">
            <div class="contentCard" v-for="(item,index) in modeList" :key="index" @click="changeMode(item.mode)">
              <div class="select" :class="{'active': mode==item.mode}">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 档位 -->
      <div class="cards">
        <div :class="{'disable': shutDown}"></div>
        <div class="speedCard">
          <div class="speedTitle">{{$t("module_fan_speed")}}</div>
          <div class="speedContent">
            <div class="contentCard" v-for="(item,index) in gearList" :key="index" @click="changeGear(item.gear)">
              <div class="select" :class="{'active': gear==item.gear}">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cards">
        <base-cell icon="icon-dingshi" :title="$t('ap_timer')" is-link @click="linkToPage(`#/timing?devId=${devId}&funcKey=1`)"></base-cell>
        <base-cell icon="icon-daojishi" :title="$t('ap_countdowm')" :border="false" is-link @click="linkToPage(`#/countDown?devId=${devId}&funcKey=1&funcValue=${shutDown ? 'true' : 'false'}`)">
          <template slot="right">
            <div class="countDownTime" style="display:flex;" v-if="countDown.countDownTime">
              <van-count-down :time="countDown.countDownTime" @finish="countDown.countDownTime=0"/>
              <span>{{countDown.funcValue == 'true'? this.$t("ap_countdowm_on",{ time: "" }) :  this.$t("ap_countdowm_off",{ time: "" })}}</span>
            </div>
          </template>
        </base-cell>
      </div> 
    </div>
    <!-- 底部操作 -->
    <div class="tabbar">
      <div class="close-button" v-if="shutDown" @click="switchChange">
        <base-icon icon="icon-guanji" color="#70757D" size="48" :round="false" />
        <span>{{$t("ap_switch")}}</span>
      </div>
      <div class="open-button" v-else @click="switchChange">
        <base-icon icon="icon-guanji" color="#FFFFFF" size="48" :round="false" />
        <span>{{$t("ap_switch")}}</span>
      </div>
    </div>
    <!-- !底部操作 -->
    <!-- 离线显示框 -->
    <off-line-box v-if="!online" :productId="productId"></off-line-box>
    <!-- !离线显示框 -->
  </div>
</template>
<script>
import { getUrlKey } from "@/util";
import { queryDeviceInfo, queryCountDownInfo } from "@/api";
import { mapGetters } from "vuex";
import { showPanelLoading, reloadWebviewUrl } from "@/api/cordova";
import i18n from "@/lang";
export default {
  data() {
    return {
      shutDown: false,        // 开关：switch1=FALSE;TRUE 注：switch是JS的关键字，此处用shutDown接收响应
      mode: 0,              
      gear: 0,          
      device: {},
      tsl: {},
      devId: '',
      productKey: '',
      online: 1,
      countDown: {},
      productId: "",
      modeList:[],
      gearList:[],
    };
  },
  computed: {
    ...mapGetters(["deviceInfo","role","devInfo"]),
  },
  created() {
    this.init();
  },
  mounted(){//隐藏原生加载页
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  activated(){
    document.addEventListener('backbutton', this.clickLeft, false);
  },
  methods: {
    init() {
      this.productKey = getUrlKey("productKey"); // 产品Key
      this.productId = getUrlKey("productId"); // 产品ID
      this.devId = getUrlKey("devId"); // 设备ID
      let lang = getUrlKey("lang"); // 语言
      let token = getUrlKey("token"); // 接口访问token
      let role = getUrlKey("role"); // 家庭角色
      let secretkey = getUrlKey("secretkey"); // 局域网数据加密秘钥
      let userhost = decodeURIComponent(getUrlKey("userhost")); // 接口访问地址
      let mqttServer = decodeURIComponent(getUrlKey("mqttServer")); // mqtt地址
      let username = decodeURIComponent(getUrlKey("username")); // mqtt地址
      let password = decodeURIComponent(getUrlKey("password")); // mqtt地址
      console.info(`控制页参数:productKey=${this.productKey}&devId=${this.devId}&role=${role}&secretkey=${secretkey}&userhost=${userhost}&lang=${lang}&mqttServer=${mqttServer}`);
      
      //缓存请求参数
      this.$store.commit("SET_ROLE", role);
      this.$store.commit("SET_ACCESS_TOKEN", token);
      this.$store.commit("SET_USER_HOST", userhost);
      this.$store.commit("SET_LANGUAGE", lang);

      //初始化远程语言包
      i18n.initRemote(this.productKey,()=>{
        //模式
        this.modeList=[{mode: 0, name: this.$t("module_mode_1"), open: true}, {mode: 1, name: this.$t("module_mode_2"), open: false}, 
                       {mode: 2, name: this.$t("module_mode_3"), open: false}, {mode: 3, name: this.$t("module_mode_4"), open: false}, 
                       {mode: 4, name: this.$t("module_mode_5"), open: false}];
        //档位
        this.gearList=[{gear: 0, name: this.$t("module_fan_speed_1"), open: true}, {gear: 1, name: this.$t("module_fan_speed_2"), open: false}, 
                       {gear: 2, name: this.$t("module_fan_speed_3"), open: false}, {gear: 3, name: this.$t("module_fan_speed_4"), open: false}, 
                       {gear: 4, name: this.$t("module_fan_speed_5"), open: false}];
      })

      //MQTT初始化
      this.controlInit(mqttServer, this.productKey, this.devId, secretkey, username, password);

      //设备信息
      queryDeviceInfo(this.devId).then((res) => {
        if(res.code==0){
          this.device = res.data || {};
          this.tsl = this.device.tsl || {}
          this.registerPropCallBack(this.device.deviceStatus || {})
        }
      });
      // 倒计时信息
      this.queryCountDownInfo(this.devId)
    },
    controlInit(mqttServer, productKey, deviceId, secretkey, username, password) {
      // 参数初始化
      let param = {mqttServer, productKey, deviceId, secretkey}
      Control.init(param, {username: username, password});

      // 获取属性回调
      Control.registerQueryPropCallBack = this.registerPropCallBack;
      // 修改属性回调
      Control.registerReportCallBack = this.registerPropCallBack;
      // 设备在线回调
      Control.registerOnlineCallBack = this.registerOnlineCallBack;
      // 设备信息回调
      Control.registerDeviceInfoCallBack = this.registerDeviceInfoCallBack;

      //连接mqtt监听消息回调
      Control.start();
      //获取所有属性
      Control.getProps([ "1","2","3" ]);
    },
    //获取属性 或 属性发生变化回调
    registerPropCallBack(props) {
      console.info("最新属性回调：", props);
      this.shutDown = typeof(props["1"]) != "undefined"?!props["1"]:this.shutDown
      this.mode = props["2"]??this.mode
      this.gear = props["3"]??this.gear
    },
    registerOnlineCallBack(online) {
      //设备在线状态回调
      this.online = online;
    },
    registerDeviceInfoCallBack(devInfo) {
      //设备信息回调
      console.info("固件返回的设备信息：", devInfo);
      this.$store.commit("SET_DEV_INFO", devInfo);
    },
    queryCountDownInfo(devId) {
      queryCountDownInfo(devId).then((res) => {
        if(res.data && res.data.enabled == 1){
          this.$set(this.countDown, 'countDownTime', res.data.surplusTime)
          this.$set(this.countDown, 'funcValue', res.data.funcValue)
        }else{
          this.$set(this.countDown, 'countDownTime', 0)
        }
      });
    },
    linkToPage(params) {
      //页面跳转
      if(window.Aithings){
        reloadWebviewUrl({params})
      }else{
        // 本地调试
        let url = `http://${window.location.hostname}:8080/${params}`;
        location.href = url
        return;
      }
    },
    clickLeft() {
      Control.end();
      this.goHome();
    },
    onDeviceReady(){
      showPanelLoading(false)
    },
    changeMode(mode){
      if(this.shutDown) return;
      this.mode = mode
      this.modeList.forEach(v=>{
        v.open = false
      })
      this.$set(this.modeList[mode], 'open', true)
      Control.setProps({"2": mode})
    },
    changeGear(gear){
      if(this.shutDown) return;
      this.gear = gear
      this.gearList.forEach(v=>{
        v.open = false
      })
      this.$set(this.gearList[gear], 'open', true)
      Control.setProps({"3": gear})
    },
    switchChange(){
      this.shutDown = !this.shutDown
      Control.setProps({"1": !this.shutDown})
    },
  },
  beforeDestroy(){
    document.removeEventListener('deviceready',this.onDeviceReady)
    document.removeEventListener('backbutton',this.clickLeft)
  },
  destroyed(){
    Control.end()
  }
};
</script>
<style lang="less" scoped>
#index {
  height: 100vh;
  .left, .more {
    width: 30px;
    height: 30px;
  }
  
  .content {
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    padding-top: 88px;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 68px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 68px);

    .cards {
      position: relative;
      box-sizing: border-box;
      margin: 10px 20px 20px;
      background: @icon-color;
      border-radius: 6px;
      .label{
        position: relative;
        margin-top: 6px;
        height: 31px;
        .max{
          position:absolute;
          left: 0;
          top: 0;
          z-index: 10;
          width: 240px;
          height: 8px;
          background: @icon1-color;
          border-radius: 4px;
        }
        .val{
          position:absolute;
          left: 0;
          top: 0;
          z-index: 20;
          width: 240px;
          height: 8px;
          border-radius: 4px;
          background: #43AB92;
          width: 100px;
        }
        .labelInfo{
          padding-top: 14px;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: @detail-color;
          line-height: 17px;
        }
      }
      .countDownTime {
        .van-count-down, span {
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: @detail-color;
          line-height: 20px;
        }
      }
      .speedCard{
        padding: 15px 20px 24px;
        .speedTitle{
          height: 21px;
          font-size: 15px;
          font-weight: 400;
          color: @main-color;
          line-height: 21px;
        }
        .speedContent{
          display: flex;
          flex-wrap: wrap;
          text-align: center;
          align-items: center;
          .contentCard{
            margin-right: 9px;
          }
          .select{
            margin-top: 15px;
            font-size: 12px;
            font-weight: 400;
            color: @detail-color;
            line-height: 30px;
            width: 92px;
            height: 30px;
            background: @icon1-color;
            border-radius: 15px;
          }
          .active{
            color: @content-color;
            background: @theme-color;
            font-weight: 600;
          }
          .contentCard:nth-child(3n) {
            margin-right: 0 !important;
          }
        }
      }
      .disable{
        position: absolute;
        z-index: 100;
        background: #FFFFFF;
        width: 100%;
        height: 100%;
        opacity: 0.6;
      }
    }
  }

  .tabbar{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 68px;
    background: #ffffff;
    box-shadow: 0px -1px 5px 2px rgba(155, 155, 155, 0.1);
    padding-bottom: calc(constant(safe-area-inset-bottom));
    padding-bottom: calc(env(safe-area-inset-bottom));
    &> div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 335px;
      height: 48px;
      border-radius: 48px;
      font-size: 16px;
      font-weight: 400;
    }

    .close-button {
      background: #f5f6f7;
      color: #70757d;
    }
    .open-button {
      background: #3281FF;
      color: #ffffff;
    }

    .active{
      color: @theme-color;
    }
  }
}
</style>
