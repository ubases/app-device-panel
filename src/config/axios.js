import axios from 'axios'
import store from '@/store'

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}

axios.defaults.timeout = 10000;//超时时间
// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    config.baseURL = config.url.indexOf("/sapi")==0?store.getters.controlserver:store.getters.userhost
    // config.baseURL = 'http://192.168.50.72:443/'
    const isToken = (config.headers || {}).isToken === false
    let token = store.getters.accessToken
    if (!config.headers.authorization) {
      if (token && !isToken) {
        config.headers['authorization'] = 'Bearer ' + token // token
      }
    }
    config.headers['lang'] = store.getters.language || 'zh'
    config.headers['content-type'] = 'application/json'

    return config
  },
  error => {
    vm.$toast(vm.$t("public.timeout"));
    return Promise.reject(error)
  }
)

// HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    const status = Number(res.status) || 200
    const message = res.data.msg

    if (status === 401) {
      return Promise.reject(message)
    }
    if (status !== 200 || res.data.code === 500) {
      vm.$toast(vm.$t("public.errorinfo"));
      return Promise.reject(message)
    }
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
