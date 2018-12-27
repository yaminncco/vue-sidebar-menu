import Vue from 'vue'
import App from './App.vue'

import '../dist/vue-sidebar-menu.css'
import VueSidebarMenu from '../dist/vue-sidebar-menu'
Vue.use(VueSidebarMenu)

Vue.use(VueRouter)
const Dashboard = { template: '<div>Dashboard Page</div>' }
const Charts = { template: '<div>Charts Page</div>' }
const Tables = { template: '<div>Tables Page</div>' }
const Auth = { template: '<div>Auth Page <router-view/></div>' }
const Login = { template: '<div>Login Page</div>' }
const Registration = { template: '<div>Registration Page</div>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts,
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'registration',
          name: 'Registration',
          component: Registration,
        }
      ]
    },
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
