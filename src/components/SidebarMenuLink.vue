<template>
  <a
    v-if="isHyperLink"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <router-link
    v-else
    custom
    :to="item.href"
    v-slot="{ href, navigate }"
  >
    <a v-bind="$attrs" :href="href" @click="navigate">
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
    isHyperLink () {
      return !!(!this.item.href || this.item.external)
    }
  }
}
</script>
