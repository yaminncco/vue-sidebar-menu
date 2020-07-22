<template>
  <div
    class="v-sidebar-menu"
    :class="sidebarClass"
    :style="[{'max-width': sidebarWidth}]"
    @mouseleave="onMouseLeave"
  >
    <slot name="header" />
    <div
      class="vsm--scroll-wrapper"
      :style="isCollapsed && [rtl ? {'margin-left': '-17px'} : {'margin-right': '-17px'}]"
    >
      <div
        class="vsm--list"
        :style="isCollapsed && {'width': widthCollapsed}"
      >
        <sidebar-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :item="item"
          :is-collapsed="isCollapsed"
          :active-show="activeShow"
          :show-one-child="showOneChild"
          :show-child="showChild"
          :rtl="rtl"
          :mobile-item="mobileItem"
          :disable-hover="disableHover"
          @set-mobile-item="setMobileItem"
          @unset-mobile-item="unsetMobileItem"
        >
          <slot
            slot="dropdown-icon"
            name="dropdown-icon"
          />
        </sidebar-menu-item>
      </div>
      <div
        v-if="isCollapsed"
        class="vsm--mobile-item"
        :style="mobileItemStyle.item"
      >
        <sidebar-menu-item
          v-if="mobileItem"
          :item="mobileItem"
          :is-mobile-item="true"
          :mobile-item-style="mobileItemStyle"
          :is-collapsed="isCollapsed"
          :show-child="showChild"
          :rtl="rtl"
        >
          <slot
            slot="dropdown-icon"
            name="dropdown-icon"
          />
        </sidebar-menu-item>
        <transition name="slide-animation">
          <div
            v-if="mobileItem"
            class="vsm--mobile-bg"
            :style="mobileItemStyle.background"
          />
        </transition>
      </div>
    </div>
    <slot name="footer" />
    <button
      v-if="!hideToggle"
      class="vsm--toggle-btn"
      :class="{'vsm--toggle-btn_slot' : $slots['toggle-icon']}"
      @click="onToggleClick"
    >
      <slot name="toggle-icon" />
    </button>
  </div>
</template>

<script>
import SidebarMenuItem from './SidebarMenuItem.vue'
import { animationMixin } from '../mixin'

export default {
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem
  },
  mixins: [animationMixin],
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
    },
    showChild: {
      type: Boolean,
      default: false
    },
    theme: {
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
    },
    relative: {
      type: Boolean,
      default: false
    },
    hideToggle: {
      type: Boolean,
      default: false
    },
    disableHover: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0,
      mobileItemTimeout: null,
      activeShow: null,
      parentHeight: '100vh',
      parentWidth: '100vw',
      parentOffsetTop: '0px',
      parentOffsetLeft: '0px'
    }
  },
  computed: {
    sidebarWidth () {
      return this.isCollapsed ? this.widthCollapsed : this.width
    },
    sidebarClass () {
      return [
        !this.isCollapsed ? 'vsm_expanded' : 'vsm_collapsed',
        this.theme ? `vsm_${this.theme}` : '',
        this.rtl ? 'vsm_rtl' : '',
        this.relative ? 'vsm_relative' : ''
      ]
    },
    mobileItemStyle () {
      return {
        item: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemPos}px` },
          this.rtl ? { 'right': '0px' } : { 'left': '0px' },
          this.rtl ? { 'padding-right': this.sidebarWidth } : { 'padding-left': this.sidebarWidth },
          this.rtl && { 'direction': 'rtl' },
          { 'z-index': 0 },
          { 'width': `calc(${this.parentWidth} - ${this.parentOffsetLeft})` },
          { 'max-width': this.width }
        ],
        dropdown: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemHeight}px` },
          { 'width': '100%'},
          { 'max-height': `calc(${this.parentHeight} - ${this.mobileItemPos + this.mobileItemHeight}px - ${this.parentOffsetTop})` },
          { 'overflow-y': 'auto' }
        ],
        background: [
          { 'position': 'absolute' },
          { 'top': '0px' },
          { 'left': '0px' },
          { 'right': '0px' },
          { 'height': `${this.mobileItemHeight}px` },
          { 'z-index': -1 }
        ]
      }
    }
  },
  watch: {
    collapsed (val) {
      if (this.isCollapsed === this.collapsed) return
      this.isCollapsed = val
      this.unsetMobileItem()
      if (this.isCollapsed) {
        this.$nextTick(() => {
          this.initParentOffsets()
        })
      }
    }
  },
  mounted () {
    if (!this.isCollapsed) return
    this.initParentOffsets()
  },
  methods: {
    onMouseLeave () {
      this.unsetMobileItem()
    },
    onToggleClick () {
      this.isCollapsed = !this.isCollapsed
      this.unsetMobileItem()
      if (this.isCollapsed) {
        this.$nextTick(() => {
          this.initParentOffsets()
        })
      }
      this.$emit('toggle-collapse', this.isCollapsed)
    },
    onActiveShow (item) {
      this.activeShow = item
    },
    onItemClick (event, item, node) {
      this.$emit('item-click', event, item, node)
    },
    setMobileItem ({ item, itemEl }) {
      if (this.mobileItem === item) return
      let sidebarTop = this.$el.getBoundingClientRect().top
      let itemTop = itemEl.getBoundingClientRect().top
      let itemLinkEl = itemEl.children[0]

      let styles = window.getComputedStyle(itemEl)
      let paddingTop = parseFloat(styles.paddingTop)
      let marginTop = parseFloat(styles.marginTop)
      
      let height = itemLinkEl.offsetHeight
      let positionTop = itemTop - sidebarTop + paddingTop + marginTop

      this.unsetMobileItem()
      this.$nextTick(() => {
        this.mobileItem = item
        this.mobileItemPos = positionTop
        this.mobileItemHeight = height
      })
    },
    unsetMobileItem (delay) {
      if (!delay) {
        this.mobileItem = null
        return
      }
      if (this.mobileItemTimeout) clearTimeout(this.mobileItemTimeout)
      this.mobileItemTimeout = setTimeout(() => {
        this.mobileItem = null
      }, 600)
    },
    initParentOffsets () {
      let sidebarTop = this.$el.getBoundingClientRect().top
      let sidebarLeft = this.$el.getBoundingClientRect().left
      let sidebarRight = this.$el.getBoundingClientRect().right
      if (this.relative) {
        let parent = this.$el.parentElement
        let parentTop = parent.getBoundingClientRect().top
        let parentLeft = parent.getBoundingClientRect().left
        this.parentHeight = `${parent.offsetHeight}px`
        this.parentWidth = `${parent.offsetWidth}px`
        this.parentOffsetTop = `${sidebarTop - parentTop}px`
        this.rtl ? this.parentOffsetLeft = `${parent.offsetWidth - sidebarRight + parentLeft}px` : this.parentOffsetLeft = `${sidebarLeft - parentLeft}px`
      } else {
        this.parentOffsetTop = `${sidebarTop}px`
        this.rtl ? this.parentOffsetLeft = `calc(${this.parentWidth} - ${sidebarRight}px)` : this.parentOffsetLeft = `${sidebarLeft}px`
      }
    },
    onItemUpdate (newItem, item) {
      if (item === this.mobileItem) {
        this.mobileItem = newItem
      }
      if (item === this.activeShow) {
        this.activeShow = newItem
      }
    }
  },
  provide () {
    return {
      emitActiveShow: this.onActiveShow,
      emitItemClick: this.onItemClick,
      emitItemUpdate: this.onItemUpdate
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
