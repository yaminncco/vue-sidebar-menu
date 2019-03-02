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
                        // component: componentName
                        // visibleOnCollapse: true
                    },
                    { // item
                        href: '/',
                        title: 'Dashboard',
                        icon: 'fa fa-user',
                        // disabled: true
                        /*
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
                    },
                    { // item with child
                        href: '/charts',
                        title: 'Charts',
                        icon: 'fa fa-chart-area',
                        child: [
                            {
                                href: '/charts/sublink',
                                title: 'Sub Link',
                            }
                        ]
                    },
                    { ... },
                    { ... }
                ]
            }
        }
    }
&lt;/script&gt;
</pre>
  </div>
</template>
