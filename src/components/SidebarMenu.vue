<template>
  <div class="v-sidebar-menu" :class="[!isCollapsed ? 'vsm-default' : 'vsm-collapsed']" :style="{'max-width': sidebarWidth}" @mouseleave="mouseLeave">
    <div class="vsm-list" :style="[{'height' : '100%'}, {'overflow' : 'hidden auto'}]">
      <item v-for="(item, index) in menu" :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
    </div>
    <div v-if="isCollapsed" :style="[{'position' : 'absolute'}, {'top' : `${mobileItemPos}px`}, {'left' : '0px'}, {'padding-left' : sidebarWidth}, {'width' : width}]">
      <mobile-item :item="mobileItem" />
      <transition name="slide-animation">
        <div class="vsm-mobile-bg" v-if="mobileItem" :style="[{'position' : 'absolute'}, {'left' : '0px'}, {'right' : '0px'}, {'top' : '0px'}, {'height' : `${mobileItemHeight}px`}]"></div>
      </transition>
      <div class="vsm-dropdown" :style="[{'position' : 'absolute'}, {'top' : `${mobileItemHeight}px`}, {'left' : sidebarWidth}, {'right' : '0px'}, {'max-height' : `calc(100vh - ${mobileItemPos + mobileItemHeight}px)`}, {'overflow-y' : 'auto'}]">
        <transition name="show-animation">
          <div class="vsm-list" v-if="mobileItem && mobileItem.child">
            <sub-item v-for="(subItem, index) in mobileItem.child" :item="subItem" :key="index"/>
          </div>
        </transition>
      </div>
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
    },
    width: {
      type: String,
      default: '350px'
    },
    widthCollapsed: {
      type: String,
      default: '50px'
    }
  },
  data() {
    return {
      sidebarWidth: this.collapsed ? this.widthCollapsed : this.width,
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0
    }
  },
  created() {
    this.$on('mouseEnterItem', (val) => {
      this.mobileItem = val.item
      this.mobileItemPos = val.pos
      this.mobileItemHeight = val.height
    })
  },
  methods: {
    mouseLeave() {
      this.mobileItem = null
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
      this.sidebarWidth = this.isCollapsed ? this.widthCollapsed : this.width
      this.$emit('collapse', this.isCollapsed)
    }
  },
}
</script>


<style lang="scss">
@import '../styles/main.scss';
</style>
