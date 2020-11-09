import { getCurrentInstance, computed, ref, inject, nextTick } from 'vue'
import useMenu from './useMenu'
import useRouterLink from './useRouterLink'

const activeShow = ref(null)

export default function useItem (props) {
  const node = getCurrentInstance().ctx
  const router = getCurrentInstance().ctx.$router
  const { activeRecordIndex, isSameRouteLocationParams } = useRouterLink(router)
  const currentLocation = ref('')

  const emitItemClick = inject('emitItemClick')
  const { props: sidebarProps, isCollapsed, mobileItem, setMobileItem, unsetMobileItem } = useMenu()

  const itemShow = ref(false)
  const itemHover = ref(false)

  const active = computed(() => {
    return isLinkActive(props.item) || isChildActive(props.item.child)
  })

  const exactActive = computed(() => {
    return isLinkActive(props.item)
  })

  const isLinkActive = (item) => {
    if (!item.href || item.external) return false
    if (router) {
      const route = router.resolve(item.href)
      return activeRecordIndex(route) > -1 &&
        activeRecordIndex(route) === router.currentRoute.value.matched.length - 1 &&
        isSameRouteLocationParams(router.currentRoute.value.params, route.params)
    } else {
      return item.href === currentLocation.value
    }
  }

  const isChildActive = (child) => {
    if (!child) return false
    return child.some(item => {
      return isLinkActive(item) || isChildActive(item.child)
    })
  }

  const onRouteChange = () => {
    currentLocation.value = window.location.pathname + window.location.search + window.location.hash
    if (sidebarProps.showChild || props.isMobileItem) return
    if (active.value) {
      show.value = true
    }
  }

  const onLinkClick = (event) => {
    if (props.item.disabled) return
    if (!props.item.href) {
      event.preventDefault()
    }

    emitItemClick(event, props.item, node)

    emitMobileItem(event, event.currentTarget.offsetParent)

    if (!hasChild.value || sidebarProps.showChild || props.isMobileItem) return
    if (props.item.href && !exactActive.value) return
    show.value = !show.value
  }

  const onMouseOver = (event) => {
    if (props.item.disabled) return
    event.stopPropagation()
    itemHover.value = true
    emitMobileItem(event, event.currentTarget)
  }

  const onMouseOut = (event) => {
    event.stopPropagation()
    itemHover.value = false
  }

  const emitMobileItem = (event, itemEl) => {
    if (hover.value) return
    if (isCollapsed.value && isFirstLevel.value && !props.isMobileItem) {
      if (mobileItem.value) {
        unsetMobileItem(true)
      }
      nextTick(() => {
        if (mobileItem.value !== props.item) {
          setMobileItem({ item: props.item, itemEl })
        }
        if (mobileItem.value) {
          if (event.type === 'click' && !hasChild.value) {
            setTimeout(() => {
              unsetMobileItem(false)
            }, 0)
          }
        }
      })
    }
  }

  const onExpandEnter = (el) => {
    el.style.height = el.scrollHeight + 'px'
  }

  const onExpandAfterEnter = (el) => {
    el.style.height = 'auto'
  }

  const onExpandBeforeLeave = (el) => {
    if (isCollapsed.value && isFirstLevel.value) {
      el.style.display = 'none'
      return
    }
    el.style.height = el.scrollHeight + 'px'
  }

  const show = computed({
    get: () => {
      if (!hasChild.value) return false
      if (sidebarProps.showChild || props.isMobileItem) return true
      return sidebarProps.showOneChild && isFirstLevel.value ? props.item === activeShow.value : itemShow.value
    },
    set: show => {
      if (sidebarProps.showOneChild && isFirstLevel.value) {
        show ? activeShow.value = props.item : activeShow.value = null
      }
      itemShow.value = show
    }
  })

  const hover = computed(() => {
    if (isCollapsed.value && isFirstLevel.value) {
      return props.item === mobileItem.value
    } else {
      return itemHover.value
    }
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
      !props.isMobileItem ? `vsm--link_level-${props.level}` : '',
      { 'vsm--link_mobile-item': props.isMobileItem },
      { 'vsm--link_hover': hover.value },
      { 'vsm--link_active': active.value },
      { 'vsm--link_disabled': props.item.disabled },
      props.item.class
    ]
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
    onRouteChange,
    onLinkClick,
    onMouseOver,
    onMouseOut,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave
  }
}
