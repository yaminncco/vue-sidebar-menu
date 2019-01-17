<template>
  <div class="v-sidebar-menu" :class="[!isCollapsed ? 'vsm-default' : 'vsm-collapsed', theme]" :style="{'width': sidebarWidth}" @mouseleave="mouseLeave">
    <div class="vsm-list" :style="[{'height' : '100%'}, {'overflow' : 'hidden auto'}]">
      <template v-for="(item, index) in menu">
          <template v-if="item.header">
            <template v-if="(item.visibleOnCollapse || !isCollapsed) && item.component">
              <component :key="index" :is="item.component" />
            </template>
            <template v-else-if="item.visibleOnCollapse || !isCollapsed">
              <div :key="index" class="vsm-header">{{item.title}}</div>
            </template>
          </template>
         <item v-else :key="index" :item="item" :firstItem="true" :isCollapsed="isCollapsed" />
      </template>
    </div>
    <div v-if="isCollapsed" :style="[{'position' : 'absolute'}, {'top' : `${mobileItemPos}px`}, {'left' : '0px'}, {'z-index' : 30}, {'width' : width}]">
      <mobile-item :item="mobileItem" />
      <transition name="slide-animation">
        <div class="vsm-mobile-bg" v-if="mobileItem" :style="[{'position' : 'absolute'}, {'left' : '0px'}, {'right' : '0px'}, {'top' : '0px'}, {'height' : `${mobileItemHeight}px`}]"></div>
      </transition>
      <div class="vsm-dropdown" :style="[{'position' : 'absolute'}, {'top' : `${mobileItemHeight}px`}, {'left' : sidebarWidth}, {'right' : '0px'}, {'max-height' : `calc(100vh - ${mobileItemPos + mobileItemHeight}px)`}, {'overflow-y' : 'auto'}]">
        <transition name="expand" @enter="expandEnter" @afterEnter="expandAfterEnter" @beforeLeave="expandBeforeLeave">
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
import { animationMixin } from '../mixin'

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
    },
    showChild: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ''
    }
  },
  mixins: [animationMixin],
  data() {
    return {
      isCollapsed: this.collapsed,
      mobileItem: null,
      mobileItemPos: 0,
      mobileItemHeight: 0,
      closeTimeout: null
    }
  },
  created() {
    this.$on('mouseEnterItem', (val) => {
      this.mobileItem = val.item
      this.mobileItemPos = val.pos
      this.mobileItemHeight = val.height
    })

    this.$on('clickItem', () => {
      if (this.closeTimeout) clearTimeout(this.closeTimeout)
      this.closeTimeout = setTimeout(() => {
        this.mouseLeave()
      }, 600)
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
  computed: {
    sidebarWidth() {
      return this.isCollapsed ? this.widthCollapsed : this.width
    }
  },
  watch: {
    collapsed(val) {
      this.isCollapsed = val
    }
  },
  provide() {
    return {
      showChild: this.showChild
    }
  },
}
</script>


<style lang="scss">
@import '../scss/vue-sidebar-menu.scss';
</style>
