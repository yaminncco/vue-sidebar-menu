<template>
  <div
    class="v-sidebar-menu"
    :class="[!isCollapsed ? 'vsm_default' : 'vsm_collapsed', theme ? `vsm_${theme}` : '', rtl ? 'vsm_rtl' : '']"
    :style="{'width': sidebarWidth}"
    @mouseleave="onMouseLeave"
  >
    <slot name="header" />
    <div
      class="vsm--list"
    >
      <item
        v-for="(item, index) in menu"
        :key="index"
        :item="item"
        :is-collapsed="isCollapsed"
        :active-show="activeShow"
        :show-one-child="showOneChild"
        :show-child="showChild"
        :rtl="rtl"
      >
        <slot
          slot="dropdown-icon"
          name="dropdown-icon"
        />
      </item>
    </div>
    <div
      v-if="isCollapsed"
      :style="[{'position' : 'absolute'}, {'top' : `${mobileItemPos}px`}, rtl ? {'right' : '0px'} : {'left' : '0px'}, {'z-index' : 30}, {'width' : width}]"
    >
      <item
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
      </item>
      <transition name="slide-animation">
        <div
          v-if="mobileItem"
          class="vsm--mobile-bg"
          :style="[{'position' : 'absolute'}, {'left' : '0px'}, {'right' : '0px'}, {'top' : '0px'}, {'height' : `${mobileItemHeight}px`}]"
        />
      </transition>
      <div
        class="vsm--dropdown"
        :style="[{'position' : 'absolute'}, {'top' : `${mobileItemHeight}px`}, {'left' : rtl ? '0px': sidebarWidth}, {'right' : rtl ? sidebarWidth: '0px'}, {'max-height' : `calc(${sidebarHeight}px - ${mobileItemPos + mobileItemHeight}px)`}, {'overflow-y' : 'auto'}]"
      >
        <transition
          name="expand"
          @enter="expandEnter"
          @afterEnter="expandAfterEnter"
          @beforeLeave="expandBeforeLeave"
        >
          <listItem
            v-if="mobileItem && mobileItem.child"
            :items="mobileItem.child"
            :show-child="showChild"
            :rtl="rtl"
            :is-collapsed="isCollapsed"
          >
            <slot
              slot="dropdown-icon"
              name="dropdown-icon"
            />
          </listItem>
        </transition>
      </div>
    </div>
    <slot name="footer" />
    <button
      class="vsm--toggle-btn"
      :class="{'vsm--toggle-btn_slot' : $slots['collapse-icon']}"
      @click="onToggleClick"
    >
      <slot name="collapse-icon" />
    </button>
  </div>
</template>

<script>
import Item from './Item.vue'
import ListItem from './ListItem.vue'
import { animationMixin } from '../mixin'

export default {
  name: 'SidebarMenu',
  components: {
    Item,
    ListItem
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
      mobileItemTimeout: null,
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
    this.$on('mouseEnterItem', (mobileItemData) => {
      this.unsetMobileItem()
      this.$nextTick(() => {
        this.setMobileItem(mobileItemData)
      })
    })

    this.$on('touchClickItem', (hasChild) => {
      this.unsetMobileItem(true, hasChild)
    })
  },
  mounted () {
    this.initSidebarHeight()
  },
  methods: {
    onMouseLeave () {
      this.unsetMobileItem()
    },
    onToggleClick () {
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
      this.$emit('item-click', event, item)
    },
    initSidebarHeight () {
      this.sidebarHeight = this.$el.offsetHeight
    },
    setMobileItem (mobileItemData) {
      this.mobileItem = mobileItemData.item
      this.mobileItemPos = mobileItemData.pos
      this.mobileItemHeight = mobileItemData.height
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
