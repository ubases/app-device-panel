import i18n from "@/lang";
      
export default {
  install(Vue, options) {
    /**
     * 启动数据初始化
     */
    Vue.prototype.$Init = async function() {
      i18n.initLocal() // 本地语言初始化
    };
  },
};
