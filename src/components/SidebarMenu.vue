<template>
  <div
    class="v-sidebar-menu"
    :class="[!isCollapsed ? 'vsm-default' : 'vsm-collapsed', theme, rtl ? 'rtl' : '']"
    :style="{'width': sidebarWidth}"
    @mouseleave="mouseLeave"
  >
    <div
      class="vsm-list"
    >
      <template v-for="(item, index) in menu">
        <template v-if="item.header">
          <template v-if="(item.visibleOnCollapse || !isCollapsed) && item.component">
            <component
              :is="item.component"
              :key="index"
            />
          </template>
          <template v-else-if="item.visibleOnCollapse || !isCollapsed">
            <div
              :key="index"
              class="vsm-header"
              :class="item.class"
              v-bind="item.attributes"
            >
              {{ item.title }}
            </div>
          </template>
        </template>
        <item
          v-else
          :key="index"
          :item="item"
          :first-item="true"
          :is-collapsed="isCollapsed"
        />
      </template>
    </div>
    <div
      v-if="isCollapsed"
      :style="[{'position' : 'absolute'}, {'top' : `${mobileItemPos}px`}, rtl ? {'right' : '0px'} : {'left' : '0px'}, {'z-index' : 30}, {'width' : width}]"
    >
      <mobile-item :item="mobileItem" />
      <transition name="slide-animation">
        <div
          v-if="mobileItem"
          class="vsm-mobile-bg"
          :style="[{'position' : 'absolute'}, {'left' : '0px'}, {'right' : '0px'}, {'top' : '0px'}, {'height' : `${mobileItemHeight}px`}]"
        />
      </transition>
      <div
        class="vsm-dropdown"
        :style="[{'position' : 'absolute'}, {'top' : `${mobileItemHeight}px`}, {'left' : rtl ? '0px': sidebarWidth}, {'right' : rtl ? sidebarWidth: '0px'}, {'max-height' : `calc(${sidebarHeight}px - ${mobileItemPos + mobileItemHeight}px)`}, {'overflow-y' : 'auto'}]"
      >
        <transition
          name="expand"
          @enter="expandEnter"
          @afterEnter="expandAfterEnter"
          @beforeLeave="expandBeforeLeave"
        >
          <div
            v-if="mobileItem && mobileItem.child"
            class="vsm-list"
          >
            <sub-item
              v-for="(subItem, index) in mobileItem.child"
              :key="index"
              :item="subItem"
            />
          </div>
        </transition>
      </div>
    </div>
    <button
      class="collapse-btn"
      @click="toggleCollapse"
    />
  </div>
</template>

<script>
import Item from './Item.vue'
import SubItem from './SubItem.vue'
import MobileItem from './MobileItem.vue'
import { animationMixin } from '../mixin'

export default {
  name: 'SidebarMenu',
  components: {
    Item,
    SubItem,
    MobileItem
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
    }
  },
  data () {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0,
      closeTimeout: null,
      activeShow: null,
      sidebarHeight: 0
    }
  },
  computed: {
    sidebarWidth () {
      return this.isCollapsed ? this.widthCollapsed : this.width
    }
  },
  watch: {
    collapsed (val) {
      this.isCollapsed = val
      this.$nextTick(() => {
        this.initSidebarHeight()
      })
    }
  },
  created () {
    this.$on('mouseEnterItem', (val) => {
      this.mobileItem = null
      this.$nextTick(() => {
        this.mobileItem = val.item
        this.mobileItemPos = val.pos
        this.mobileItemHeight = val.height
      })
    })

    this.$on('touchClickItem', (clearCloseTimeout) => {
      if (clearCloseTimeout) {
        clearTimeout(this.closeTimeout)
        return
      }
      if (this.closeTimeout) clearTimeout(this.closeTimeout)
      this.closeTimeout = setTimeout(() => {
        this.mouseLeave()
      }, 600)
    })
  },
  mounted () {
    this.initSidebarHeight()
  },
  methods: {
    mouseLeave () {
      this.mobileItem = null
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
      this.$nextTick(() => {
        this.initSidebarHeight()
      })
      this.$emit('collapse', this.isCollapsed)
    },
    onActiveShow (uid) {
      this.activeShow = uid
    },
    onItemClick (event, item) {
      this.$emit('itemClick', event, item)
    },
    initSidebarHeight () {
      this.sidebarHeight = this.$el.offsetHeight
    }
  },
  provide () {
    const activeShow = {}
    Object.defineProperty(activeShow, 'uid', {
      enumerable: true,
      get: () => this.activeShow
    })
    return {
      showChild: this.showChild,
      showOneChild: this.showOneChild,
      emitActiveShow: this.onActiveShow,
      activeShow,
      emitItemClick: this.onItemClick,
      rtl: this.rtl
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu.scss';
</style>
