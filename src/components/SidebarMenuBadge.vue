<template>
  <component
    :is="badge.element ? badge.element : 'span'"
    :class="['vsm--badge', badge.class]"
    v-bind="badge.attributes"
  >
    {{ badge.text }}
  </component>
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
}
</script>
