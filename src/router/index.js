import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.commit('updateRoute', to)
  next()
  // const token = getToken()
  // if (!token && to.meta && to.meta.NeedLogin) {
  //   next({
  //     name: LOGIN_PATH_NAME
  //   })
  // } else {
  //   store.commit('updateRoute', to)
  //   next()
  // }
})

export default router
