import Vue, { PluginObject } from "vue";

export interface ItemIcon {
  element: string;

  class: string;

  attributes?: object;

  text?: string;
}

export interface ItemBadge {
  text: string;

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

  exactPath?: boolean;

  alias?: string | Array<string>;

  hidden?: boolean;

  hiddenOnCollapse?: boolean;
}

export interface SidebarHeaderItem {
  header: boolean;

  title: string;

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

export class SidebarMenu extends Vue {
  /**
   * List of Items in the menu
   * Follow https://github.com/yaminncco/vue-sidebar-menu#item-properties
   */
  menu: Array<SidebarItem | SidebarComponentItem | SidebarHeaderItem>;

  /**
   * Sidebar Collapse state.
   * by default false
   */
  collapsed?: boolean;

  /**
   * Sidebar width (expanded).
   * by default 350px
   */
  width?: string;

  /**
   * Sidebar width (collapsed).
   *  by default 50px
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
}

declare const VueSidebarMenu: PluginObject<any>;
export default VueSidebarMenu;
