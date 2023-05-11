<template>
  <div
    ref="sidebarMenuRef"
    :class="['v-sidebar-menu', sidebarClass]"
    :style="{ 'max-width': sidebarWidth }"
  >
    <slot name="header" />
    <sidebar-menu-scroll>
      <ul class="vsm--menu" :style="{ width: sidebarWidth }">
        <sidebar-menu-item
          v-for="item in computedMenu"
          :key="item.id"
          :item="item"
        >
          <template #dropdown-icon="{ isOpen }">
            <slot name="dropdown-icon" v-bind="{ isOpen }">
              <span class="vsm--arrow_default" />
            </slot>
          </template>
        </sidebar-menu-item>
      </ul>
    </sidebar-menu-scroll>
    <slot name="footer" />
    <button v-if="!hideToggle" class="vsm--toggle-btn" @click="onToggleClick">
      <slot name="toggle-icon">
        <span class="vsm--toggle-btn_default" />
      </slot>
    </button>
  </div>
</template>

<script>
import {
  watch,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  computed,
} from 'vue'
import { initSidebar } from '../use/useSidebar'

import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarMenuScroll from './SidebarMenuScroll.vue'

export default {
  compatConfig: { MODE: 3 },
  name: 'SidebarMenu',
  components: {
    SidebarMenuItem,
    SidebarMenuScroll,
  },
  props: {
    menu: {
      type: Array,
      required: true,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '290px',
    },
    widthCollapsed: {
      type: String,
      default: '65px',
    },
    showChild: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: undefined,
      validator: (value) => ['', 'white-theme'].includes(value),
    },
    showOneChild: {
      type: Boolean,
      default: false,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    relative: {
      type: Boolean,
      default: false,
    },
    hideToggle: {
      type: Boolean,
      default: false,
    },
    disableHover: {
      type: Boolean,
      default: false,
    },
    linkComponentName: {
      type: String,
      default: undefined,
    },
  },
  emits: {
    'item-click'(event, item) {
      return !!(event && item)
    },
    'update:collapsed'(collapsed) {
      return !!(typeof collapsed === 'boolean')
    },
  },
  setup(props, context) {
    const {
      getSidebarRef: sidebarMenuRef,
      getIsCollapsed: isCollapsed,
      updateIsCollapsed,
      unsetMobileItem,
      updateCurrentRoute,
    } = initSidebar(props, context)

    const computedMenu = computed(() => {
      let id = 0
      function transformItems(items) {
        function randomId() {
          return `${Date.now() + '' + id++}`
        }
        return items.map((item) => {
          return {
            id: randomId(),
            ...item,
            ...(item.child && { child: transformItems(item.child) }),
          }
        })
      }
      return transformItems(props.menu)
    })

    const sidebarWidth = computed(() => {
      return isCollapsed.value ? props.widthCollapsed : props.width
    })

    const sidebarClass = computed(() => {
      return [
        !isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed',
        props.theme && `vsm_${props.theme}`,
        props.rtl && 'vsm_rtl',
        props.relative && 'vsm_relative',
      ]
    })

    const onToggleClick = () => {
      unsetMobileItem()
      updateIsCollapsed(!isCollapsed.value)
      context.emit('update:collapsed', isCollapsed.value)
    }

    watch(
      () => props.collapsed,
      (currentCollapsed) => {
        unsetMobileItem()
        updateIsCollapsed(currentCollapsed)
      }
    )

    const router =
      getCurrentInstance().appContext.config.globalProperties.$router
    if (!router) {
      onMounted(() => {
        window.addEventListener('hashchange', updateCurrentRoute)
      })
      onUnmounted(() => {
        window.removeEventListener('hashchange', updateCurrentRoute)
      })
    }

    return {
      sidebarMenuRef,
      isCollapsed,
      computedMenu,
      sidebarWidth,
      sidebarClass,
      onToggleClick,
      onRouteChange: updateCurrentRoute,
    }
  },
}
</script>

<style lang="scss">
@import '../scss/vue-sidebar-menu';
</style>
