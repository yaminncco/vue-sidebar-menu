import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import VueSidebarMenu from '../../src'

import Installation from './components/Installation.vue'
import BasicUsage from './components/BasicUsage.vue'
import Props from './components/Props.vue'
import Events from './components/Events.vue'
import Styling from './components/Styling.vue'
import Slots from './components/Slots.vue'

import PrismCode from './components/PrismCode.vue'

import './fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Installation',
      component: Installation,
    },
    {
      path: '/basic-usage',
      name: 'BasicUsage',
      component: BasicUsage,
    },
    {
      path: '/props',
      name: 'Props',
      component: Props,
    },
    {
      path: '/events',
      name: 'Events',
      component: Events,
    },
    {
      path: '/styling',
      name: 'Styling',
      component: Styling,
    },
    {
      path: '/slots',
      name: 'Slots',
      component: Slots,
    },
    {
      path: '/:pathMatch(.*)',
      component: Installation,
    },
  ],
})

createApp(App)
  .use(router)
  .use(VueSidebarMenu)
  .component('prism-code', PrismCode)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
