<template>
  <div id="sidebar-menu" :class="{'collapsed' : isCollapsed}" @mouseleave="mouseLeave">
    <ul class="default-list menu-list">
      <item v-for="(item, index) in menu" :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
    </ul>
    <ul v-if="isCollapsed" class="mobile-list menu-list" :style="{'top' : `${mobileItemPos}px`}">
      <mobile-item :item="mobileItem" :mobileItemPos="mobileItemPos" />
    </ul>
    <button class="aside-toggle-btn" @click="toggleCollapse"></button>
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
  props: ["menu"],
  data() {
    return {
      isCollapsed: false,
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
      this.$emit('toggleCollapse')
    }
  },
}
</script>


<style lang="scss">
@import 'src/styles/main.scss';
</style>
