import Vue from 'vue'
import App from './App.vue'

import VueSidebarMenu from '../src/index'
Vue.use(VueSidebarMenu)

new Vue({
  el: '#app',
  render: h => h(App)
})
