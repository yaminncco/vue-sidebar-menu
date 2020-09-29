<template>
  <component
    :is="tag"
    :tabindex="item.disabled && -1"
    :target="target"
    v-bind="tag === 'router-link' ? { to: href, ...attributes } : { href , ...attributes }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuLink',
  props: {
    item: {
      type: Object,
      required: true
    },
    attributes: {
      type: Object,
      default: null
    }
  },
  computed: {
    isRouterLink () {
      return !!this.$router && this.item.href && !this.item.external
    },
    tag () {
      return this.isRouterLink ? 'router-link' : 'a'
    },
    href () {
      if (!this.item.href) return '#'
      return this.item.href
    },
    target () {
      if (this.item.external) return '_blank'
      return '_self'
    }
  }
}
</script>
