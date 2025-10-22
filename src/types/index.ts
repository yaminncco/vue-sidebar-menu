export interface SidebarMenuProps {
  /**
   * List of Items in the menu
   * Follow https://github.com/yaminncco/vue-sidebar-menu#item-properties
   */
  menu: Array<SidebarItemType>

  /**
   * Sidebar Collapse state (v-model:collapsed to enable two-way data binding).
   *
   */
  collapsed?: boolean

  /**
   * Sidebar width (expanded).
   * @default 290px
   */
  width?: string

  /**
   * Sidebar width (collapsed).
   * @default 65px
   */
  widthCollapsed?: string

  /**
   * Keep only one child opened at a time (true: first level only, 'deep': all levels)
   *
   */
  showOneChild?: boolean | 'deep'

  /**
   * Keep all child open.
   *
   */
  showChild?: boolean

  /**
   * Position sidebar right to left.
   *
   */
  rtl?: boolean

  /**
   * Make sidebar relative to the parent (by default the sidebar is relative to the viewport).
   *
   */
  relative?: boolean

  /**
   * Hide toggle collapse button.
   *
   */
  hideToggle?: boolean

  /**
   * Sidebar theme (available themes: 'white-theme').
   *
   */
  theme?: '' | 'white-theme'

  /**
   * Disable hover on collapse mode.
   *
   */
  disableHover?: boolean

  /**
   * The name of the custom link component (must be registered globally and define item as a prop)
   *
   */
  linkComponentName?: string

  /**
   * Smooth scroll on item expand
   *
   */
  smoothScroll?: boolean
}

export type SidebarMenuEmits = {
  (e: 'item-click', event: Event, item: SidebarItem): void
  (e: 'update:collapsed', value: boolean): void
}

export interface SidebarItem {
  title: string
  href?: string | object
  icon?: string | ItemIcon
  badge?: ItemBadge
  child?: Array<SidebarItemType>
  disabled?: boolean
  class?: any
  attributes?: object
  hidden?: boolean
  hiddenOnCollapse?: boolean
  external?: boolean
  exact?: boolean
  isActive?: (item: SidebarItem) => boolean
  id?: string
}

export interface SidebarHeaderItem {
  header: string
  hidden?: boolean
  hiddenOnCollapse?: boolean
  class?: any
  attributes?: object
  id?: string
}

export interface SidebarComponentItem {
  component: any
  props?: object
  hidden?: boolean
  hiddenOnCollapse?: boolean
  id?: string
}

export type SidebarItemType =
  | SidebarItem
  | SidebarHeaderItem
  | SidebarComponentItem

export interface ItemIcon {
  element?: any
  class?: any
  attributes?: object
  text?: string
}

export interface ItemBadge {
  element?: any
  class?: any
  attributes?: object
  text?: string
}

/**
 * @internal
 */
export interface MobileItemRect {
  top: number
  height: number
  padding: [number, number]
  maxHeight: number
  maxWidth: number
  dropup: number
}

/**
 * @internal
 */
export interface MobileItem {
  item: SidebarItem | null
  rect: MobileItemRect
  timeout: number | null
}
