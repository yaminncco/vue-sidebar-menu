import { getCurrentInstance, computed, ref, inject } from 'vue'
import useMenu from './useMenu'
import { activeRecordIndex, isSameRouteLocationParams, includesParams } from './useRouterLink'

const activeShow = ref(null)

export default function useItem (props) {
  const router = getCurrentInstance().appContext.config.globalProperties.$router
  const sidebarProps = inject('vsm-props')
  const emitItemClick = inject('emitItemClick')
  const emitScrollUpdate = inject('emitScrollUpdate')
  const { isCollapsed, currentRoute, mobileItem, setMobileItem, unsetMobileItem, mobileItemTimeout } = useMenu(sidebarProps)

  const itemShow = ref(false)
  const itemHover = ref(false)

  const active = computed(() => {
    return isLinkActive(props.item) || isChildActive(props.item.child)
  })

  const exactActive = computed(() => {
    return isLinkActive(props.item, true)
  })

  const isLinkActive = (item, exact) => {
    if (!item.href || item.external) return false
    if (router) {
      const route = router.resolve(item.href)
      const routerCurrentRoute = router.currentRoute.value
      const activeIndex = activeRecordIndex(route, routerCurrentRoute)
      if (exact || item.exact) {
        return activeIndex > -1 &&
        activeIndex === routerCurrentRoute.matched.length - 1 &&
          isSameRouteLocationParams(routerCurrentRoute.params, route.params)
      }
      return activeIndex > -1 &&
      includesParams(routerCurrentRoute.params, route.params)
    } else {
      return item.href === currentRoute.value
    }
  }

  const isChildActive = (child) => {
    if (!child) return false
    return child.some(item => {
      return isLinkActive(item) || isChildActive(item.child)
    })
  }

  const onLinkClick = (event) => {
    if (!props.item.href || props.item.disabled) {
      event.preventDefault()
      if (props.item.disabled) return
    }

    emitMobileItem(event, event.currentTarget.parentElement)

    if (hasChild.value) {
      if (!props.item.href || active.value) {
        show.value = !show.value
      }
    }

    emitItemClick(event, props.item)
  }

  const onMouseOver = (event) => {
    if (props.item.disabled) return
    event.stopPropagation()
    itemHover.value = true
  }

  const onMouseOut = (event) => {
    event.stopPropagation()
    itemHover.value = false
  }

  const onMouseEnter = (event) => {
    if (props.item.disabled) return
    if (isMobileItem.value && ((sidebarProps.disableHover && hasChild.value) || !sidebarProps.disableHover)) {
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value)
    }
    if (!sidebarProps.disableHover) {
      emitMobileItem(event, event.currentTarget)
    }
  }

  const onMouseLeave = () => {
    if (sidebarProps.disableHover && !hasChild.value) return
    let delay
    if (!sidebarProps.disableHover) {
      delay = 300
    }
    unsetMobileItem(false, delay)
  }

  const emitMobileItem = (event, itemEl) => {
    if (hover.value) return
    if (isCollapsed.value && isFirstLevel.value) {
      setTimeout(() => {
        if (mobileItem.value?.id !== props.item.id) {
          setMobileItem({ item: props.item, itemEl })
          show.value = true
        }
        if (event.type === 'click' && !hasChild.value) {
          unsetMobileItem(false)
        }
      }, 0)
    }
  }

  const onExpandEnter = (el) => {
    el.style.height = el.scrollHeight + 'px'
  }

  const onExpandAfterEnter = (el) => {
    el.style.height = 'auto'
    if (!isCollapsed.value) {
      emitScrollUpdate()
    }
  }

  const onExpandBeforeLeave = (el) => {
    if (isCollapsed.value && isFirstLevel.value) {
      el.style.display = 'none'
      return
    }
    el.style.height = el.scrollHeight + 'px'
  }

  const onExpandAfterLeave = () => {
    if (!isCollapsed.value) {
      emitScrollUpdate()
    }
  }

  const show = computed({
    get: () => {
      if (!hasChild.value) return false
      if (isCollapsed.value && isFirstLevel.value) return hover.value
      if (sidebarProps.showChild) return true
      return sidebarProps.showOneChild && isFirstLevel.value ? props.item.id === activeShow.value?.id : itemShow.value
    },
    set: show => {
      if (sidebarProps.showOneChild && isFirstLevel.value) {
        show ? activeShow.value = props.item : activeShow.value = null
      }
      itemShow.value = show
    }
  })

  const hover = computed(() => {
    return (isCollapsed.value && isFirstLevel.value) ? props.item.id === mobileItem.value?.id : itemHover.value
  })

  const isFirstLevel = computed(() => {
    return props.level === 1
  })

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

  const hasChild = computed(() => {
    return !!(props.item.child && props.item.child.length > 0)
  })

  const linkClass = computed(() => {
    return [
      'vsm--link',
      `vsm--link_level-${props.level}`,
      { 'vsm--link_mobile': isMobileItem.value },
      { 'vsm--link_hover': hover.value },
      { 'vsm--link_active': active.value },
      { 'vsm--link_disabled': props.item.disabled },
      { 'vsm--link_open': show.value },
      props.item.class
    ]
  })

  const linkAttrs = computed(() => {
    const href = props.item.href ? props.item.href : '#'
    const target = props.item.external ? '_blank' : '_self'
    const tabindex = props.item.disabled ? -1 : null
    const ariaCurrent = exactActive.value ? 'page' : null
    const ariaHaspopup = hasChild.value ? true : null
    const ariaExpanded = show.value ? true : null

    return {
      href,
      target,
      tabindex,
      'aria-current': ariaCurrent,
      'aria-haspopup': ariaHaspopup,
      'aria-expanded': ariaExpanded,
      ...props.item.attributes
    }
  })

  const itemClass = computed(() => {
    return [
      'vsm--item',
      { 'vsm--item_mobile': isMobileItem.value }
    ]
  })

  const isMobileItem = computed(() => {
    return isCollapsed.value && isFirstLevel.value && hover.value
  })

  return {
    active,
    exactActive,
    activeShow,
    show,
    hover,
    isFirstLevel,
    isHidden,
    hasChild,
    linkClass,
    linkAttrs,
    itemClass,
    isMobileItem,
    onLinkClick,
    onMouseOver,
    onMouseOut,
    onMouseEnter,
    onMouseLeave,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
    onExpandAfterLeave
  }
}
