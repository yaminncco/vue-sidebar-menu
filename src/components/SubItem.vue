<template>
  <div
    class="vsm-item"
    :class="[{'open-item' : show}, {'active-item' : active}, {'parent-active-item' : childActive}]"
  >
    <template v-if="isRouterLink">
      <router-link
        class="vsm-link"
        :class="item.class"
        :to="item.href"
        :disabled="item.disabled"
        :event="item.disabled ? '' : 'click'"
        v-bind="item.attributes"
        @click.native="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || (item.icon instanceof String)"
            class="vsm-icon"
            :class="item.icon"
          />
          <component
            :is="item.icon.element ? item.icon.element : 'i'"
            v-else
            class="vsm-icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <component
          :is="item.badge.element ? item.badge.element : 'span'"
          v-if="item.badge"
          :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
          class="vsm-badge"
          :class="item.badge.class"
          v-bind="item.badge.attributes"
        >
          {{ item.badge.text }}
        </component>
        <span class="vsm-title">{{ item.title }}</span>
        <div
          v-if="item.child"
          class="vsm-arrow"
          :class="[{'open-arrow' : show}, {'slot-icon' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </router-link>
    </template>
    <template v-else>
      <a
        class="vsm-link"
        :class="item.class"
        :href="item.href ? item.href : '#'"
        :disabled="item.disabled"
        v-bind="item.attributes"
        @click="clickEvent"
      >
        <template v-if="item.icon">
          <i
            v-if="typeof item.icon === 'string' || (item.icon instanceof String)"
            class="vsm-icon"
            :class="item.icon"
          />
          <component
            :is="item.icon.element ? item.icon.element : 'i'"
            v-else
            class="vsm-icon"
            :class="item.icon.class"
            v-bind="item.icon.attributes"
          >
            {{ item.icon.text }}
          </component>
        </template>
        <component
          :is="item.badge.element ? item.badge.element : 'span'"
          v-if="item.badge"
          :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
          class="vsm-badge"
          :class="item.badge.class"
          v-bind="item.badge.attributes"
        >
          {{ item.badge.text }}
        </component>
        <span class="vsm-title">{{ item.title }}</span>
        <div
          v-if="item.child"
          class="vsm-arrow"
          :class="[{'open-arrow' : show}, {'slot-icon' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </a>
    </template>
    <template v-if="item.child">
      <transition
        name="expand"
        @enter="expandEnter"
        @afterEnter="expandAfterEnter"
        @beforeLeave="expandBeforeLeave"
      >
        <div
          v-if="show"
          class="vsm-dropdown"
        >
          <div class="vsm-list">
            <item
              v-for="(subItem, index) in item.child"
              :key="index"
              :item="subItem"
            >
              <slot
                slot="dropdown-icon"
                name="dropdown-icon"
              />
            </item>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import Item from './Item.vue'
import { itemMixin, animationMixin } from '../mixin'

export default {
  components: {
    Item
  },
  mixins: [itemMixin, animationMixin],
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  beforeCreate () {
    this.$options.components.Item = require('./Item.vue').default
  }
}
</script>
