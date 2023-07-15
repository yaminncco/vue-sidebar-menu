<template>
  <component
    :is="badge.element ? badge.element : 'span'"
    v-if="badge.text"
    v-bind="attributes"
  >
    {{ badge.text }}
  </component>
  <component
    :is="badge.element ? badge.element : 'span'"
    v-else
    v-bind="attributes"
  />
</template>

<script>
export default {
  compatConfig: { MODE: 3 },
  name: 'SidebarMenuBadge',
  props: {
    badge: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    attributes() {
      return {
        class: ['vsm--badge', this.badge.class],
        ...this.badge.attributes,
      }
    },
  },
}
</script>
