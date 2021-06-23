<template>
  <div>
    <h2>Installation</h2>
    <p>Use npm to install plugin</p>
    <pre>npm i vue-sidebar-menu@next --save</pre>
    <p>Import the plugin globally</p>
    <pre>import { createApp } from 'vue'
import App from "./App.vue"
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

const app = createApp(App)
app.use(VueSidebarMenu)
app.mount("#app")
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
