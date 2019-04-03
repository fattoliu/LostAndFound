import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './storage'
import AlertPlugin from 'vux/src/plugins/alert/index.js'

Vue.config.productionTip = false

Vue.use(AlertPlugin)

Vue.prototype.$storage = storage

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
