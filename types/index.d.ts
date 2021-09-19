import { App } from 'vue';

export interface ItemIcon {
  element?: string;

  class?: string;

  attributes?: object;

  text?: string;
}

export interface ItemBadge {
  text?: string;

  element?: string;

  class?: string;

  attributes?: object;
}

export interface SidebarItem {
  href: string | object;

  title: string;

  icon?: string | ItemIcon;

  badge?: ItemBadge;

  child?: Array<SidebarItem | SidebarComponentItem | SidebarHeaderItem>;

  disabled?: boolean;

  class?: string;

  attributes?: object;

  hidden?: boolean;

  hiddenOnCollapse?: boolean;

  external?: boolean;

  exact?: boolean;
}

export interface SidebarHeaderItem {
  header: string;

  hidden?: boolean;

  hiddenOnCollapse?: boolean;

  class?: string;

  attributes?: object;
}

export interface SidebarComponentItem {
  component: string;

  props?: object;

  hidden?: boolean;

  hiddenOnCollapse?: boolean;
}

export class SidebarMenu {
  /**
   * List of Items in the menu
   * Follow https://github.com/yaminncco/vue-sidebar-menu#item-properties
   */
  menu: Array<SidebarItem | SidebarComponentItem | SidebarHeaderItem>;

  /**
   * Sidebar Collapse state (v-model:collapsed to enable two-way data binding).
   * by default false
   */
  collapsed?: boolean;

  /**
   * Sidebar width (expanded).
   * by default 290px
   */
  width?: string;

  /**
   * Sidebar width (collapsed).
   *  by default 65px
   */
  widthCollapsed?: string;

  /**
   * Keep only one child opened at a time (first level only).
   * by default false
   */
  showOneChild?: boolean;

  /**
   * Keep all child open.
   * by default false
   */
  showChild?: boolean;

  /**
   * Position sidebar right to left.
   * by default false
   */
  rtl?: boolean;

  /**
   * Make sidebar relative to the parent (by default the sidebar is relative to the viewport).
   * by default false
   */
  relative?: boolean;

  /**
   * Hide toggle collapse button.
   * by default false.
   */
  hideToggle?: boolean;

  /**
   * Sidebar theme (available themes: 'white-theme').
   *
   */
  theme?: string;

  /**
   * Disable hover on collapse mode.
   * by default false.
   */
  disableHover?: boolean;

  /**
   * The name of the custom link component (must be registered globally and define item as a prop)
   *
   */
  linkComponentName?: string;
}

export default function install (app: App): void
