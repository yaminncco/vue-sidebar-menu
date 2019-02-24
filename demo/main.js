import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSidebarMenu from '../src/index'

Vue.use(VueRouter)
Vue.use(VueSidebarMenu)

const Dashboard = { template: '<div>Dashboard Page</div>' }
const Charts = { template: '<div>Charts Page</div>' }
const Tables = { template: '<div>Tables Page</div>' }
const Auth = { template: '<div>Auth <router-view/></div>' }
const Login = { template: '<div>Login Page</div>' }
const Registration = { template: '<div>Registration Page</div>' }

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'registration',
          name: 'Registration',
          component: Registration
        }
      ]
    }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
})
