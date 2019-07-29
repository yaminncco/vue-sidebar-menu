<template>
  <div>
    <h2>Basic Usage</h2>
    <pre>&lt;template&gt;
  &lt;sidebar-menu :menu="menu" /&gt;
&lt;/template&gt;

&lt;script&gt;
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
&lt;/script&gt;
</pre>
    <h3>Item Properties</h3>
    <pre>...
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
...
</pre>
  </div>
</template>
