<template>
  <component
    :is="item.component"
    v-if="item.component && !isItemHidden"
    v-bind="item.props"
  />
  <div
    v-else-if="item.header && !isItemHidden"
    class="vsm--header"
    :class="item.class"
    v-bind="item.attributes"
  >
    {{ item.title }}
  </div>
  <div
    v-else-if="!isItemHidden"
    class="vsm--item"
    :class="[{'vsm--item_open' : show}]"
    v-on="disableHover && isCollapsed ? { click: mouseEnterEvent } : { mouseover: mouseEnterEvent }"
    @mouseout="mouseLeaveEvent"
  >
    <sidebar-menu-link
      :tag="item.disabled || !itemLinkHref ? 'span' : (isRouterLink ? 'router-link' : 'a')"
      :href="itemLinkHref"
      :disabled="item.disabled"
      :class="itemLinkClass"
      v-bind="item.attributes"
      @click.native="clickEvent"
      @keydown.enter.native="clickEvent"
    >
      <sidebar-menu-icon
        v-if="item.icon && !isMobileItem"
        :icon="item.icon"
      />
      <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || isMobileItem">
        <sidebar-menu-badge
          v-if="item.badge"
          :badge="item.badge"
          :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
        />
        <span class="vsm--title">{{ item.title }}</span>
        <div
          v-if="item.child"
          class="vsm--arrow"
          :class="[{'vsm--arrow_open' : show}, {'vsm--arrow_slot' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </template>
    </sidebar-menu-link>
    <template v-if="item.child">
      <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed">
        <transition
          name="expand"
          @enter="expandEnter"
          @afterEnter="expandAfterEnter"
          @beforeLeave="expandBeforeLeave"
        >
          <div
            v-if="show"
            class="vsm--dropdown"
          >
            <div class="vsm--list">
              <sidebar-menu-item
                v-for="(subItem, index) in item.child"
                :key="index"
                :item="subItem"
                :level="level+1"
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
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import { itemMixin, animationMixin } from '../mixin'
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
  mixins: [itemMixin, animationMixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    isCollapsed: {
      type: Boolean
    },
    isMobileItem: {
      type: Boolean,
      default: false
    },
    mobileItem: {
      type: Object,
      default: null
    },
    activeShow: {
      type: Object,
      default: null
    },
    showChild: {
      type: Boolean,
      default: false
    },
    showOneChild: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    disableHover: {
      type: Boolean,
      default: false
    }
  }
}
</script>
