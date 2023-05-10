<template>
  <div>
    <h2>Installation</h2>
    <p>Use npm to install plugin</p>
    <prism-code lang="bash">
      {{ `npm i vue-sidebar-menu --save` }}
    </prism-code>
    <p>Import the plugin globally</p>
    <prism-code lang="js">
      {{
        `import { createApp } from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

const app = createApp(App)
app.use(VueSidebarMenu)
app.mount("#app")`
      }}
    </prism-code>
    <p>Or import the component locally.</p>
    <prism-code lang="js">
      {{
        `import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
export default {
  components: {
    SidebarMenu
  }
}`
      }}
    </prism-code>
  </div>
</template>
