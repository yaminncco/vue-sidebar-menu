<template>
  <a v-if="isHyperLink" v-bind="$attrs">
    <slot />
  </a>
  <router-link v-else v-slot="{ href, navigate }" custom :to="$attrs.href">
    <a v-bind="$attrs" :href="href" @click="navigate">
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
interface Props {
  item: SidebarItem
}

export default {
  compatConfig: {
    MODE: 3,
    inheritAttrs: false,
  },
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import type { SidebarItem } from '../types'

const props = defineProps<Props>()

const router = getCurrentInstance()?.appContext.config.globalProperties.$router

const isHyperLink = computed(() => {
  return !!(!props.item.href || props.item.external || !router)
})
</script>
