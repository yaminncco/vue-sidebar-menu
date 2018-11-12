<template>
  <div id="demo" :class="{'collapsed' : collapsed}">
    <sidebar-menu :menu="menu" :collapsed="collapsed" @collapse="onCollapse" />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      menu: [
        {
          name: 'Admin',
          href: '/',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          href: '/charts',
          title: 'Charts',
          icon: 'fa fa-chart-area'
        },
        {
          name: 'Cock',
          href: '/tables',
          title: 'Tables',
          icon: 'fa fa-table'
        },
        {
          title: 'Pages',
          icon: 'fa fa-file',
          child: [
            {
              href: '/auth/login',
              title: 'Login Page',
              icon: 'fa fa-lock',
            },
            {
              href: '/auth/registration',
              title: 'Registration Page',
              icon: 'fa fa-lock'
            },
            {
              href: '#',
              title: '404 Page',
              icon: 'fa fa-lock'
            },
          ]
        },
        {
          href: '#',
          title: 'Mailbox',
          icon: 'fa fa-envelope'
        },
        {
          title: 'Multiple Level',
          icon: 'fa fa-list-alt',
          child: [
            {
              href: '#',
              title: 'Page 01',
            },
            {
              title: 'Page 02',
              child: [
                {
                  href: '#',
                  title: 'Page 04',
                },
                {
                  href: '#',
                  title: 'Page 05',
                }
              ]
            },
            {
              href: '#',
              title: 'Page 03'
            },
            {
              title: 'Level 2',
              child: [
                {
                  href: '#',
                  title: 'Level 3',
                  child: [
                    {
                      href: '#',
                      title: 'Page',
                    },
                    {
                      href: '#',
                      title: 'Page',
                    }
                  ]
                },
              ]
            },
          ]
        },
      ],
      collapsed: false
    }
  },
  methods: {
    onCollapse(val) {
      console.log(`collapsed ${val}`)
      this.collapsed = val
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#demo {
  padding-left: 350px;
}
#demo.collapsed {
  padding-left: 50px;
}
</style>
