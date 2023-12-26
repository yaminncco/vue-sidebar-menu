<template>
  <div>
    <h2>Styling</h2>
    <p>
      All styles customization can be done in normal CSS by using this classes
    </p>
    <prism-code lang="css">
      {{
        `.v-sidebar-menu {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link_active {}
.v-sidebar-menu .vsm--link_hover {}
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
.v-sidebar-menu .vsm--toggle-btn {}`
      }}
    </prism-code>

    <h2>Theming</h2>
    <p>
      You can create your own theme with SCSS or, you can edit the locally
      scoped CSS variables.
    </p>
    <p>
      <b>Sass variables:</b> (complete list of all variables can be found in
      `src/scss/_variables.scss`)
    </p>
    <prism-code lang="scss">
      {{
        `// Your variable overrides here.
$primary-color: red;
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";`
      }}
    </prism-code>

    <p><b>CSS variables:</b></p>

    <prism-code lang="css">
      {{
        `.v-sidebar-menu {
      --vsm-primary-color: #4285f4;
      --vsm-base-bg: #2a2a2e;
      --vsm-item-color: #fff;
      --vsm-item-active-color:;
      --vsm-item-active-bg:;
      --vsm-item-active-line-color: var(--vsm-primary-color);
      --vsm-item-open-color: #fff;
      --vsm-item-hover-color:;
      --vsm-item-open-bg: var(--vsm-primary-color);
      --vsm-item-hover-bg: rgba(30, 30, 33, 0.5);
      --vsm-icon-color: var(--vsm-item-color);
      --vsm-icon-bg: #1e1e21;
      --vsm-icon-active-color:;
      --vsm-icon-active-bg:;
      --vsm-icon-open-color:;
      --vsm-icon-open-bg:;
      --vsm-mobile-item-color: #fff;
      --vsm-mobile-item-bg: var(--vsm-primary-color);
      --vsm-mobile-icon-color: var(--vsm-mobile-item-color);
      --vsm-mobile-icon-bg: transparent;
      --vsm-dropdown-bg: #36363b;
      --vsm-header-item-color: rgba(255, 255, 255, 0.7);
      --vsm-toggle-btn-color: #fff;
      --vsm-toggle-btn-bg: #1e1e21;
      --vsm-item-font-size: 16px;
      --vsm-item-line-height: 35px;
      --vsm-item-padding: 10px 15px;
      --vsm-icon-height: 35px;
      --vsm-icon-width: 35px;
    }`
      }}
    </prism-code>
  </div>
</template>

<script>
export default {
  name: 'DocsStyling',
}
</script>
