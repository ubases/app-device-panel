import { mapGetters } from "vuex";
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //如果输出结果是true就判定是android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
import global from "@/config/global";
import { reloadWebviewUrl } from "@/api/cordova";
export default {
  data() {
    return {
      isAndroid: isAndroid,
      isiOS: isiOS,
      global: global,
      // statusBarHeight: window.localStorage.getItem('statusBarHeight') || window.statusBarHeight || '44px',// 默认值由原生写入localStorage中
    }
  },
  computed: {
    ...mapGetters(["downreloadWebviewUrl"])
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    goHome(params='',clearHistory=true){
       // 有则返回指定页面 没有则返回默认首页
      if(process.env.NODE_ENV == 'production'){
        reloadWebviewUrl({params,clearHistory})
      }else{
        this.$router.go(-1)
      }
    }
  }
}