<template>
  <div
    id="demo"
    :class="[{'collapsed' : collapsed}]"
  >
    <div class="demo">
      <div class="container">
        <h1>
          vue-sidebar-menu
          <a
            style="color: #000;text-transform: uppercase;font-size: 14px;font-weight: 400;"
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
            >
              {{ theme == '' ? 'default-theme' : theme }}
            </option>
          </select>
        </div>
        <hr style="margin: 50px 0px;border: 1px solid #e3e3e3;">
        <router-view />
      </div>
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :theme="selectedTheme"
        :show-one-child="true"
        @collapse="onCollapse"
        @item-click="onItemClick"
      />
    </div>
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}

export default {
  name: 'App',
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Getting Started'
        },
        {
          href: '/',
          title: 'Installation',
          icon: 'fa fa-download'
        },
        {
          href: '/basic-usage',
          title: 'Basic Usage',
          icon: 'fa fa-code'
        },
        {
          header: true,
          title: 'Usage'
        },
        {
          href: '/props',
          title: 'Props',
          icon: 'fa fa-cogs'
        },
        {
          href: '/events',
          title: 'Events',
          icon: 'fa fa-bell'
        },
        {
          href: '/styling',
          title: 'Styling',
          icon: 'fa fa-palette'
        },
        {
          header: true,
          component: separator,
          visibleOnCollapse: true
        },
        {
          header: true,
          title: 'Example'
        },
        {
          href: '/disabled',
          title: 'Disabled page',
          icon: 'fa fa-lock',
          disabled: true
        },
        {
          title: 'Badge',
          icon: 'fa fa-cog',
          badge: {
            text: 'new',
            class: 'default-badge'
          }
        },
        {
          href: '/page',
          title: 'Dropdown Page',
          icon: 'fa fa-list-ul',
          child: [
            {
              href: '/page/sub-page-1',
              title: 'Sub Page 01',
              icon: 'fa fa-file-alt'
            },
            {
              href: '/page/sub-page-2',
              title: 'Sub Page 02',
              icon: 'fa fa-file-alt'
            }
          ]
        },
        {
          title: 'Multiple Level',
          icon: 'fa fa-list-alt',
          child: [
            {
              title: 'page'
            },
            {
              title: 'Level 2 ',
              child: [
                {
                  title: 'page'
                },
                {
                  title: 'Page'
                }
              ]
            },
            {
              title: 'Page'
            },
            {
              title: 'Another Level 2',
              child: [
                {
                  title: 'Level 3',
                  child: [
                    {
                      title: 'Page'
                    },
                    {
                      title: 'Page'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      collapsed: false,
      themes: ['', 'white-theme'],
      selectedTheme: 'white-theme'
    }
  },
  methods: {
    onCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    onItemClick (event, item) {
      console.log('onItemClick')
      // console.log(event)
      // console.log(item)
    }
  }
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
  background-color: #f2f4f7;
}

#demo {
  padding-left: 350px;
}
#demo.collapsed {
  padding-left: 50px;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 600px;
}

pre {
  color: #2a2a2e;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  overflow: auto;
}
</style>
