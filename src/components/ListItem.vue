<template>
  <div class="vsm-list">
    <item
      v-for="(subItem, index) in items"
      :key="index"
      :item="subItem"
    >
      <slot
        slot="dropdown-icon"
        name="dropdown-icon"
      />
    </item>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  components: {
    Item
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  beforeCreate () {
    this.$options.components.Item = require('./Item.vue').default
  }
}
</script>
