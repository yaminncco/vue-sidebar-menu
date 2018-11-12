<template>
  <div>
    <template v-if="isCollapsed">
      <li></li>
    </template>
    <template v-else>
      <li class="nav-heading">
        {{ name }}
      </li>
    </template>
  </div>
</template>

<script>
import Item from './Item.vue'
import {itemMixin} from '../mixin'
import MobileItem from './MobileItem.vue'
import SidebarMenu from './SidebarMenu.vue'


export default {
  props: {
    name: {
      type: String,
      default: 'Cooked'
    },
    isCollapsed: {
      type: Boolean
    }
  },
  components: {
        Item,
        MobileItem
  },
  data() {
  }
}
</script>