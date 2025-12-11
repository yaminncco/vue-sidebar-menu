<template>
  <div
    ref="sidebarRef"
    :class="sidebarClass"
    :style="{ 'max-width': sidebarWidth }"
  >
    <div class="vsm--wrapper">
      <slot name="header" />
      <sidebar-menu-scroll>
        <ul class="vsm--menu" :style="{ width: sidebarWidth }">
          <sidebar-menu-item
            v-for="item in computedMenu"
            :key="item.id"
            :item="item"
            :level="1"
            :active-show="activeShow"
            @update-active-show="updateActiveShow"
          >
            <template
              #dropdown-icon="{
                isOpen,
                toggle,
              }: {
                isOpen: boolean,
                toggle: (event: Event) => void,
              }"
            >
              <slot name="dropdown-icon" v-bind="{ isOpen, toggle }">
                <span class="vsm--arrow_default" />
              </slot>
            </template>
          </sidebar-menu-item>
        </ul>
      </sidebar-menu-scroll>
      <slot name="footer" />
    </div>

    <button
      v-if="!hideToggle"
      class="vsm--toggle-btn"
      :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="onToggleClick"
    >
      <slot name="toggle-icon">
        <span class="vsm--toggle-btn_default" />
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  toRefs,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  provide,
} from 'vue'
import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarMenuScroll from './SidebarMenuScroll.vue'
import type {
  SidebarMenuProps,
  SidebarMenuEmits,
  SidebarItem,
  MobileItem,
  MobileItemRect,
  SidebarItemType,
} from '../types'
import { useProvideSidebar } from '../use/useSidebar'

const props = withDefaults(defineProps<SidebarMenuProps>(), {
  width: '290px',
  widthCollapsed: '65px',
})
const emit = defineEmits<SidebarMenuEmits>()

const { collapsed } = toRefs(props)
const sidebarRef = ref<HTMLElement | null>(null)
const isCollapsed = ref<boolean>(collapsed.value)

const mobileItem: MobileItem = reactive({
  item: null,
  rect: {
    top: 0,
    height: 0,
    padding: [0, 0],
    maxHeight: 0,
    maxWidth: 0,
    dropup: 0,
  },
  timeout: null as ReturnType<typeof setTimeout> | null,
})

const currentRoute = ref<string>('')
const activeShow = ref<string | undefined>(undefined)

const getMobileItem = computed(() => mobileItem.item)
const getMobileItemRect = computed(() => mobileItem.rect)

const sidebarWidth = computed(() =>
  isCollapsed.value ? props.widthCollapsed : props.width
)
const sidebarClass = computed(() => [
  'v-sidebar-menu',
  !isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed',
  props.theme && `vsm_${props.theme}`,
  props.rtl && 'vsm_rtl',
  props.relative && 'vsm_relative',
])

let _idCounter = 0
const nextId = () => `${Date.now()}${_idCounter++}`
function transformItems(items: SidebarItemType[]): SidebarItemType[] {
  if (!items) return []
  return items.map((it) => {
    const base = { ...(it as any), id: (it as any).id ?? nextId() }
    if (base.child) base.child = transformItems(base.child)
    return base
  })
}
const computedMenu = computed(() => transformItems(props.menu))

const clearMobileItemTimeout = () => {
  if (mobileItem.timeout) {
    clearTimeout(mobileItem.timeout)
    mobileItem.timeout = null
  }
}

const updateMobileItem = (item: SidebarItem | null) => {
  mobileItem.item = item
}

const updateMobileItemRect = (rect: MobileItemRect) => {
  for (const key in rect) {
    ;(mobileItem.rect as any)[key] = rect[key as keyof MobileItemRect]
  }
}

const unsetMobileItem = (immediate = true, delay = 800) => {
  if (!getMobileItem.value) return
  clearMobileItemTimeout()
  if (immediate) {
    updateMobileItem(null)
    return
  }
  mobileItem.timeout = setTimeout(() => updateMobileItem(null), delay)
}

const getMobileItemRectFromEl = (
  el: HTMLElement
): MobileItemRect | undefined => {
  if (!sidebarRef.value) return
  const {
    top: elTop,
    bottom: elBottom,
    height: elHeight,
  } = el.getBoundingClientRect()
  const { left: sidebarLeft, right: sidebarRight } =
    sidebarRef.value.getBoundingClientRect()
  const wrapperEl = sidebarRef.value.firstElementChild as HTMLElement
  const { bottom: wrapperBottom, height: wrapperHeight } =
    wrapperEl.getBoundingClientRect()

  const scrollWrapperEl = el.offsetParent as HTMLElement
  const scrollWrapperOffsetTop = scrollWrapperEl.offsetTop
  const { top: scrollWrapperTop, height: scrollWrapperHeight } =
    scrollWrapperEl.getBoundingClientRect()

  let parentHeight = window.innerHeight
  let parentWidth = window.innerWidth
  let parentTop = 0
  let parentRight = parentWidth
  let maxWidth = Math.max(
    parseInt(props.width) - parseInt(props.widthCollapsed),
    0
  )
  const parent = sidebarRef.value.parentElement

  if (parent && props.relative) {
    parentHeight = parent.clientHeight
    parentWidth = parent.clientWidth
    const pRect = parent.getBoundingClientRect()
    parentTop = pRect.top
    parentRight = pRect.right
  }

  const rectWidth = props.rtl
    ? parentWidth - (parentRight - sidebarLeft)
    : parentRight - sidebarRight
  maxWidth = rectWidth <= maxWidth ? rectWidth : maxWidth

  const cs = window.getComputedStyle(el)
  const paddingLeft = parseInt(cs.paddingLeft || '0', 10)
  const paddingRight = parseInt(cs.paddingRight || '0', 10)

  const absoluteTop = elTop - scrollWrapperTop
  const absoluteBottom =
    wrapperBottom -
    elTop -
    (wrapperHeight - (scrollWrapperHeight + scrollWrapperOffsetTop))

  let maxHeight = parentHeight - (elBottom - parentTop)
  const parentVisibleHeight = Math.min(
    window.innerHeight,
    window.innerHeight - parentTop,
    parentHeight,
    parentHeight + parentTop
  )
  const maxVisible =
    parentVisibleHeight - (Math.max(elBottom, 0) - Math.max(parentTop, 0))
  const dropup = maxVisible < parentVisibleHeight * 0.25 ? absoluteBottom : 0
  maxHeight = dropup ? elTop - parentTop : maxHeight

  return {
    top: absoluteTop,
    height: elHeight,
    padding: [paddingLeft, paddingRight],
    maxWidth,
    maxHeight,
    dropup,
  }
}

const setMobileItem = ({
  item,
  itemEl,
}: {
  item: SidebarItem
  itemEl: HTMLElement
}) => {
  clearMobileItemTimeout()
  const linkEl = itemEl.children[0] as HTMLElement
  const rect = getMobileItemRectFromEl(linkEl)
  if (!rect) return
  updateMobileItem(item)
  updateMobileItemRect(rect)
}

const updateCurrentRoute = () => {
  currentRoute.value =
    window.location.pathname + window.location.search + window.location.hash
}

const onItemClick = (event: Event, item: SidebarItem) => {
  emit('item-click', event, item)
}

const updateActiveShow = (id: string | undefined) => {
  activeShow.value = id
}

const updateIsCollapsed = (val: boolean) => {
  isCollapsed.value = val
}

const onToggleClick = () => {
  unsetMobileItem()
  updateIsCollapsed(!isCollapsed.value)
  emit('update:collapsed', isCollapsed.value)
}

const router = getCurrentInstance()?.appContext.config.globalProperties.$router
if (!router) {
  onMounted(() => {
    updateCurrentRoute()
    window.addEventListener('hashchange', updateCurrentRoute)
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange', updateCurrentRoute)
  })
}

watch(
  () => collapsed.value,
  (newValue) => {
    unsetMobileItem()
    updateIsCollapsed(newValue)
  }
)

useProvideSidebar(
  props,
  sidebarRef,
  isCollapsed,
  getMobileItem,
  getMobileItemRect,
  currentRoute,
  updateIsCollapsed,
  setMobileItem,
  unsetMobileItem,
  clearMobileItemTimeout,
  updateCurrentRoute,
  onItemClick
)
// Todo depreciate
provide('onRouteChange', updateCurrentRoute)

defineExpose({
  onRouteChange: updateCurrentRoute,
})
</script>

<style lang="scss">
@use '../scss/vue-sidebar-menu';
</style>
