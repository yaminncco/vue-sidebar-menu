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
    class="vsm--item"
    :class="{'vsm--item_open' : show}"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
  >
    <sidebar-menu-link
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
          :class="[{'vsm--arrow_open' : show}, {'vsm--arrow_slot' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </template>
    </sidebar-menu-link>
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
            class="vsm--dropdown"
            :class="isMobileItem && 'vsm--dropdown_mobile-item'"
            :style="isMobileItem && mobileItemDropdownStyle"
          >
            <div class="vsm--list">
              <sidebar-menu-item
                v-for="(subItem, index) in item.child"
                :key="index"
                :item="subItem"
                :level="level+1"
              >
                <slot
                  slot="dropdown-icon"
                  name="dropdown-icon"
                />
              </sidebar-menu-item>
            </div>
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import { toRefs, watchEffect, onMounted, onUnmounted, getCurrentInstance, inject } from 'vue'
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
    const { disableHover } = toRefs(sidebarProps)
    const {
      active,
      exactActive,
      show,
      hover,
      isFirstLevel,
      isHidden,
      hasChild,
      linkClass,
      onRouteChange,
      onLinkClick,
      onMouseOver,
      onMouseOut,
      onExpandEnter,
      onExpandAfterEnter,
      onExpandBeforeLeave
    } = useItem(props)

    const router = getCurrentInstance().ctx.$router

    watchEffect(() => {
      onRouteChange()
    })

    onMounted(() => {
      if (!router) {
        window.addEventListener('hashchange', onRouteChange)
      }
    })

    onUnmounted(() => {
      if (!router) {
        window.removeEventListener('hashchange', onRouteChange)
      }
    })

    return {
      isCollapsed,
      disableHover,
      active,
      exactActive,
      mobileItemDropdownStyle,
      show,
      hover,
      isFirstLevel,
      isHidden,
      hasChild,
      linkClass,
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
