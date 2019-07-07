<template>
  <div>
    <h2>Styling</h2>
    <p>All styles customization can be done in normal CSS by using this classes</p>
    <pre>.v-sidebar-menu {}
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
.v-sidebar-menu .vsm-badge {}
</pre>
    <p>or you can override Sass variables and create your own theme</p>
    <pre>/*app.scss*/
@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";
</pre>
    <h3>Customize Icons</h3>
    <p>The component use 'Font Awesome 5 Free' as default for the icons, but you can customize them using slots</p>
    <h2>Slots</h2>
    <pre>
&lt;sidebar-menu&gt;
    &lt;span slot="collapse-icon"&gt;collapse-icon&lt;/span&gt;
    &lt;span slot="dropdown-icon"&gt;dropdown-icon&lt;/span&gt;
&lt;/sidebar-menu&gt;
</pre>
  </div>
</template>
