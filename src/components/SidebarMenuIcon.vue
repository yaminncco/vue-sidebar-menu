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

<script lang="ts">
interface Props {
  icon: string | ItemIcon
}

export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemIcon } from '../types'

const props = defineProps<Props>()

const attributes = computed(() => {
  return {
    class: [
      'vsm--icon',
      typeof props.icon === 'object' ? props.icon.class : props.icon,
    ],
    'aria-hidden': true,
    ...(typeof props.icon === 'object' ? props.icon.attributes : {}),
  }
})
</script>
