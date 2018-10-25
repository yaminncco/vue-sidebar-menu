# vue-sidebar-menu

A Vue.js Sidebar Menu Component

## Installation

```
npm i vue-sidebar-menu --save
```

Install the plugin globally.

```
//main.js
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'

Vue.use(VueSidebarMenu)
```

Or import the component locally.

```
//App.vue
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu,
  },
}
```

## Usage

```
<template>
  <sidebar-menu :menu="menu" />
</template>

<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        href: '/',
                        title: 'Dashboard',
                        icon: 'fa fa-user'
                    },
                    {
                        href: '#',
                        title: 'Charts',
                        icon: 'fa fa-chart-area'
                    },
                ]
            }
        }
    }
</script>
```

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

## Development

```
npm install
npm run dev
```