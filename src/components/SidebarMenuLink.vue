<template>
  <a
    v-if="isHyperLink"
    v-bind="{ ...attrs }"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="{ ...attrs }"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'SidebarMenuLink',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    attrs () {
      const target = this.item.external ? '_blank' : '_self'
      const tabindex = this.item.disabled ? -1 : null

      const attrs = {
        target,
        tabindex,
        ...this.item.attributes
      }

      const href = this.item.href ? this.item.href : '#'
      !this.isHyperLink ? attrs.to = href : attrs.href = href

      return attrs
    },
    isHyperLink () {
      return !this.item.href || this.item.external
    }
  }
}
</script>
