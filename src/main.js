import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import QRCode from 'qrcode'
import duplicatedRouteCallbackFn from './utils/duplicatedRouteCallback'
import waitLoading from '@/utils/loading'
Vue.use(QRCode)
Vue.config.productionTip = false
Vue.prototype.websiteName = 'Lxd_ΠΠ_Website'
Vue.prototype.duplicatedRouteCallbackFn = duplicatedRouteCallbackFn // 重复路由跳转报错时的回调函数
Vue.prototype.waitingLoading = waitLoading
import '@/mock/mock.js'
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  store,
  router
}).$mount('#lxd_paipai')
