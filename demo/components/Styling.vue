<template>
  <div>
    <h2>Styling</h2>
    <p>All styles customization can be done in normal CSS by using this classes</p>
    <pre>.v-sidebar-menu {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu .vsm--item.vsm--item_open {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link.vsm--link_active {}
.v-sidebar-menu .vsm--link.vsm--link_exact-active {}
.v-sidebar-menu .vsm--link.vsm--link_mobile-item {}
.v-sidebar-menu .vsm--link.vsm--link_level-[n] {}
.v-sidebar-menu .vsm--link.vsm--link_disabled {}
.v-sidebar-menu .vsm--title {}
.v-sidebar-menu .vsm--icon {}
.v-sidebar-menu .vsm--arrow {}
.v-sidebar-menu .vsm--arrow.vsm--arrow_open {}
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--list {}
.v-sidebar-menu .vsm--dropdown>.vsm--list {}
.v-sidebar-menu .vsm--mobile-item {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
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
    &lt;span slot="header"&gt;header&lt;/span&gt;
    &lt;span slot="footer"&gt;footer&lt;/span&gt;
    &lt;span slot="toggle-icon"&gt;toggle-icon&lt;/span&gt;
    &lt;span slot="dropdown-icon"&gt;dropdown-icon&lt;/span&gt;
&lt;/sidebar-menu&gt;
</pre>
  </div>
</template>
