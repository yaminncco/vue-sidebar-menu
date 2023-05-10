import { ref, computed, inject, provide, reactive, toRefs } from 'vue'

export const initSidebar = (props, context) => {
  const { collapsed, relative, width, widthCollapsed, rtl } = toRefs(props)

  const sidebarRef = ref(null)
  const isCollapsed = ref(collapsed.value)
  const activeShow = ref(null)
  const mobileItem = reactive({
    item: null,
    rect: {
      top: 0,
      height: 0,
      padding: '',
      maxHeight: 0,
      maxWidth: 0,
    },
    timeout: null,
  })
  const getMobileItem = computed(() => mobileItem.item)
  const getMobileItemRect = computed(() => mobileItem.rect)
  const currentRoute = ref(
    window.location.pathname + window.location.search + window.location.hash
  )

  const updateIsCollapsed = (val) => {
    isCollapsed.value = val
  }

  const updateActiveShow = (id) => {
    activeShow.value = id
  }

  const setMobileItem = ({ item, itemEl }) => {
    clearMobileItemTimeout()
    const linkEl = itemEl.children[0]
    const {
      top: linkTop,
      bottom: linkBottom,
      height: linkHeight,
    } = linkEl.getBoundingClientRect()
    const { left: sidebarLeft, right: sidebarRight } =
      sidebarRef.value.getBoundingClientRect()
    const offsetParentTop = linkEl.offsetParent.getBoundingClientRect().top

    let parentHeight = window.innerHeight
    let parentWidth = window.innerWidth
    let parentTop = 0
    let parentRight = parentWidth
    const maxWidth = parseInt(width.value) - parseInt(widthCollapsed.value)
    if (relative.value) {
      const parent = sidebarRef.value.parentElement
      parentHeight = parent.clientHeight
      parentWidth = parent.clientWidth
      parentTop = parent.getBoundingClientRect().top
      parentRight = parent.getBoundingClientRect().right
    }

    const rectWidth = rtl.value
      ? parentWidth - (parentRight - sidebarLeft)
      : parentRight - sidebarRight

    updateMobileItem(item)
    updateMobileItemRect({
      top: linkTop - offsetParentTop,
      height: linkHeight,
      padding: window.getComputedStyle(linkEl).paddingRight,
      maxWidth: rectWidth <= maxWidth ? rectWidth : maxWidth,
      maxHeight: parentHeight - (linkBottom - parentTop),
    })
  }

  const unsetMobileItem = (immediate = true, delay = 800) => {
    if (!getMobileItem.value) return
    clearMobileItemTimeout()
    if (immediate) {
      updateMobileItem(null)
      return
    }
    mobileItem.timeout = setTimeout(() => {
      updateMobileItem(null)
    }, delay)
  }

  const clearMobileItemTimeout = () => {
    if (mobileItem.timeout) clearTimeout(mobileItem.timeout)
  }

  const updateMobileItem = (item) => {
    mobileItem.item = item
  }

  const updateMobileItemRect = ({
    top,
    height,
    padding,
    maxWidth,
    maxHeight,
  }) => {
    mobileItem.rect.top = top
    mobileItem.rect.height = height
    mobileItem.rect.padding = padding
    mobileItem.rect.maxWidth = maxWidth
    mobileItem.rect.maxHeight = maxHeight
  }

  const updateCurrentRoute = () => {
    const route =
      window.location.pathname + window.location.search + window.location.hash
    currentRoute.value = route
  }

  const onItemClick = (event, item) => {
    context.emit('item-click', event, item)
  }

  provide('vsmProps', props)
  provide('getSidebarRef', sidebarRef)
  provide('getIsCollapsed', isCollapsed)
  provide('getActiveShow', activeShow)
  provide('getMobileItem', getMobileItem)
  provide('getMobileItemRect', getMobileItemRect)
  provide('getCurrentRoute', currentRoute)

  provide('updateIsCollapsed', updateIsCollapsed)
  provide('updateActiveShow', updateActiveShow)
  provide('setMobileItem', setMobileItem)
  provide('unsetMobileItem', unsetMobileItem)
  provide('clearMobileItemTimeout', clearMobileItemTimeout)
  provide('onRouteChange', updateCurrentRoute)
  provide('emitItemClick', onItemClick)

  return {
    getSidebarRef: sidebarRef,
    getIsCollapsed: isCollapsed,
    getActiveShow: activeShow,
    getMobileItem,
    getMobileItemRect,
    getCurrentRoute: currentRoute,
    updateIsCollapsed,
    updateActiveShow,
    setMobileItem,
    unsetMobileItem,
    clearMobileItemTimeout,
    updateCurrentRoute,
    onItemClick,
  }
}

export const useSidebar = () => ({
  getSidebarProps: inject('vsmProps'),
  getSidebarRef: inject('getSidebarRef'),
  getIsCollapsed: inject('getIsCollapsed'),
  getActiveShow: inject('getActiveShow'),
  getMobileItem: inject('getMobileItem'),
  getMobileItemRect: inject('getMobileItemRect'),
  getCurrentRoute: inject('getCurrentRoute'),
  updateIsCollapsed: inject('updateIsCollapsed'),
  updateActiveShow: inject('updateActiveShow'),
  setMobileItem: inject('setMobileItem'),
  unsetMobileItem: inject('unsetMobileItem'),
  clearMobileItemTimeout: inject('clearMobileItemTimeout'),
  onRouteChange: inject('onRouteChange'),
  emitItemClick: inject('emitItemClick'),
})
