import request from '@/config/axios'

/**
 * 设备信息
 * @param {*} devId --设备id
 * @returns
 */
export function queryDeviceInfo(devId) {
  return request.get(`/v1/platform/app/dev/deviceInfo/${devId}`)
}

/**
 * 获取倒计时详细信息
 * @param {*} devId --设备id
 * @returns
 */
 export function queryCountDownInfo(devId) {
  return request.get(`/v1/platform/app/dev/countdown/info/${devId}`)
}

/**
 *  获取APP语言包（面板）1.0.3
 * @param {*} productKey --产品key
 * @returns
 */
 export function getAppLangList(productKey) {
  return request.get(`/v1/platform/app/common/customLang/panel?productKey=${productKey}`)
}
