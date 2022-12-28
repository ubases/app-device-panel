import Vue from 'vue'

//组件名称
let componentNames = [
  'BaseNavBar','BaseCell','BaseInput','BaseRadio','BasePermission','BasePicker','BaseEmpty','BasePopup', 'BaseIcon',
  'OffLineBox','AirQuality','AirProgress'
]
// 注册全局容器
componentNames.forEach((name)=>{
  Vue.component(name, () => import(`@/components/${name}`));
})