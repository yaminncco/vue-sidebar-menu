<template>
  <div id="sidebar-menu" class="v-sidebar-menu" :class="{'collapsed' : isCollapsed}" @mouseleave="mouseLeave">
    <div class="vsm-list">
      <item v-for="(item, index) in menu" :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
    </div>
    <div v-if="isCollapsed" class="mobile-list menu-list" :style="{'top' : `${mobileItemPos}px`}">
      <mobile-item :item="mobileItem" :mobileItemPos="mobileItemPos" />
    </div>
    <button class="collapse-btn" @click="toggleCollapse"></button>
  </div>
</template>

<script>
import Item from './Item.vue'
import SubItem from './SubItem.vue'
import MobileItem from './MobileItem.vue'

export default {
  name: 'SidebarMenu',
  components: {
    Item,
    SubItem,
    MobileItem
  },
  props: {
    menu: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0
    }
  },
  created() {
    this.$on('mouseEnterItem', (val) => {
      this.mobileItem = val.item
      this.mobileItemPos = val.pos
    })
  },
  methods: {
    mouseLeave() {
      this.mobileItem = null
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      this.$emit('collapse', this.isCollapsed)
    }
  },
}
</script>


<style lang="scss">
@import '../styles/main.scss';
</style>
