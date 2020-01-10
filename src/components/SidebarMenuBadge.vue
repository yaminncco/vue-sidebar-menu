<template>
  <component
    :is="badge.element ? badge.element : 'span'"
    class="vsm--badge"
    :class="badge.class"
    v-bind="badge.attributes"
  >
    {{ badge.text }}
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuBadge',
  props: {
    badge: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
