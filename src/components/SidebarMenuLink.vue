<template>
  <component
    :is="tag"
    v-bind="[isRouterLink ? { to: href } : { href: href }, ...$attrs]"
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
    }
  },
  computed: {
    isRouterLink () {
      return !!this.$router && this.item.href && !this.item.external
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
