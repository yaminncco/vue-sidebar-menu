<template>
  <div>
    <h2>Props</h2>
    <pre>props: {
    // Sidebar menu
    menu: {
      type: Array,
      required: true
    },

    // Sidebar Collapse state
    collapsed: {
      type: Boolean,
      default: false
    },

    // Sidebar width
    width: {
      type: String,
      default: '350px'
    },

    // Sidebar width on collapse
    widthCollapsed: {
      type: String,
      default: '50px'
    },

    // Keep all child open
    showChild: {
      type: Boolean,
      default: false
    },

    // Sidebar theme (available themes: 'white-theme')
    theme: {
      type: String,
      default: ''
    },

    // Keep only one child opened at a time (first level only)
    showOneChild: {
      type: Boolean,
      default: false
    },

    // Sidebar right to left
    rtl: {
      type: Boolean,
      default: false
    },

    // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
    relative: {
      type: Boolean,
      default: false
    },

    // Hide toggle btn
    hideToggle: {
      type: Boolean,
      default: false
    }
}
</pre>
  </div>
</template>
