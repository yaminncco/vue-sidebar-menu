<template>
  <component
    :is="item.component"
    v-if="item.component && !isHidden"
    v-bind="item.props"
  />
  <div
    v-else-if="item.header && !isHidden"
    class="vsm--header"
    :class="item.class"
    v-bind="item.attributes"
  >
    {{ item.title }}
  </div>
  <div
    v-else-if="!isHidden"
    :class="itemClass"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
  >
    <component
      :is="linkComponentName"
      :item="item"
      :class="linkClass"
      @click="onLinkClick"
    >
      <sidebar-menu-icon
        v-if="item.icon && !isMobileItem"
        :icon="item.icon"
      />
      <transition
        name="fade-animation"
        :appear="isMobileItem"
      >
        <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || isMobileItem">
          <span class="vsm--title">{{ item.title }}</span>
        </template>
      </transition>
      <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || isMobileItem">
        <sidebar-menu-badge
          v-if="item.badge"
          :badge="item.badge"
        />
        <div
          v-if="hasChild"
          class="vsm--arrow"
          :class="{'vsm--arrow_open' : show}"
        >
          <slot name="dropdown-icon" v-bind="{ isOpen: show }" />
        </div>
      </template>
    </component>
    <template v-if="hasChild">
      <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || isMobileItem">
        <transition
          :appear="isMobileItem"
          name="expand"
          @enter="onExpandEnter"
          @afterEnter="onExpandAfterEnter"
          @beforeLeave="onExpandBeforeLeave"
        >
          <div
            v-if="show"
            class="vsm--child"
            :class="isMobileItem && 'vsm--child_mobile'"
            :style="isMobileItem && mobileItemDropdownStyle"
          >
            <div class="vsm--dropdown">
              <sidebar-menu-item
                v-for="(subItem, index) in item.child"
                :key="index"
                :item="subItem"
                :level="level+1"
              >
                <template v-slot:dropdown-icon="{ isOpen }">
                  <slot name="dropdown-icon" v-bind="{ isOpen }"/>
                </template>
              </sidebar-menu-item>
            </div>
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import { toRefs, watch, onUnmounted, getCurrentInstance, inject } from 'vue'
import useMenu from '../use/useMenu'
import useItem from '../use/useItem'

import SidebarMenuLink from './SidebarMenuLink.vue'
import SidebarMenuIcon from './SidebarMenuIcon.vue'
import SidebarMenuBadge from './SidebarMenuBadge.vue'

export default {
  name: 'SidebarMenuItem',
  components: {
    SidebarMenuLink,
    SidebarMenuIcon,
    SidebarMenuBadge
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    isMobileItem: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const sidebarProps = inject('vsm-props')
    const { isCollapsed, mobileItemDropdownStyle } = useMenu(sidebarProps)
    const { disableHover, linkComponentName } = toRefs(sidebarProps)
    const {
      active,
      exactActive,
      show,
      hover,
      isFirstLevel,
      isHidden,
      hasChild,
      linkClass,
      itemClass,
      onRouteChange,
      onLinkClick,
      onMouseOver,
      onMouseOut,
      onExpandEnter,
      onExpandAfterEnter,
      onExpandBeforeLeave
    } = useItem(props)
    
    const router = getCurrentInstance().appContext.config.globalProperties.$router

    if (router) {
      watch(() => router.currentRoute.value, () => {
        onRouteChange()
      }, {
        immediate: true
      })
    } else {
      window.addEventListener('hashchange', onRouteChange)
      onUnmounted(() => {
        window.removeEventListener('hashchange', onRouteChange)
      })
    }

    return {
      isCollapsed,
      disableHover,
      linkComponentName,
      active,
      exactActive,
      mobileItemDropdownStyle,
      show,
      hover,
      isFirstLevel,
      isHidden,
      hasChild,
      linkClass,
      itemClass,
      onRouteChange,
      onLinkClick,
      onMouseOver,
      onMouseOut,
      onExpandEnter,
      onExpandAfterEnter,
      onExpandBeforeLeave
    }
  }
}
</script>
