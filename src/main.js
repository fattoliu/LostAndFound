import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import store from './store'
import './libs/init'
import AlertPlugin from 'vux/src/plugins/alert/index.js'
import ToastPlugin from 'vux/src/plugins/toast/index.js'
import LoadingPlugin from 'vux/src/plugins/loading/index.js'
import DatetimePlugin from 'vux/src/plugins/datetime/index.js'
import axios from 'axios'
import vueResource from 'vue-resource'
import 'iview/dist/styles/iview.css';
import VueClipboard from 'vue-clipboard2'
Vue.use(vueResource)
Vue.use(VueClipboard)


/* eslint-disable */

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(AlertPlugin)
Vue.use(ToastPlugin, {
  position: 'middle'
})
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(iView);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
