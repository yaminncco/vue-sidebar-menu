<template>
  <template v-if="!isHidden">
    <li v-if="'component' in item">
      <component :is="item.component" v-bind="item.props" />
    </li>
    <li
      v-else-if="'header' in item"
      :class="['vsm--header', item.class]"
      v-bind="item.attributes"
    >
      {{ item.header }}
    </li>
    <sidebar-menu-item-link
      v-else
      :item="item"
      :level="level"
      :active-show="activeShow"
      @update-active-show="$emit('update-active-show', $event)"
    >
      <!-- @vue-ignore -->
      <template
        #dropdown-icon="{
          isOpen,
          toggle,
        }: {
          isOpen: boolean,
          toggle: (event: Event) => void,
        }"
      >
        <slot name="dropdown-icon" v-bind="{ isOpen, toggle }" />
      </template>
    </sidebar-menu-item-link>
  </template>
</template>

<script lang="ts">
interface Props {
  item: SidebarItemType
  level: number
  activeShow?: string
}

export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import SidebarMenuItemLink from './SidebarMenuItemLink.vue'

import { useSidebar } from '../use/useSidebar'
import type { SidebarItemType } from '../types'

const props = defineProps<Props>()
defineEmits<{
  (e: 'update-active-show', value: string | undefined): void
}>()

const { getIsCollapsed: isCollapsed } = useSidebar()!
const { item, activeShow, level } = toRefs(props)

const isHidden = computed(() => {
  if (isCollapsed.value) {
    if (props.item.hidden && props.item.hiddenOnCollapse === undefined) {
      return true
    } else {
      return props.item.hiddenOnCollapse === true
    }
  } else {
    return props.item.hidden === true
  }
})
</script>
