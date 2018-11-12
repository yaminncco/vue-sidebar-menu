# vue-sidebar-menu

A Vue.js Sidebar Menu Component

## Installation

```
npm i vue-sidebar-menu --save
```

Install the plugin globally.

```js
//main.js
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'

Vue.use(VueSidebarMenu)
```

Or import the component locally.

```js
//App.vue
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu,
  },
}
```

## Usage

```html
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
                    {
                        href: 'reports',
                        title: 'Reports',
                        icon: 'fa fa-clipboard',
                        // SubItem
                        child: [
                            {
                                href: 'usage',
                                title: 'Usage Report',
                                icon: 'fa fa-people'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>
```

### Vue-router Support

if you are using vue-router, the component will use `<router-link>` instead of hyperlink `<a>`

### Props

```js
props: {
    menu: {
        type: Array,
        required: true
    },
    collapsed: {
        type: Boolean,
        default: false
    }
}
```

### Events

```html
<sidebar-menu @collapse="onCollapse" />
```

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

## Development

```
npm install
npm run dev
```
