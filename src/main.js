import Vue from 'vue'
import App from './App.vue'
import Axios from '@/config/axios'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VAnimateCss from "./directives/index";
import mixin from '@/mixins/mixin.js';
import i18n from './lang'
import Vconsole from 'vconsole';
import VueTouch from 'vue-touch'
import "@/api/control"; //mqtt、coap操作

import './components/index'// 添加全局自定义组件
import '@/styles/reset.css'// 清除浏览器默认样式
import '@/styles/fonts/iconfont.css'// 自定义字体图标
import '@/styles/global.less' // 公用样式
import "@/styles/animate.min.css"; // 动画库
import '@/styles/animates.css' // 自定义动画
import 'vant/lib/index.less'
import 'lib-flexible/flexible' // px2rem

import bootstrap from '@/config/bootstrap'

Vue.use(Vant)
Vue.use(VueAxios, Axios)
Vue.use(Vuelidate)
Vue.use(VAnimateCss)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.mixin(mixin)
Vue.use(bootstrap)

Vue.config.productionTip = false
// if(process.env.NODE_ENV !== 'production'){// 手机测试时才显示Vconsole
  new Vconsole();
// }
import { Toast } from 'vant';
Toast.setDefaultOptions({"position":"bottom"})

window.vm = new Vue({
  router,
  store,
  i18n,
  created: Vue.prototype.$Init,
  render: h => h(App)
}).$mount('#app')
