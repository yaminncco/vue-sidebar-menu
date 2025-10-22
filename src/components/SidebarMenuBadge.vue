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

<script lang="ts">
interface Props {
  badge: ItemBadge
}

export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemBadge } from '../types'

const props = defineProps<Props>()

const attributes = computed(() => {
  return {
    class: ['vsm--badge', props.badge.class],
    ...props.badge.attributes,
  }
})
</script>
