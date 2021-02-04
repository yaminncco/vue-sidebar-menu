<template>
  <div
    ref="sidebarMenuRef"
    class="v-sidebar-menu"
    :class="sidebarClass"
    :style="{'max-width': sidebarWidth}"
  >
    <slot name="header" />
    <div
      class="vsm--scroll-wrapper"
      :style="isCollapsed && [rtl ? {'margin-left': '-17px'} : {'margin-right': '-17px'}]"
    >
      <div
        class="vsm--menu"
        :style="isCollapsed && {'width': widthCollapsed, 'position': 'static !important' }"
      >
        <sidebar-menu-item
          v-for="(item, index) in menu"
          :key="index"
          :item="item"
        >
          <template #dropdown-icon="{ isOpen }">
            <slot
              name="dropdown-icon"
              v-bind="{ isOpen }"
            >
              <span class="vsm--arrow_default" />
            </slot>
          </template>
        </sidebar-menu-item>
      </div>
    </div>
    <slot name="footer" />
    <button
      v-if="!hideToggle"
      class="vsm--toggle-btn"
      @click="onToggleClick"
    >
      <slot name="toggle-icon">
        <span class="vsm--toggle-btn_default" />
      </slot>
    </button>
  </div>
</template>

<script>
import { provide, watch, toRefs } from 'vue'
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
      default: undefined
    }
  },
  emits: {
    'item-click' (event, item) {
      return !!(event && item)
    },
    'update:collapsed' (collapsed) {
      return !!(typeof collapsed === 'boolean')
    }
  },
  setup (props, context) {
    provide('vsm-props', props)

    const {
      sidebarMenuRef,
      isCollapsed,
      sidebarWidth,
      sidebarClass,
      onToggleClick,
      onItemClick,
      onRouteChange,
      unsetMobileItem
    } = useMenu(props, context)

    provide('emitItemClick', onItemClick)
    provide('onRouteChange', onRouteChange)

    const { collapsed } = toRefs(props)
    isCollapsed.value = collapsed.value

    watch(() => props.collapsed, (currentCollapsed) => {
      unsetMobileItem()
      isCollapsed.value = currentCollapsed
    })

    return {
      sidebarMenuRef,
      isCollapsed,
      sidebarWidth,
      sidebarClass,
      onToggleClick,
      onItemClick,
      onRouteChange
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
