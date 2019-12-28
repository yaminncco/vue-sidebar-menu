<template>
  <component
    :is="tag"
    :to="tag === 'router-link' && href"
    v-bind="tag !== 'router-link' && { href: href && !disabled ? href : undefined }"
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
      default: 'a'
    },
    href: {
      type: [String, Object],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
