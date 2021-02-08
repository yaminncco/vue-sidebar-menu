<template>
  <component
    :is="icon.element ? icon.element : 'i'"
    class="vsm--icon"
    :class="typeof icon === 'string' || (icon instanceof String) ? icon : icon.class"
    aria-hidden="true"
    v-bind="icon.attributes"
  >
    {{ icon.text }}
  </component>
</template>

<script>
export default {
  name: 'SidebarMenuIcon',
  props: {
    icon: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
