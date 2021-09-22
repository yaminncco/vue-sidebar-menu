import { ref, reactive, computed } from 'vue'

const isCollapsed = ref(false)
const sidebarMenuRef = ref(null)
const mobileItem = ref(null)
const mobileItemRect = reactive({
  top: 0,
  height: 0,
  padding: '',
  maxHeight: 0,
  maxWidth: 0
})
const mobileItemTimeout = ref(null)
const currentRoute = ref(window.location.pathname + window.location.search + window.location.hash)

export default function useMenu (props, context) {
  let id = 0
  function transformItems (items) {
    return items.map(item => {
      if (item.child) {
        return { ...item, id: id++, child: transformItems(item.child) }
      }
      return { ...item, id: id++ }
    })
  }
  const computedMenu = computed(() => {
    return transformItems(props.menu)
  })

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

  const mobileItemDropdownStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: `${mobileItemRect.top + mobileItemRect.height}px` },
      !props.rtl ? { left: props.widthCollapsed } : { right: props.widthCollapsed },
      { width: `${mobileItemRect.maxWidth}px` },
      { 'max-height': `${mobileItemRect.maxHeight}px` },
      { 'overflow-y': 'auto' }
    ]
  })

  const mobileItemStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: `${mobileItemRect.top}px` },
      !props.rtl ? { left: props.widthCollapsed } : { right: props.widthCollapsed },
      { width: `${mobileItemRect.maxWidth}px` },
      { height: `${mobileItemRect.height}px` },
      { 'padding-right': `${mobileItemRect.padding}` },
      { 'padding-left': `${mobileItemRect.padding}` },
      { 'z-index': '20' }
    ]
  })

  const mobileItemBackgroundStyle = computed(() => {
    return [
      { position: 'absolute' },
      { top: `${mobileItemRect.top}px` },
      !props.rtl ? { left: '0px' } : { right: '0px' },
      { width: `${mobileItemRect.maxWidth + parseInt(props.widthCollapsed)}px` },
      { height: `${mobileItemRect.height}px` },
      { 'z-index': '10' }
    ]
  })

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
    if (mobileItemTimeout.value) clearTimeout(mobileItemTimeout.value)
    const itemLinkEl = itemEl.children[0]
    const { top, bottom, height } = itemLinkEl.getBoundingClientRect()
    const { left: sidebarLeft, right: sidebarRight } = sidebarMenuRef.value.getBoundingClientRect()
    const offsetTop = itemLinkEl.offsetParent.getBoundingClientRect().top
    let parentHeight
    let parentWidth
    let parentTop = 0
    let width = 0
    const maxWidth = parseInt(props.width) - parseInt(props.widthCollapsed)
    if (props.relative) {
      const parent = sidebarMenuRef.value.parentElement
      parentHeight = parent.clientHeight
      parentWidth = parent.clientWidth
      parentTop = parent.getBoundingClientRect().top
      width = props.rtl ? parentWidth - (parent.getBoundingClientRect().right - sidebarLeft) : parent.getBoundingClientRect().right - sidebarRight
    } else {
      parentHeight = window.innerHeight
      parentWidth = window.innerWidth
      width = props.rtl ? parentWidth - (parentWidth - sidebarLeft) : parentWidth - sidebarRight
    }
    mobileItem.value = item
    mobileItemRect.top = top - offsetTop
    mobileItemRect.height = height
    mobileItemRect.padding = window.getComputedStyle(itemLinkEl).paddingRight
    mobileItemRect.maxWidth = width <= maxWidth ? width : maxWidth
    mobileItemRect.maxHeight = parentHeight - (bottom - parentTop)
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

  return {
    sidebarMenuRef,
    isCollapsed,
    computedMenu,
    sidebarWidth,
    sidebarClass,
    currentRoute,
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
