<template>
  <component
    :is="tag"
    v-bind="[tag === 'router-link' ? { to: href } : { href }, attributes]"
    :tabindex="disabled ? -1 : 0"
    role="link"
    @keydown.enter="$parent.clickEvent($event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuLink',
  props: {
    tag: {
      type: String,
      default: ''
    },
    href: {
      type: [String, Object],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    attributes: {
      type: Object,
      default: null
    }
  }
}
</script>
