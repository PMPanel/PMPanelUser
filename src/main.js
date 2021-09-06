// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import SelectLang from '@/components/SelectLang'
import VueClipboard from 'vue-clipboard2'
import { Icon } from 'ant-design-vue'
import moment from 'moment'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import CrispChat from '@dansmaculotte/vue-crisp-chat'
import config from '@/config/defaultSettings'
VMdEditor.use(vuepressTheme)
VMdEditor.xss.extend({
  // extend white list
  whiteList: {
    source: ['src', 'type']
  }
})
Vue.use(VMdEditor)
Vue.use(CrispChat, {
  websiteId: config.websiteId, // 配置你的websiteId
  disabled: config.disableCrisp, // 禁用crisp
  hideOnLoad: false
})

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2202754_2188nwkgdur.js' // 在 iconfont.cn 上生成
})

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('selectLang', SelectLang)
Vue.component('my-icon', MyIcon)
Vue.use(VueClipboard)
Vue.prototype.$moment = moment

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
