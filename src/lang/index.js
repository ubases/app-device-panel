import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from "@/store/index";

import { Locale } from 'vant'

//语言包
import enVant from './vant/en'
import zhVant from './vant/zh'
import enLocale from './locale/en'
import zhLocale from './locale/zh'
import { getStore } from '@/util/store'

import { getAppLangList } from "@/api";

Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
}
const i18n = new VueI18n({
  locale: getStore({ name: 'language' }) || 'zh',
  messages: messages,
})

if (i18n.locale === 'en') {
  Locale.use('en-US', enVant)
} else if (i18n.locale === 'zh') {
  Locale.use('zh-US', zhVant)
}

i18n.initLocal = ()=>{
  if(!store.state.common.langPackagePanel){
    store.commit("SET_LANG_PACKAGE", {
      "zh": { ...zhLocale },
      "en": { ...enLocale },
    });
  }
  let langPackagePanel = store.state.common.langPackagePanel
  i18n.setLocaleMessage("zh", langPackagePanel.zh);
  i18n.setLocaleMessage("en", langPackagePanel.en);
}

i18n.initRemote = async (productKey,callback)=>{
  i18n.locale = getStore({ name: 'language' }) || 'zh';
  // 动态获取语言包
  let res = await getAppLangList(productKey);
  if(res.code == 0 && res.data){
    store.commit("SET_LANG_PACKAGE", res.data);
    i18n.setLocaleMessage("zh", res.data.zh);
    i18n.setLocaleMessage("en", res.data.en);
    callback()
  }
}

export default i18n
