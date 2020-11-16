<template>
  <div
    ref="sidebarMenuRef"
    class="v-sidebar-menu"
    :class="sidebarClass"
    :style="{'max-width': sidebarWidth}"
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
        >
          <template v-slot:dropdown-icon="{ isOpen }">
            <slot name="dropdown-icon" v-bind="{ isOpen }">
              <span class="vsm--arrow_default"></span>
            </slot>
          </template>
        </sidebar-menu-item>
      </div>
      <div
        v-if="isCollapsed"
        class="vsm--mobile-item"
        :style="mobileItemStyle"
      >
        <sidebar-menu-item
          v-if="mobileItem"
          :item="mobileItem"
          :is-mobile-item="true"
        >
          <template v-slot:dropdown-icon="{ isOpen }">
            <slot name="dropdown-icon" v-bind="{ isOpen }">
              <span class="vsm--arrow_default"></span>
            </slot>
          </template>
        </sidebar-menu-item>
        <transition name="slide-animation">
          <div
            v-if="mobileItem"
            class="vsm--mobile-bg"
            :style="mobileItemBackgroundStyle"
          />
        </transition>
      </div>
    </div>
    <slot name="footer" />
    <button
      v-if="!hideToggle"
      class="vsm--toggle-btn"
      @click="onToggleClick"
    >
      <slot name="toggle-icon">
        <span class="vsm--toggle-btn_default"></span>
      </slot>
    </button>
  </div>
</template>

<script>
import { provide, watch } from 'vue'
import useMenu from '../use/useMenu'

import SidebarMenuItem from './SidebarMenuItem.vue'

export default {
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem
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
      default: '290px'
    },
    widthCollapsed: {
      type: String,
      default: '65px'
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
    },
    linkComponentName: {
      type: String,
      default: 'SidebarMenuLink'
    }
  },
  setup (props, context) {
    provide('vsm-props', props)

    const {
      sidebarMenuRef,
      isCollapsed,
      sidebarWidth,
      sidebarClass,
      onMouseLeave,
      onToggleClick,
      onItemClick,
      mobileItem,
      mobileItemStyle,
      mobileItemBackgroundStyle,
      unsetMobileItem
    } = useMenu(props, context)

    provide('emitItemClick', onItemClick)

    watch(() => props.collapsed, (currentCollapsed) => {
      unsetMobileItem()
      isCollapsed.value = currentCollapsed
    })

    return {
      sidebarMenuRef,
      isCollapsed,
      sidebarWidth,
      sidebarClass,
      onMouseLeave,
      onToggleClick,
      onItemClick,
      mobileItem,
      mobileItemStyle,
      mobileItemBackgroundStyle
    }
  },
  emits: {
    'item-click' (event, item, node) {
      return !!(event && item && node)
    },
    'update:collapsed' (collapsed) {
      return !!(typeof collapsed === 'boolean')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
