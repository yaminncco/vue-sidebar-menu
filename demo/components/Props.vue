<template>
  <div>
    <h2>Props</h2>
    <pre>props: {
    menu: {
        type: Array,
        required: true
    },
    collapsed: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: '350px'
    },
    widthCollapsed: {
        type: String,
        default: '50px'
    },
    showChild: {
        type: Boolean,
        default: false
    },
    theme: { // available themes: 'white-theme'
        type: String,
        default: ''
    },
    showOneChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    }
}
</pre>
  </div>
</template>
