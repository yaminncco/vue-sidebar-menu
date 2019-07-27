<template>
  <div class="vsm--list">
    <item
      v-for="(subItem, index) in items"
      :key="index"
      :item="subItem"
      :level="level"
      :show-child="showChild"
      :rtl="rtl"
      :is-collapsed="isCollapsed"
    >
      <slot
        slot="dropdown-icon"
        name="dropdown-icon"
      />
    </item>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    level: {
      type: Number,
      default: 2
    },
    showChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    isCollapsed: {
      type: Boolean
    }
  },
  beforeCreate () {
    this.$options.components.Item = require('./Item.vue').default
  }
}
</script>
