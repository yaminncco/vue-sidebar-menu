<template>
  <div
    class="vsm-item"
    :class="[{'first-item' : firstItem }, {'mobile-item' : mobileItem}, {'open-item' : show}, {'active-item' : active}, {'parent-active-item' : childActive}]"
    @mouseenter="mouseEnter($event)"
  >
    <template v-if="isRouterLink">
      <router-link
        class="vsm-link"
        :class="item.class"
        :to="item.href"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : ''"
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
        <template v-if="!isCollapsed || mobileItem">
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
        </template>
      </router-link>
    </template>
    <template v-else>
      <a
        class="vsm-link"
        :class="item.class"
        :href="item.href ? item.href : '#'"
        :disabled="item.disabled"
        :tabindex="item.disabled ? -1 : ''"
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
        <template v-if="!isCollapsed || mobileItem">
          <component
            :is="item.badge.element ? item.badge.element : 'span'"
            v-if="item.badge"
            :style="[rtl ? (item.child ? {'margin-left' : '30px'} : '') : (item.child ? {'margin-right' : '30px'} : '')]"
            class="vsm-badge"
            :class="item.badge.class"
            v-bind="item.badge.attributes"
          >{{ item.badge.text }}</component>
          <span class="vsm-title">{{ item.title }}</span>
          <div
            v-if="item.child"
            class="vsm-arrow"
            :class="[{'open-arrow' : show}, {'slot-icon' : $slots['dropdown-icon']}]"
          >
            <slot name="dropdown-icon" />
          </div>
        </template>
      </a>
    </template>
    <template v-if="item.child">
      <template v-if="!isCollapsed">
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
            <listItem :items="item.child">
              <slot
                slot="dropdown-icon"
                name="dropdown-icon"
              />
            </listItem>
          </div>
        </transition>
      </template>
    </template>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import { itemMixin, animationMixin } from '../mixin'

export default {
  components: {
    ListItem
  },
  mixins: [itemMixin, animationMixin],
  props: {
    item: {
      type: Object,
      required: true
    },
    firstItem: {
      type: Boolean,
      default: false
    },
    isCollapsed: {
      type: Boolean
    },
    mobileItem: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mouseEnter (event) {
      if (this.isCollapsed && this.firstItem && !this.mobileItem) {
        this.$parent.$emit('mouseEnterItem', {
          item: this.item,
          pos:
              event.currentTarget.getBoundingClientRect().top -
              this.$parent.$el.getBoundingClientRect().top,
          height: this.$el.offsetHeight
        })
      }
    }
  }
}
</script>
