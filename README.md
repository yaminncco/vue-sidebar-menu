# vue-sidebar-menu

A Vue.js Sidebar Menu Component

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

## Installation

```
npm i vue-sidebar-menu --save
```

Install the plugin globally.

```js
//main.js
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
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

from v3.0.0 you will need to import the style file in your project.

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

### Item Property

```js
menu [
    // item
    {
        href: '/',
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
        // alias: '/path'
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
        // hidden: false
        // hiddenOnCollapse: true
    }
]
```

### Vue-router Support

if you are using vue-router, the component will use `<router-link>` instead of hyperlink `<a>`

### Props

```js
props: {
    // Sidebar menu
    menu: {
      type: Array,
      required: true
    },

    // Collapse/uncollapse Sidebar
    collapsed: {
      type: Boolean,
      default: false
    },

    // Sidebar width
    width: {
      type: String,
      default: '350px'
    },

    // Sdebar width on collapse
    widthCollapsed: {
      type: String,
      default: '50px'
    },

    // Keep all child open
    showChild: {
      type: Boolean,
      default: false
    },

    // Sidebar theme (available themes: 'white-theme')
    theme: {
      type: String,
      default: ''
    },

    // Keep only one child opened at a time (first level only)
    showOneChild: {
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

    // Hide toggle btn
    hideToggle: {
      type: Boolean,
      default: false
    }
}
```

### Events

```html
<sidebar-menu @collapse="onCollapse" @item-click="onItemClick" />
...
methods: {
    onCollapse(collapsed) {},
    onItemClick(event, item) {}
}
...
```

__@collapse(collapsed)__ Trigger on btn-collapse click

__@item-click(event, item)__ Trigger on item click

### Styles

All styles customization can be done in normal CSS by using this classes

```css
.v-sidebar-menu {}
.v-sidebar-menu.vsm_default {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu .vsm--item.vsm--item_open {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link.vsm--link_active {}
.v-sidebar-menu .vsm--link.vsm--link_exact-active {}
.v-sidebar-menu .vsm--link.vsm--link_mobile-item {}
.v-sidebar-menu .vsm--link.vsm--link_level-n {}
.v-sidebar-menu .vsm--link.vsm--link_disabled {}
.v-sidebar-menu .vsm--title {}
.v-sidebar-menu .vsm--icon {}
.v-sidebar-menu .vsm--arrow {}
.v-sidebar-menu .vsm--arrow.vsm--arrow_open {}
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--list {}
.v-sidebar-menu .vsm--dropdown>.vsm--list {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
```

or you can override Sass variables and create your own theme

```css
/*app.scss*/
@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
```

### Customize Icons

The component use `Font Awesome 5 Free` as default for the icons, but you can customize them using slots

## Slots

```html
<sidebar-menu>
    <div slot="header">header</div>
    <div slot="footer">footer</div>
    <span slot="collapse-icon">collapse-icon</span>
    <span slot="dropdown-icon">dropdown-icon</span>
</sidebar-menu>
```

## Development

```
npm install
npm run dev
```
