<template>
  <div>
    <h2>Installation</h2>
    <p>Use npm to install plugin</p>
    <pre>npm i vue-sidebar-menu --save</pre>
    <p>Import the plugin globally</p>
    <pre>import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
</pre>
    <p>Or import the component locally.</p>
    <pre>import { SidebarMenu } from 'vue-sidebar-menu'
export default {
    components: {
        SidebarMenu
    }
}
</pre>
  </div>
</template>
