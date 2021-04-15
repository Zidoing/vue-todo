import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)

  next()

})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
