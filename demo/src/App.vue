<template>
  <sidebar-menu
    v-model:collapsed="collapsed"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />
  <div
    v-if="isOnMobile && !collapsed"
    class="sidebar-overlay"
    @click="collapsed = true"
  />
  <div id="demo" :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]">
    <div class="demo">
      <div class="container">
        <h1>
          vue-sidebar-menu
          <a
            style="
              color: #000;
              text-transform: uppercase;
              font-size: 14px;
              font-weight: 400;
            "
            href="https://github.com/yaminncco/vue-sidebar-menu"
          >
            Github
          </a>
        </h1>
        <p>A vue.js sidebar menu component</p>
        <div>
          Select theme:
          <select v-model="selectedTheme">
            <option
              v-for="(theme, index) in themes"
              :key="index"
              :value="theme.input"
            >
              {{ theme.name }}
            </option>
          </select>
        </div>
        <hr style="margin: 50px 0px; border: 1px solid #e3e3e3" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { h, markRaw } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">',
}

const faIcon = (props) => {
  return {
    element: markRaw({
      render: () => h('div', [h(FontAwesomeIcon, { size: 'lg', ...props })]),
    }),
  }
}

export default {
  name: 'App',
  data() {
    return {
      menu: [
        {
          header: 'Getting Started',
          hiddenOnCollapse: true,
        },
        {
          href: '/',
          title: 'Installation',
          icon: faIcon({ icon: 'fa-solid fa-download' }),
        },
        {
          href: '/basic-usage',
          title: 'Basic Usage',
          icon: faIcon({ icon: 'fa-solid fa-code' }),
        },
        {
          header: 'Usage',
          hiddenOnCollapse: true,
        },
        {
          href: '/props',
          title: 'Props',
          icon: faIcon({ icon: 'fa-solid fa-cogs' }),
        },
        {
          href: '/events',
          title: 'Events',
          icon: faIcon({ icon: 'fa-solid fa-bell' }),
        },
        {
          href: '/styling',
          title: 'Styling',
          icon: faIcon({ icon: 'fa-solid fa-palette' }),
        },
        {
          component: markRaw(separator),
        },
        {
          header: 'Example',
          hiddenOnCollapse: true,
        },
        {
          href: '/disabled',
          title: 'Disabled page',
          icon: faIcon({ icon: 'fa-solid fa-lock' }),
          disabled: true,
        },
        {
          title: 'Badge',
          icon: faIcon({ icon: 'fa-solid fa-cog' }),
          badge: {
            text: 'new',
            class: 'vsm--badge_default',
          },
        },
        {
          href: '/page',
          title: 'Dropdown Page',
          icon: faIcon({ icon: 'fa-solid fa-list-ul' }),
          child: [
            {
              href: '/page/sub-page-1',
              title: 'Sub Page 01',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' }),
            },
            {
              href: '/page/sub-page-2',
              title: 'Sub Page 02',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' }),
            },
          ],
        },
        {
          title: 'Multiple Level',
          icon: faIcon({ icon: 'fa-solid fa-list-alt' }),
          child: [
            {
              title: 'page',
            },
            {
              title: 'Level 2 ',
              child: [
                {
                  title: 'page',
                },
                {
                  title: 'Page',
                },
              ],
            },
            {
              title: 'Page',
            },
            {
              title: 'Another Level 2',
              child: [
                {
                  title: 'Level 3',
                  child: [
                    {
                      title: 'Page',
                    },
                    {
                      title: 'Page',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      collapsed: false,
      themes: [
        {
          name: 'Default theme',
          input: '',
        },
        {
          name: 'White theme',
          input: 'white-theme',
        },
      ],
      selectedTheme: 'white-theme',
      isOnMobile: false,
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log('onToggleCollapse')
    },
    onItemClick(event, item) {
      console.log('onItemClick')
      // console.log(event)
      // console.log(item)
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#demo {
  padding-left: 290px;
  transition: 0.3s ease;
}
#demo.collapsed {
  padding-left: 65px;
}
#demo.onmobile {
  padding-left: 65px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 900px;
}
</style>
