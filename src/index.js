import SidebarMenu from './components/SidebarMenu.vue'

export default {
  install (Vue) {
    Vue.component('sidebar-menu', SidebarMenu)
  }
}

export { SidebarMenu }
