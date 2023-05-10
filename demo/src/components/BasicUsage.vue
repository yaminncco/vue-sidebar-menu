<template>
  <div>
    <h2>Basic Usage</h2>
    <prism-code lang="html">
      {{
        `&lt;template>
  &lt;sidebar-menu :menu="menu" />
&lt;/template>

&lt;script>
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
&lt;/script>`
      }}
    </prism-code>
    <h3>Item Properties</h3>
    <prism-code lang="js">
      {{
        `menu [
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
]`
      }}
    </prism-code>
  </div>
</template>
