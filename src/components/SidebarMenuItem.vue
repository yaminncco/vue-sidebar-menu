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
    @mouseenter="mouseEnterEvent"
  >
    <template v-if="isRouterLink">
      <router-link
        :class="itemLinkClass"
        :to="itemLinkHref"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : undefined"
        v-bind="item.attributes"
        @click.native="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || (item.icon instanceof String)"
            class="vsm--icon"
            :class="item.icon"
          />
          <component
            :is="item.icon.element ? item.icon.element : 'i'"
            v-else
            class="vsm--icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || mobileItem">
          <component
            :is="item.badge.element ? item.badge.element : 'span'"
            v-if="item.badge"
            :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
            class="vsm--badge"
            :class="item.badge.class"
            v-bind="item.badge.attributes"
          >
            {{ item.badge.text }}
          </component>
          <span class="vsm--title">{{ item.title }}</span>
          <div
            v-if="item.child"
            class="vsm--arrow"
            :class="[{'vsm--arrow_open' : show}, {'vsm--arrow_slot' : $slots['dropdown-icon']}]"
          >
            <slot name="dropdown-icon" />
          </div>
        </template>
      </router-link>
    </template>
    <template v-else>
      <a
        :class="itemLinkClass"
        :href="itemLinkHref"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : undefined"
        v-bind="item.attributes"
        @click="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || (item.icon instanceof String)"
            class="vsm--icon"
            :class="item.icon"
          />
          <component
            :is="item.icon.element ? item.icon.element : 'i'"
            v-else
            class="vsm--icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <template v-if="(isCollapsed && !isFirstLevel) || !isCollapsed || mobileItem">
          <component
            :is="item.badge.element ? item.badge.element : 'span'"
            v-if="item.badge"
            :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
            class="vsm--badge"
            :class="item.badge.class"
            v-bind="item.badge.attributes"
          >{{ item.badge.text }}</component>
          <span class="vsm--title">{{ item.title }}</span>
          <div
            v-if="item.child"
            class="vsm--arrow"
            :class="[{'vsm--arrow_open' : show}, {'vsm--arrow_slot' : $slots['dropdown-icon']}]"
          >
            <slot name="dropdown-icon" />
          </div>
        </template>
      </a>
    </template>
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
        </transition>
      </template>
    </template>
  </div>
</template>

<script>

import { itemMixin, animationMixin } from '../mixin'

export default {
  name: 'sidebar-menu-item',
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
    mobileItem: {
      type: Boolean,
      default: false
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
    defaultHref: {
      type: String,
      default: '#'
    }
  }
}
</script>
