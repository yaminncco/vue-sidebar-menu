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
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  badge: {
    type: Object,
    default: () => {},
  },
})

const attributes = computed(() => {
  return {
    class: ['vsm--badge', props.badge.class],
    ...props.badge.attributes,
  }
})
</script>
