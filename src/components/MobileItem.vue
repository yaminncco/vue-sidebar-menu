<template>
  <div
    v-if="item"
    class="vsm-item mobile-item"
    :class="[{'open-item' : item.child}, {'active-item' : active}, {'parent-active-item' : childActive}]"
  >
    <template v-if="isRouterLink">
      <router-link
        class="vsm-link"
        :to="item.href"
        :disabled="item.disabled"
        :event="item.disabled ? '' : 'click'"
        @click.native="clickEvent($event, true)"
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
        {{ item.title }}
        <div
          v-if="item.child"
          class="vsm-arrow open-arrow"
          :class="[{'slot-icon' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </router-link>
    </template>
    <template v-else>
      <a
        class="vsm-link"
        :href="item.href ? item.href : '#'"
        :disabled="item.disabled"
        @click="clickEvent($event, true)"
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
        {{ item.title }}
        <div
          v-if="item.child"
          class="vsm-arrow open-arrow"
          :class="[{'slot-icon' : $slots['dropdown-icon']}]"
        >
          <slot name="dropdown-icon" />
        </div>
      </a>
    </template>
  </div>
</template>

<script>
import { itemMixin } from '../mixin'

export default {
  mixins: [itemMixin],
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      firstItem: true
    }
  },
  watch: {
    item () {
      this.active =
        this.item && this.item.href ? this.isLinkActive(this.item) : false
      this.childActive =
        this.item && this.item.child
          ? this.isChildActive(this.item.child)
          : false
    }
  }
}
</script>
