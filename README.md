# vue-sidebar-menu (for Vue 3)

A Vue.js sidebar menu component with vue-router compatibility

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

### :warning: This documentation is for Vue 3, for Vue 2 [click here](https://github.com/yaminncco/vue-sidebar-menu/tree/master)

## What new in v5.0.0

- Vue 3 support
- Improved the sidebar design
- Added custom scrollbar
- Improved the sidebar accessibility
- Custom link support

## Installation

```
npm i vue-sidebar-menu@next --save
```

Install the plugin globally.

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
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
            header: 'Main Navigation',
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
    // string or a location object
    href: '/',
    // href: { path: '/' }

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

    /* with vue-router */
    // external: true
    // exact: true // apply active class when current route is exactly the same. (based on route records, query & hash are not relevant)
  },

  // header item
  {
    header: 'Main Navigation'
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

## Props

```js
props: {
  // Sidebar menu (required)
  menu: {
    type: Array,
    required: true
  },

  // Sidebar Collapse state (v-model:collapsed to enable two-way data binding)
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

  // The name of the custom link component (must be registered globally and define item as a prop)
  linkComponentName: {
    type: String,
    default: undefined
  }
}
```

## Events

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

## Styles

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
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--badge_default {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--dropdown {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
```

or you can override Sass variables (complete list of all variables can be found in `src/scss/_variables.scss`) and create your own theme

```scss
@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
```

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

## Customize link

by default the component use a customized version of `<router-link>`, if your are using a 3rd party framework you can customize the link via the use of the `link-component-name` prop.

the link component must be registered globally and define item as a prop.

example with inertia.js:

```js
import { createApp, h } from 'vue'
import link from '@inertiajs/inertia-vue3/src/link'

const customLink = {
  name: 'CustomLink',
  props: ['item'],
  render() {
    return h(link, this.$slots.default)
  },
  watch: {
    '$page.url' () {
      this.onRouteChange()
    }
  },
  inject: ['onRouteChange']
}

const app = createApp(App)
app.component('custom-link', customLink)
```
```html
<sidebar-menu :link-component-name="'custom-link'">
```

Note: the `onRouteChange` function can be injected useful for updating the active state whenever the url change.
