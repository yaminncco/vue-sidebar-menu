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
    SidebarMenu
  }
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
                        header: true,
                        title: 'Main Navigation',
                    },
                    {
                        href: '/',
                        title: 'Dashboard',
                        icon: 'fa fa-user',
                        disabled: true
                    },
                    {
                        title: 'Charts',
                        icon: 'fa fa-chart-area',
                        child: [
                            {
                                href: '/charts/sublink',
                                title: 'Sub Link',
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
    },
    width: {
        type: String,
        default: '350px'
    },
    widthCollapsed: {
        type: String,
        default: '50px'
    }
}
```

### Events

```html
<sidebar-menu @collapse="onCollapse" />
```

### Styles

All styles customization can be done in normal CSS by using this classes

```css
.v-sidebar-menu {}
.v-sidebar-menu.vsm-default {}
.v-sidebar-menu.vsm-collapsed {}
.v-sidebar-menu .vsm-header {}
.v-sidebar-menu .vsm-list {}
.v-sidebar-menu .vsm-dropdown > .vsm-list {}
.v-sidebar-menu .vsm-item {}
.v-sidebar-menu .vsm-item.first-item {}
.v-sidebar-menu .vsm-item.mobile-item {}
.v-sidebar-menu .vsm-item.open-item {}
.v-sidebar-menu .vsm-item.active-item {}
.v-sidebar-menu .vsm-item.parent-active-item {}
.v-sidebar-menu .vsm-link {}
.v-sidebar-menu .vsm-title {}
.v-sidebar-menu .vsm-icon {}
.v-sidebar-menu .vsm-arrow {}
.v-sidebar-menu .vsm-arrow.open-arrow {}
.v-sidebar-menu .vsm-mobile-bg {}
```

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

## Development

```
npm install
npm run dev
```
