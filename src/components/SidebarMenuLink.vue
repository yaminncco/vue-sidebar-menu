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

<script>
export default {
  compatConfig: {
    MODE: 3,
    inheritAttrs: false,
  },
}
</script>

<script setup>
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const router = getCurrentInstance().appContext.config.globalProperties.$router

const isHyperLink = computed(() => {
  return !!(!props.item.href || props.item.external || !router)
})
</script>
