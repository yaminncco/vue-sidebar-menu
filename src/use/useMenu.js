import { ref, reactive, computed } from 'vue'

const isCollapsed = ref(false)
const sidebarMenuRef = ref(null)
const mobileItem = ref(null)
const mobileItemRect = reactive({
  top: 0,
  height: 0
})
const parentRect = reactive({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})
const mobileItemTimeout = ref(null)
const currentRoute = ref(window.location.pathname + window.location.search + window.location.hash)

export default function useMenu (props, context) {
  const sidebarWidth = computed(() => {
    return isCollapsed.value ? props.widthCollapsed : props.width
  })

  const sidebarClass = computed(() => {
    return [
      !isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed',
      props.theme ? `vsm_${props.theme}` : '',
      props.rtl ? 'vsm_rtl' : '',
      props.relative ? 'vsm_relative' : ''
    ]
  })

  const mobileItemStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: `${mobileItemRect.top}px` },
      props.rtl ? { right: '0px' } : { left: '0px' },
      props.rtl ? { 'padding-right': sidebarWidth.value } : { 'padding-left': sidebarWidth.value },
      props.rtl && { direction: 'rtl' },
      { 'z-index': 0 },
      { width: `${parentRect.width - parentRect.left}px` },
      { 'max-width': props.width }
    ]
  })

  const mobileItemDropdownStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: `${mobileItemRect.height}px` },
      { width: '100%' },
      { 'max-height': `${parentRect.height - (mobileItemRect.top + mobileItemRect.height) - parentRect.top}px` },
      { 'overflow-y': 'auto' }
    ]
  })

  const mobileItemBackgroundStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: '0px' },
      { left: '0px' },
      { right: '0px' },
      { width: '100%' },
      { height: `${mobileItemRect.height}px` },
      { 'z-index': -1 }
    ]
  })

  const onMouseLeave = () => {
    unsetMobileItem(false, 300)
  }

  const onMouseEnter = () => {
    if (isCollapsed.value) {
      if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value)
    }
  }

  const onToggleClick = () => {
    unsetMobileItem()
    isCollapsed.value = !isCollapsed.value
    context.emit('update:collapsed', isCollapsed.value)
  }

  const onItemClick = (event, item) => {
    context.emit('item-click', event, item)
  }

  const onRouteChange = () => {
    currentRoute.value = window.location.pathname + window.location.search + window.location.hash
  }

  const setMobileItem = ({ item, itemEl }) => {
    if (mobileItem.value === item) return
    const sidebarEl = sidebarMenuRef.value
    const sidebarTop = sidebarEl.getBoundingClientRect().top
    const itemLinkEl = itemEl.children[0]
    const { top, height } = itemLinkEl.getBoundingClientRect()

    updateParentRect()
    mobileItem.value = item
    mobileItemRect.top = top - sidebarTop
    mobileItemRect.height = height
  }

  const unsetMobileItem = (immediate = true, delay = 800) => {
    if (!mobileItem.value) return
    if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value)
    if (immediate) {
      mobileItem.value = null
      return
    }
    mobileItemTimeout.value = setTimeout(() => {
      mobileItem.value = null
    }, delay)
  }

  const updateParentRect = () => {
    const sidebarEl = sidebarMenuRef.value
    const { top: sidebarTop, left: sidebarLeft, right: sidebarRight } = sidebarEl.getBoundingClientRect()
    const parent = props.relative ? sidebarEl.parentElement : document.documentElement
    parentRect.height = parent.clientHeight
    parentRect.width = parent.clientWidth
    if (props.relative) {
      const { top: parentTop, left: parentLeft } = parent.getBoundingClientRect()
      parentRect.top = sidebarTop - (parentTop + parent.clientTop)
      parentRect.left = props.rtl ? parentRect.width - sidebarRight + (parentLeft + parent.clientLeft) : sidebarLeft - (parentLeft + parent.clientLeft)
    } else {
      parentRect.top = sidebarTop
      parentRect.left = props.rtl ? parentRect.width - sidebarRight : sidebarLeft
    }
  }

  return {
    sidebarMenuRef,
    isCollapsed,
    sidebarWidth,
    sidebarClass,
    currentRoute,
    onMouseLeave,
    onMouseEnter,
    onToggleClick,
    onItemClick,
    onRouteChange,
    mobileItem,
    mobileItemStyle,
    mobileItemDropdownStyle,
    mobileItemBackgroundStyle,
    setMobileItem,
    unsetMobileItem,
    mobileItemTimeout
  }
}
