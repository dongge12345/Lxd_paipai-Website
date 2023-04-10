import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import QRCode from 'qrcode'
Vue.use(QRCode)
Vue.config.productionTip = false
import '@/mock/mock.js'
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  store,
  router
}).$mount('#lxd_paipai')
