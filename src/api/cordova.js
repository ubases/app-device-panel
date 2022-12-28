/**
 * 扫描设备
 * @param {*} namePrefix WIFI名称前缀
 * @param {*} timeout(ms) 超时时间，超时后返回扫描结果
 * @param {*} interval(ms) 扫描结果返回间隔，0表示只在超时后返回
 * @param {*} alertToTurnOnBluetooth 是否提示打开蓝牙
 * @param {*} callback 回调函数
 * @returns {"deviceId":"设备ID",name:"设备名称","type":"设备类型"}
 */
 export function scanDevice(alertToTurnOnBluetooth = true, callback) {
  window.Aithings && Aithings.scanDevice({namePrefix: ["axy_"], timeout: 15000, interval: 1000, alertToTurnOnBluetooth}, callback)
}

/**
 * 停止扫描设备
 */
export function stopScanDevice() {
  window.Aithings && Aithings.stopScanDevice();
}

/**
 * 配网
 * @param {*} machineId 设备ID
 * @param {*} name 设备名称
 * @param {*} type 设备类型
 * @param {*} message 配网数据，未加密前的
 * @param {*} timeout 超时时间
 * @returns 
 */
 export function startConfigNetwork(machineId, name, type, message, callback) {
  window.Aithings && Aithings.startConfigNetwork({machineId, name, type, message, timeout: 60000}, callback);
}

/**
 * 停止配网
 */
 export function stopConfigNetwork() { 
  return new Promise((resolve, reject) => {
    window.Aithings && Aithings.stopConfigNetwork({},res=>{resolve(res)},res=>{reject(res)})
  })
}

/**
 * 释放APP配网资源（扫描后不配网时进行释放）
 */
 export function releaseResource() { 
  window.Aithings && Aithings.releaseResource()
}

/**
 * 设置极光别名
 * @param alias 别名
 */
 export function setJPushAlias(alias) {
  return new Promise(() => {
    window.Aithings && Aithings.setJPushAlias(alias);
  });
}

/**
 * 拉起相册、相机
 * @param tyep 0:相册 1:相机
 */
export function cameraPicture(sourceType) {
  return new Promise((resolve, reject) => {
    navigator.camera.getPicture((res) => { resolve(res); },(res) => { reject(res); },
      {
        quality: 100,
        sourceType: sourceType,
        mediaType: 0,
        encodingType: 1,
        targetWidth: 1000,
        targetHeight: 750,
        correctOrientation: true,
        destinationType: Camera.DestinationType.DATA_URL,
      }
    );
  });
}

/**
 * 获取已安装的第三方登录APP（微信、支付、微博、苹果、facebook）
 */
export function getInstalledApps() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getInstalledApps((res) => { resolve(res);});
  });
}

/**
 * 获取第三方登录信息
 * @param {*} type wechat:微信 alipay:支付宝 weibo:微博 facebook:facebook apple:苹果
 * @returns
 */
export function thirdPartyLogin(type) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.thirdPartyLogin(type,(res) => {resolve(res)});
  });
}



/**
 * 打开设置界面
 * @param {*} page "location_permission"	定位权限界面  "bluetooth_permission"	蓝牙权限界面  "wifi_settings"	WiFi设置界面
 * @returns
 */
export function openSettings(page) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.openSettings(page,(res)=>{resolve(res)});
  });
}

/**
 * 检查蓝牙权限
 * @returns
 */
export function getBluetoothState() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getBluetoothState((res) => {resolve(res)});
  });
}

/**
 * 检查定位权限
 * @returns
 */
export function getLocationState() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getLocationState((res) => { resolve(res); } );
  });
}

/**
 * 检查是否开启wifi
 * @returns
 */
 export function getWiFiEnabled() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getWiFiEnabled((res) => { resolve(res); } );
  });
}

/**
 * 获取定位信息
 * @returns
 */
 export function startOnceLocation() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.startOnceLocation((res) => {resolve(res)});
  });
}

/**
 * 复制剪切板
 * @returns
 */
export function copyToClipboard(text) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.copyToClipboard( text ,() => { resolve(); } );
  });
}

/**
 * 第三方分享
 * @returns
 * @param {*} serviceType   wechat：微信
 */
export function socialShare(serviceType, text) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.socialShare({serviceType, text},() => {resolve()});
  });
}

/**
 * 获取系统版本
 * @returns 
 */
 export function getAppVersion() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getAppVersion((res) => {resolve(res)} );
  });
}

/**
 * 根据本地url获取文件
 * @returns 文件base64格式
 */
 export function getFile(url) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getFile({url},(res) => {resolve(res)});
  });
}

/**
 * 获取当前WIFI名称
 * @returns 
 */
 export function getCurrentWiFiSSID() {
  return new Promise((resolve) => {
    window.Aithings && Aithings.getConnectionWiFiSsid((res) => { resolve(res)});
  });
}

/**
 * 重新加载移动端vebveiw url
 */
 export function reloadWebviewUrl({url="",params='',clearHistory=false}) {
  return new Promise(() => {
    window.Aithings && Aithings.reloadWebviewUrl({url,params,clearHistory});
  })
}

/**
 * 下载或更新控制页
 * @param {*} model 控制页模块名
 * @param {*} checkMd5 文件校验码
 * @param {*} downloadUrl 文件下载地址
 * @param {*} token http的head令牌
 * @returns 
 */
 export function downloadPanel(model,checkMd5,downloadUrl,token) {
  return new Promise((resolve) => {
    window.Aithings && Aithings.downloadPanel({model,checkMd5,downloadUrl,token},(res)=>{resolve(res)});
  });
}

/**
 * 退出系统通知原生（用来清理本地一些缓存数据和极光推送）
 * @returns 
 */
export function logout() {
  window.Aithings && Aithings.logout();
}

/**
 * 设置语言
 * @returns 
 */
export function setLanguage(name) {
  window.Aithings && Aithings.setLanguage(name);
}

/**
 * 同意用户协议
 * @returns 
 */
export function userAgreedToPrivacyPolicy() {
  window.Aithings && Aithings.userAgreedToPrivacyPolicy();
}

/**
 * 退出APP
 */
export function exitApp() {
  window.navigator.app && navigator.app.exitApp();
}

/**
 * 原生加载动画
 */
export function showPanelLoading(showPanelLoading) { 
  window.Aithings && Aithings.showPanelLoading(showPanelLoading)
}

/**
 * 关闭插件
 */
export function shrinkView(bl) { 
  window.Keyboard && Keyboard.shrinkView(bl)
}


/**
 * 获取缓存大小
 */
export function getCacheSize() { 
  return new Promise((resolve) => {
    window.Aithings && Aithings.getCacheSize((res)=>{resolve(res)})
  })
}


/**
 * 清理缓存
 */
 export function clearCache() { 
  return new Promise((resolve) => {
    window.Aithings && Aithings.clearCache((res)=>{resolve(res)})
  })
}

/**
 * 局域网发现服务
 * @param {*} onoff 开启或关闭
 * @param {*} callback 回调函数：接收局域网设备信息
 */
 export function switchDeviceDiscoverService(onoff) {
  window.Aithings && Aithings.switchDeviceDiscoverService(onoff)
}

/**
 * 通过局域网发送消息给设备
 * @param {*} devId 设备Id
 * @param {*} data 消息数据
 * @param {*} key 加密秘钥
 * @param {*} timeout 响应超时时间：小于等于0 表示一直等待响应，单位：毫秒
 */
 export function sendUdp(deviceId, key, data, timeout=500) {
  return new Promise((resolve) => {
    if(window.Aithings){
      Aithings.sendUdp({deviceId, key, data, timeout}, (res)=>{resolve(res)})
    }else{
      resolve({"code": -1})
    }
  })
}
