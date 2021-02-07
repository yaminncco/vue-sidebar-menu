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
    v-on="(isCollapsed && isFirstLevel) ? { mouseenter: onMouseEnter, mouseleave: onMouseLeave} : {}"
  >
    <component
      :is="linkComponentName ? linkComponentName : 'SidebarMenuLink'"
      :item="item"
      :class="linkClass"
      v-bind="linkAttrs"
      @click="onLinkClick"
    >
      <template v-if="isCollapsed && isFirstLevel">
        <transition name="slide-animation">
          <div
            v-if="hover"
            class="vsm--mobile-bg"
            :style="mobileItemBackgroundStyle"
          />
        </transition>
      </template>
      <sidebar-menu-icon
        v-if="item.icon"
        :icon="item.icon"
      />
      <transition
        name="fade-animation"
      >
        <div
          v-if="!(isCollapsed && isFirstLevel) || isMobileItem"
          class="vsm--title"
          :style="isMobileItem && mobileItemStyle"
        >
          <span>{{ item.title }}</span>
          <div>
            <sidebar-menu-badge
              v-if="item.badge"
              :badge="item.badge"
            />
            <div
              v-if="hasChild"
              class="vsm--arrow"
              :class="{'vsm--arrow_open' : show}"
            >
              <slot
                name="dropdown-icon"
                v-bind="{ isOpen: show }"
              />
            </div>
          </div>
        </div>
      </transition>
    </component>
    <template v-if="hasChild">
      <transition
        :appear="isMobileItem"
        name="expand"
        @enter="onExpandEnter"
        @afterEnter="onExpandAfterEnter"
        @beforeLeave="onExpandBeforeLeave"
        @afterLeave="onExpandAfterLeave"
      >
        <div
          v-if="show"
          class="vsm--child"
          :class="isMobileItem && 'vsm--mobile-child'"
          :style="isMobileItem && mobileItemDropdownStyle"
        >
          <div class="vsm--dropdown">
            <sidebar-menu-item
              v-for="(subItem, index) in item.child"
              :key="index"
              :item="subItem"
              :level="level+1"
            >
              <template #dropdown-icon="{ isOpen }">
                <slot
                  name="dropdown-icon"
                  v-bind="{ isOpen }"
                />
              </template>
            </sidebar-menu-item>
          </div>
        </div>
      </transition>
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
    }
  },
  setup (props) {
    const sidebarProps = inject('vsm-props')
    const { isCollapsed, currentRoute, mobileItemStyle, mobileItemDropdownStyle, mobileItemBackgroundStyle } = useMenu(sidebarProps)
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
      linkAttrs,
      itemClass,
      isMobileItem,
      onRouteChange,
      onLinkClick,
      onMouseOver,
      onMouseOut,
      onMouseEnter,
      onMouseLeave,
      onExpandEnter,
      onExpandAfterEnter,
      onExpandBeforeLeave,
      onExpandAfterLeave
    } = useItem(props)

    const router = getCurrentInstance().appContext.config.globalProperties.$router

    if (router) {
      watch(() => router.currentRoute.value, () => {
        onRouteChange()
      }, {
        immediate: true
      })
    } else {
      watch(() => currentRoute.value, () => {
        onRouteChange()
      }, {
        immediate: true
      })
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
      isMobileItem,
      mobileItemStyle,
      mobileItemDropdownStyle,
      mobileItemBackgroundStyle,
      show,
      hover,
      isFirstLevel,
      isHidden,
      hasChild,
      linkClass,
      linkAttrs,
      itemClass,
      onRouteChange,
      onLinkClick,
      onMouseOver,
      onMouseOut,
      onMouseEnter,
      onMouseLeave,
      onExpandEnter,
      onExpandAfterEnter,
      onExpandBeforeLeave,
      onExpandAfterLeave
    }
  }
}
</script>
