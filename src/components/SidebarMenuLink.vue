<template>
  <a
    v-if="isHyperLink"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-slot="{ href, navigate }"
    custom
    :to="$attrs.href"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>
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
  data () {
    return {
      router: false
    }
  },
  computed: {
    isHyperLink () {
      return !!(!this.item.href || this.item.external || !this.router)
    }
  },
  mounted () {
    this.router = !!this.$router
  }
}
</script>
