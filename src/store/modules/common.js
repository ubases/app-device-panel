import { setStore, getStore } from '@/util/store'

const common = {
  state: {
    language: getStore({name: 'language'}) || 'zh',//语言
    langPackagePanel: getStore({name: 'langPackagePanel'}) || '',//语言包
    userhost: getStore({name: 'userhost'}) || '', // 用户API
    downloadurl: getStore({name: 'downloadurl'}) || '', // 图片下载URL
    accessToken: getStore({name: 'accessToken'}) || '',// API访问token
    role: getStore({name: 'role'}) || 0,// 控制单元API
    deviceInfo: getStore({name: 'deviceInfo'}) || {},// 云端设备信息
    devInfo: getStore({name: 'devInfo'}) || {},// 固件设备信息
    controlserver: getStore({name: 'controlserver'}) || "",// 控制单元服务API
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setStore({
        name: 'language',
        type: 'session',
        content: state.language
      })
    },
    SET_LANG_PACKAGE: (state, langPackagePanel) => {
      state.langPackagePanel = langPackagePanel
      setStore({
        name: 'langPackagePanel',
        content: state.langPackagePanel
      })
    },
    SET_USER_HOST: (state, userhost) => {
      state.userhost = userhost
      setStore({
        name: 'userhost',
        type: 'session',
        content: state.userhost,
      })
      state.downloadurl = userhost + "/uapi/download"
      setStore({
        name: 'downloadurl',
        content: state.downloadurl,
      })
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
      setStore({
        name: "accessToken",
        type: 'session',
        content: state.accessToken,
      });
    },
    SET_ROLE: (state, role) => {
      state.role = role;
      setStore({
        name: "role",
        type: 'session',
        content: state.role,
      });
    },
    SET_DEVICE_INFO: (state, deviceInfo) => {
      state.deviceInfo = deviceInfo;
      setStore({
        name: "deviceInfo",
        type: 'session',
        content: state.deviceInfo,
      });
    },
    SET_DEV_INFO: (state, devInfo) => {
      state.devInfo = devInfo;
      setStore({
        name: "devInfo",
        type: 'session',
        content: state.devInfo,
      });
    },
    SET_CONTROL_SERVER: (state, controlserver) => {
      state.controlserver = controlserver;
      setStore({
        name: "controlserver",
        type: 'session',
        content: state.controlserver,
      });
    },
  }
}
export default common
