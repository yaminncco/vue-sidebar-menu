<template>
  <div>
    <h2>Styling</h2>
    <p>All styles customization can be done in normal CSS by using this classes</p>
    <prism-code lang="css">
      {{ `.v-sidebar-menu {}
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
.v-sidebar-menu .vsm--toggle-btn {}` }}
    </prism-code>
    <p>or you can override Sass variables (complete list of all variables can be found in `src/scss/_variables.scss`) and create your own theme</p>
    <prism-code lang="css">
      {{ `@import "custom-var.scss";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";` }}
    </prism-code>
    <h2>Slots</h2>
    <prism-code lang="html">
      {{ `&lt;sidebar-menu>
  &lt;template v-slot:header>header&lt;/template>
  &lt;template v-slot:footer>footer&lt;/template>
  &lt;template v-slot:toggle-icon>toggle-icon&lt;/template>
  &lt;template v-slot:dropdown-icon="{ isOpen }">
    &lt;span v-if="!isOpen">+&lt;/span>
    &lt;span v-else>-&lt;/span>
  &lt;/template>
&lt;/sidebar-menu>` }}
    </prism-code>
  </div>
</template>
