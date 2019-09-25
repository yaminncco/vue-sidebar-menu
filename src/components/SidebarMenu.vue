<template>
  <div
    class="v-sidebar-menu"
    :class="[!isCollapsed ? 'vsm_expanded' : 'vsm_collapsed', theme ? `vsm_${theme}` : '', rtl ? 'vsm_rtl' : '']"
    :style="[relative ? {'position' : 'relative', 'height' : '100%'} : '', {'max-width': sidebarWidth}]"
    @mouseleave="onMouseLeave"
  >
    <slot name="header" />
    <div
      class="vsm--list"
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
        :mobile-item="true"
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
          :style="[{'position' : 'absolute'}, {'left' : '0px'}, {'right' : '0px'}, {'top' : '0px'}, {'height' : `${mobileItemHeight}px`}]"
        />
      </transition>
      <div
        class="vsm--dropdown"
        :style="mobileItemStyle.dropdown"
      >
        <transition
          name="expand"
          @enter="expandEnter"
          @afterEnter="expandAfterEnter"
          @beforeLeave="expandBeforeLeave"
        >
          <div class="vsm--list" v-if="mobileItem && mobileItem.child">
            <sidebar-menu-item
              v-for="(item, index) in mobileItem.child"
              :key="index"
              :item="item"
              :level="2"
              :show-child="showChild"
              :rtl="rtl"
              :is-collapsed="isCollapsed"
            >
              <slot
                slot="dropdown-icon"
                name="dropdown-icon"
              />
            </sidebar-menu-item>
          </div>
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
    mobileItemStyle () {
      return {
        item: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemPos}px` },
          this.rtl ? { 'right': '0px' } : { 'left': '0px' },
          { 'z-index': 30 },
          { 'width': `calc(${this.parentWidth} - ${this.parentOffsetLeft})` },
          { 'max-width': this.width }
        ],
        dropdown: [
          { 'position': 'absolute' },
          { 'top': `${this.mobileItemHeight}px` },
          { 'left': this.rtl ? '0px' : this.sidebarWidth },
          { 'right': this.rtl ? this.sidebarWidth : '0px' },
          { 'max-height': `calc(${this.parentHeight} - ${this.mobileItemPos + this.mobileItemHeight}px - ${this.parentOffsetTop})` },
          { 'overflow-y': 'auto' }
        ]
      }
    }
  },
  watch: {
    collapsed (val) {
      if (this.isCollapsed === this.collapsed) return
      this.isCollapsed = val
      this.unsetMobileItem()
    }
  },
  methods: {
    onMouseLeave () {
      this.unsetMobileItem()
    },
    onToggleClick () {
      this.unsetMobileItem()
      this.isCollapsed = !this.isCollapsed
      this.$emit('toggle-collapse', this.isCollapsed)
    },
    onActiveShow (item) {
      this.activeShow = item
    },
    onItemClick (event, item) {
      this.$emit('item-click', event, item)
    },
    setMobileItem ({ event, item }) {
      if (this.mobileItem === item) return
      let sidebarTop = this.$el.getBoundingClientRect().top
      let sidebarLeft = this.$el.getBoundingClientRect().left
      let sidebarRight = this.$el.getBoundingClientRect().right
      let styles = window.getComputedStyle(event.currentTarget)
      let paddingTop = parseFloat(styles.paddingTop)
      let paddingBottom = parseFloat(styles.paddingBottom)
      let height = event.currentTarget.offsetHeight - (paddingTop + paddingBottom)
      let pos = event.currentTarget.getBoundingClientRect().top - sidebarTop + paddingTop

      this.unsetMobileItem()
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
      this.$nextTick(() => {
        this.mobileItem = item
        this.mobileItemPos = pos
        this.mobileItemHeight = height
      })
    },
    unsetMobileItem (touchClick, hasChild) {
      if (!touchClick) {
        this.mobileItem = null
        return
      }
      clearTimeout(this.mobileItemTimeout)
      if (hasChild) return
      this.mobileItemTimeout = setTimeout(() => {
        this.mobileItem = null
      }, 600)
    }
  },
  provide () {
    return {
      emitActiveShow: this.onActiveShow,
      emitItemClick: this.onItemClick
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
