<template>
  <component
    :is="icon.element ? icon.element : 'i'"
    v-if="typeof icon === 'object' && icon.text"
    v-bind="attributes"
  >
    {{ icon.text }}
  </component>
  <component
    :is="icon.element ? icon.element : 'i'"
    v-else-if="typeof icon === 'object'"
    v-bind="attributes"
  />
  <i v-else v-bind="attributes" />
</template>

<script>
export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: [String, Object],
    default: '',
  },
})

const attributes = computed(() => {
  return {
    class: [
      'vsm--icon',
      typeof props.icon === 'object' ? props.icon.class : props.icon,
    ],
    'aria-hidden': true,
    ...props.icon.attributes,
  }
})
</script>
