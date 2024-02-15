<template>
  <component
    :is="tag"
    :title="isCollapsed && hasTooltip ? item.title : ''"
    v-bind="componentAttrs"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuLink',
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
    hasTooltip: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isRouterLink () {
      return !!this.$router && this.item.href && !this.item.external
    },
    componentAttrs() {
      return Object.assign(this.isRouterLink ? { to: this.href } : { href: this.href }, this.$attrs)
    },
    tag () {
      return this.isRouterLink ? this.$nuxt ? 'nuxt-link' : 'router-link' : 'a'
    },
    href () {
      if (!this.item.href) return '#'
      return this.item.href
    }
  }
}
</script>
