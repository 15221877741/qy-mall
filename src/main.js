import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false
//给vue添加一个属性$bus 值是一个vue实例 用来做事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
