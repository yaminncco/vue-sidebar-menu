<template>
  <li
    :class="itemClass"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    v-on="
      isCollapsed && isFirstLevel
        ? { mouseenter: onMouseEnter, mouseleave: onMouseLeave }
        : {}
    "
  >
    <component
      :is="linkComponentName ? linkComponentName : SidebarMenuLink"
      :item="item"
      :class="linkClass"
      v-bind="linkAttrs"
      @click="onLinkClick"
    >
      <template v-if="isCollapsed && isFirstLevel">
        <transition name="slide-animation">
          <div
            v-if="hover"
            class="vsm--mobile-bg"
            :style="mobileItemBackgroundStyle"
          />
        </transition>
      </template>

      <sidebar-menu-icon v-if="item.icon" :icon="item.icon" />

      <div
        :class="[
          'vsm--title',
          isCollapsed && isFirstLevel && !isMobileItem && 'vsm--title_hidden',
        ]"
        :style="isMobileItem && mobileItemStyle"
      >
        <span>{{ item.title }}</span>
        <sidebar-menu-badge v-if="item.badge" :badge="item.badge" />

        <div
          v-if="hasChild"
          :class="['vsm--arrow', { 'vsm--arrow_open': show }]"
          @click.stop="onDropdownIconClick"
        >
          <slot
            name="dropdown-icon"
            v-bind="{ isOpen: show, toggle: onDropdownIconClick }"
          />
        </div>
      </div>
    </component>

    <template v-if="hasChild">
      <transition
        :appear="isMobileItem"
        name="expand"
        @enter="onExpandEnter"
        @after-enter="onExpandAfterEnter"
        @before-leave="onExpandBeforeLeave"
        @after-leave="onExpandAfterLeave"
      >
        <div
          v-if="show"
          :class="['vsm--child', isMobileItem && 'vsm--child_mobile']"
          :style="isMobileItem && mobileItemDropdownStyle"
          v-bind="childAttrs"
        >
          <ul class="vsm--dropdown">
            <sidebar-menu-item
              v-for="subItem in item.child"
              :key="subItem.id"
              :item="subItem"
              :level="level + 1"
              :active-show="subActiveShow"
              @update-active-show="updateSubActiveShow"
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
            </sidebar-menu-item>
          </ul>
        </div>
      </transition>
    </template>
  </li>
</template>

<script lang="ts">
interface Props {
  item: SidebarItem
  level: number
  activeShow?: string
}

export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup lang="ts">
import {
  ref,
  toRefs,
  computed,
  watch,
  getCurrentInstance,
  nextTick,
  inject,
} from 'vue'
import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarMenuLink from './SidebarMenuLink.vue'
import SidebarMenuIcon from './SidebarMenuIcon.vue'
import SidebarMenuBadge from './SidebarMenuBadge.vue'
import { useSidebar } from '../use/useSidebar'
import {
  activeRecordIndex,
  isSameRouteLocationParams,
  includesParams,
} from '../use/useRouterLink'
import type { StyleValue } from 'vue'
import type { SidebarItem, SidebarItemType } from '../types'

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update-active-show', value: string | undefined): void
}>()

const {
  getSidebarRef,
  getSidebarProps: sidebarProps,
  getIsCollapsed: isCollapsed,
  getMobileItem: mobileItem,
  getMobileItemRect: mobileItemRect,
  getCurrentRoute: currentRoute,
  setMobileItem,
  unsetMobileItem,
  clearMobileItemTimeout,
  emitItemClick,
} = useSidebar()!

const { linkComponentName } = toRefs(sidebarProps)
const { item, activeShow, level } = toRefs(props)

const subActiveShow = ref<string | undefined>(undefined)

const isFirstLevel = computed(() => level.value === 1)

const updateSubActiveShow = (id: string | undefined) => {
  subActiveShow.value = id
}

const router = getCurrentInstance()?.appContext.config.globalProperties.$router

const handleScrollUpdate = inject('SidebarMenuScroll') as () => void

const itemShow = ref(false)
const itemHover = ref(false)

const isLinkActive = (itemVal: SidebarItem, exact?: boolean) => {
  if (itemVal.isActive && typeof itemVal.isActive === 'function') {
    const isActive = itemVal.isActive(itemVal)
    if (typeof isActive === 'boolean') return isActive
  }
  if (!itemVal.href || itemVal.external) return false
  if (router) {
    const route = router.resolve(itemVal.href)
    const routerCurrentRoute = router.currentRoute.value
    const activeIndex = activeRecordIndex(route, routerCurrentRoute)
    if (exact || itemVal.exact) {
      return (
        activeIndex > -1 &&
        activeIndex === routerCurrentRoute.matched.length - 1 &&
        isSameRouteLocationParams(routerCurrentRoute.params, route.params)
      )
    }
    return (
      activeIndex > -1 &&
      includesParams(routerCurrentRoute.params, route.params)
    )
  } else {
    return itemVal.href === currentRoute.value
  }
}

const isChildActive = (child?: SidebarItemType[]): boolean => {
  if (!child) return false
  return child.some((childItem) => {
    return (
      isLinkItem(childItem) &&
      (isLinkActive(childItem) || isChildActive(childItem.child))
    )
  })
}

const active = computed(
  () => isLinkActive(item.value) || isChildActive(item.value.child)
)
const exactActive = computed(() => isLinkActive(item.value, true))

const onLinkClick = (event: Event) => {
  if (!item.value.href || item.value.disabled) {
    event.preventDefault()
    if (item.value.disabled) return
  }

  emitMobileItem(event, (event.currentTarget as HTMLElement).parentElement!)

  if (hasChild.value) {
    if (!item.value.href || active.value) {
      show.value = !show.value
    }
  }

  emitItemClick(event, item.value)
}

const onDropdownIconClick = (event: Event) => {
  event.stopPropagation()
  event.preventDefault()
  if (item.value.disabled) return

  if (hasChild.value) {
    show.value = !show.value
  }

  emitItemClick(event, item.value)
}

const onMouseOver = (event: MouseEvent) => {
  if (item.value.disabled) return
  event.stopPropagation()
  itemHover.value = true
}

const onMouseOut = (event: MouseEvent) => {
  event.stopPropagation()
  itemHover.value = false
}

const onMouseEnter = (event: MouseEvent) => {
  if (item.value.disabled) return
  if (sidebarProps.disableHover) {
    if (isMobileItem.value && hasChild.value) {
      clearMobileItemTimeout()
    }
  } else {
    clearMobileItemTimeout()
    emitMobileItem(event, event.currentTarget as HTMLElement)
  }
}

const onMouseLeave = () => {
  if (sidebarProps.disableHover && !hasChild.value) return
  if (isMobileItem.value) {
    unsetMobileItem(false, !sidebarProps.disableHover ? 300 : undefined)
  }
}

const emitMobileItem = (event: Event, itemEl: HTMLElement) => {
  if (isMobileItem.value) return
  if (!isCollapsed.value) return
  setTimeout(() => {
    if (isFirstLevel.value && !isMobileItem.value) {
      setMobileItem({ item: item.value, itemEl })
    }
    if (event.type === 'click' && !hasChild.value) {
      unsetMobileItem(false, !isFirstLevel.value ? 300 : undefined)
    }
  }, 0)
}

const onExpandEnter = (el: Element) => {
  ;(el as HTMLElement).style.height = el.scrollHeight + 'px'
}

const onExpandAfterEnter = (el: Element) => {
  ;(el as HTMLElement).style.height = 'auto'
  if (!isCollapsed.value) {
    if (sidebarProps.smoothScroll) {
      const sidebarWrapper = getSidebarRef.value?.children[0]
      const itemEl = el.parentElement
      if (sidebarWrapper && itemEl) {
        const itemBottom = itemEl.getBoundingClientRect().bottom
        const wrapperBottom = sidebarWrapper.getBoundingClientRect().bottom
        if (itemBottom > wrapperBottom) {
          nextTick(() =>
            itemEl.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            })
          )
        }
      }
    }

    handleScrollUpdate()
  }
}

const onExpandBeforeLeave = (el: Element) => {
  if (isCollapsed.value && isFirstLevel.value) {
    ;(el as HTMLElement).style.display = 'none'
    return
  }
  ;(el as HTMLElement).style.height = el.scrollHeight + 'px'
}

const onExpandAfterLeave = () => {
  if (!isCollapsed.value) handleScrollUpdate()
}

function isLinkItem(itemVal: SidebarItemType): itemVal is SidebarItem {
  return !('header' in itemVal) && !('component' in itemVal)
}

const show = computed({
  get: () => {
    if (!hasChild.value) return false
    if (isCollapsed.value && isFirstLevel.value) return hover.value
    if (sidebarProps.showChild) return true
    if (
      (sidebarProps.showOneChild && isFirstLevel.value) ||
      sidebarProps.showOneChild === 'deep'
    ) {
      return item.value.id === activeShow.value
    }
    return itemShow.value
  },
  set: (val: boolean) => {
    if (
      (sidebarProps.showOneChild && isFirstLevel.value) ||
      sidebarProps.showOneChild === 'deep'
    ) {
      emit('update-active-show', val ? item.value.id : undefined)
    }
    itemShow.value = val
  },
})

const hover = computed(() =>
  isCollapsed.value && isFirstLevel.value ? isMobileItem.value : itemHover.value
)

const hasChild = computed(() => {
  return 'child' in item.value && !!item.value.child?.length
})

const linkClass = computed(() => [
  'vsm--link',
  `vsm--link_level-${level.value}`,
  {
    'vsm--link_mobile': isMobileItem.value,
    'vsm--link_hover': hover.value,
    'vsm--link_active': active.value,
    'vsm--link_disabled': item.value.disabled,
    'vsm--link_open': show.value,
  },
  item.value.class,
])

const linkAttrs = computed(() => {
  const href = item.value.href ? item.value.href : '#'
  const target = item.value.external ? '_blank' : '_self'
  const tabindex = item.value.disabled ? -1 : null
  const ariaCurrent = exactActive.value ? 'page' : null
  const ariaExpanded = hasChild.value ? show.value : null
  const ariaControls = ariaExpanded ? `vsm-${props.item.id}` : null

  return {
    href,
    target,
    tabindex,
    'aria-current': ariaCurrent,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    ...item.value.attributes,
  }
})

const childAttrs = computed(() => ({ id: `vsm-${item.value.id}` }))

const itemClass = computed(() => [
  'vsm--item',
  { 'vsm--item_mobile': isMobileItem.value },
])

const isMobileItem = computed(() => props.item.id === mobileItem.value?.id)

const sidePos = (value: string) =>
  !sidebarProps.rtl ? { left: value } : { right: value }

const mobileItemDropdownStyle = computed<StyleValue>(() => {
  return {
    position: 'absolute',
    'max-height': `${mobileItemRect.value.maxHeight}px`,
    width: `${mobileItemRect.value.maxWidth}px`,
    'overflow-y': 'auto',
    'z-index': '20',
    ...(!mobileItemRect.value.dropup
      ? { top: `${mobileItemRect.value.top + mobileItemRect.value.height}px` }
      : { bottom: `${mobileItemRect.value.dropup}px` }),
    ...sidePos(sidebarProps.widthCollapsed!),
  }
})

const mobileItemStyle = computed<StyleValue>(() => ({
  position: 'absolute',
  top: `${mobileItemRect.value.top}px`,
  ...sidePos(sidebarProps.widthCollapsed!),
  width: `${mobileItemRect.value.maxWidth}px`,
  height: `${mobileItemRect.value.height}px`,
  'padding-left': `${mobileItemRect.value.padding[0]}px`,
  'padding-right': `${mobileItemRect.value.padding[1]}px`,
  'z-index': '20',
}))

const mobileItemBackgroundStyle = computed<StyleValue>(() => ({
  position: 'absolute',
  top: `${mobileItemRect.value.top}px`,
  ...(!sidebarProps.rtl ? { left: '0px' } : { right: '0px' }),
  width: `${
    mobileItemRect.value.maxWidth + parseInt(sidebarProps.widthCollapsed!)
  }px`,
  height: `${mobileItemRect.value.height}px`,
  'z-index': '10',
}))

watch(
  () => active.value,
  (isActive) => {
    if (isActive) {
      show.value = true
    }
  },
  { immediate: true }
)
</script>
