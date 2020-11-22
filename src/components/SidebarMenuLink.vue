<template>
  <a
    v-if="isHyperLink"
    v-bind="attrs"
    :href="item.href ? item.href : '#'"
  >
    <slot />
  </a>
  <router-link
    v-else
    custom
    :to="item.href"
    v-slot="{ href, isExactActive, navigate }"
  >
    <a v-bind="attrs" :href="href" @click="navigate" :aria-current="isExactActive ? 'page' : null">
      <slot />
    </a>
  </router-link>
</template>

<script>
export default {
  inheritAttrs: false,
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

      return {
        target,
        tabindex,
        ...this.item.attributes,
        ...this.$attrs
      }
    },
    isHyperLink () {
      return !!(!this.item.href || this.item.external)
    }
  }
}
</script>
