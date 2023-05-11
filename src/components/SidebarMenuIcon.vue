<template>
  <component
    :is="icon.element ? icon.element : 'i'"
    v-if="typeof icon === 'object'"
    :class="['vsm--icon', icon.class]"
    aria-hidden="true"
    v-bind="icon.attributes"
  >
    {{ icon.text }}
  </component>
  <i v-else :class="['vsm--icon', icon]" aria-hidden="true" />
</template>

<script>
export default {
  compatConfig: { MODE: 3 },
  name: 'SidebarMenuIcon',
  props: {
    icon: {
      type: [String, Object],
      default: '',
    },
  },
}
</script>
