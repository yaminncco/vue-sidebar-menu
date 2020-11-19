# vue-sidebar-menu (for Vue 3)

A Vue.js sidebar menu component with vue-router compatibility

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

## Changelog

- router-link now is the default link component (without vue-router use `linkComponentName` prop)
- updated the active behavior to match vue-router and removed exact-active class
- removed `alias`, `exactPath` property
- added new prop `linkComponentName` for a customized link
- changed `width` prop default value from '350px' to '290px'
- changed `widthCollapsed` prop default value  from '50px' to '65px'
- `collapsed` prop can be sync using v-model
- removed `toggle-collapse` event (listen to `update:collapsed` instead)
- removed the node parameter from `item-click` event
- `dropdown-icon` slot no longer rotate when open
- add new `isOpen` slot prop for the dropdwon-icon
- changed the default `toggle-btn-icon` icon
- dropdown css selector is now `vsm--dropdown` instead of `vsm--dropdown>.vsm--list`
- the open modifier class apply to link instead of item

## Installation

```
npm i vue-sidebar-menu --save
```

Install the plugin globally.

```js
//main.js
import { createApp } from 'vue'
import App from "./App.vue"
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

const app = createApp(App)
app.use(VueSidebarMenu)
app.mount("#app")
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

## Basic Usage

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
            hiddenOnCollapse: true
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user'
          },
          {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link'
              }
            ]
          }
        ]
      }
    }
  }
</script>
```

### Item Properties

```js
menu [
  // item
  {
    href: '/',
    /* with vue-router you can use :to prop
    href: { path: '/' }
    you can mark link as external
    // external: true
    */
      
    title: 'Dashboard',

    // icon class
    icon: 'fa fa-user'
    /* or custom icon
    icon: {
        element: 'span',
        class: 'fa fa-user',
        // attributes: {}
        // text: ''
    }
    */

    /*
    badge: {
        text: 'new',
        class: 'vsm--badge_default'
        // attributes: {}
        // element: 'span'
    }
    */
      
    // child: []
    // disabled: true
    // class: ''
    // attributes: {}
    // hidden: false
    // hiddenOnCollapse: true
  },

  // header item
  {
    header: true,
    title: 'Main Navigation'
    // hidden: false
    // hiddenOnCollapse: true
    // class: ''
    // attributes: {}
  },

  // component item
  {
    component: componentName
    // props: componentProps
    // hidden: false
    // hiddenOnCollapse: true
  }
]
```

### Props

```js
props: {
  // Sidebar menu (required)
  menu: {
    type: Array,
    required: true
  },

  // Sidebar Collapse state
  collapsed: {
    type: Boolean,
    default: false
  },

  // Sidebar width (expanded)
  width: {
    type: String,
    default: '290px'
  },

  // Sidebar width (collapsed)
  widthCollapsed: {
    type: String,
    default: '65px'
  },

  // Keep only one child opened at a time (first level only)
  showOneChild: {
    type: Boolean,
    default: false
  },

  // Keep all child open
  showChild: {
    type: Boolean,
    default: false
  },

  // Sidebar right to left
  rtl: {
    type: Boolean,
    default: false
  },

  // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
  relative: {
    type: Boolean,
    default: false
  },

  // Hide toggle collapse btn
  hideToggle: {
    type: Boolean,
    default: false
  },

  // Sidebar theme (available themes: 'white-theme')
  theme: {
    type: String,
    default: ''
  },

  // Disable hover on collapse mode
  disableHover: {
    type: Boolean,
    default: false
  },

  // Sidebar link component name
  linkComponentName: {
    type: String,
    default: 'SidebarMenuLink'
  }
}
```

### Events

```html
<sidebar-menu @update:collapsed="onToggleCollapse" @item-click="onItemClick" />
...
methods: {
  onToggleCollapse(collapsed) {},
  onItemClick(event, item) {}
}
...
```

__@update:collapsed(collapsed)__ Trigger on toggle btn click

__@item-click(event, item)__ Trigger on item link click

### Styles

All styles customization can be done in normal CSS by using this classes

```css
.v-sidebar-menu {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link_active {}
.v-sidebar-menu .vsm--link_open {}
.v-sidebar-menu .vsm--link_mobile {}
.v-sidebar-menu .vsm--link_level-[n] {}
.v-sidebar-menu .vsm--link_disabled {}
.v-sidebar-menu .vsm--title {}
.v-sidebar-menu .vsm--icon {}
.v-sidebar-menu .vsm--arrow {}
.v-sidebar-menu .vsm--arrow_open {}
.v-sidebar-menu .vsm--arrow_default {}
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--badge_default {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--dropdown {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
.v-sidebar-menu .vsm--toggle-btn_default {}
```

or you can override Sass variables (complete list of all variables can be found in `src/scss/_variables.scss`) and create your own theme

```scss
@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
```

### Customize Toggle & Dropdown Icons

The component use `Font Awesome 5 Free` as the default icons, but you can either customize them using slots or by overriding css style

## Slots

```html
<sidebar-menu>
  <template v-slot:header>header</template>
  <template v-slot:footer>footer</template>
  <template v-slot:toggle-icon>toggle-icon</template>
  <template v-slot:dropdown-icon="{ isOpen }">
    <span v-if="!isOpen">+</span>
    <span v-else>-</span>
  </template>
</sidebar-menu>
```

## Development

```
npm install
npm run dev
```
