import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'
import type { MobileItemRect, SidebarItem, SidebarMenuProps } from '../types'

type CreateSidebarInjectionStateReturn<
  Arguments extends Array<any>,
  Return
> = Readonly<
  [
    useProvidingState: (...args: Arguments) => Return,
    useInjectedState: () => Return | undefined
  ]
>
function createSidebarInjectionState<Arguments extends Array<any>, Return>(
  composable: (...args: Arguments) => Return
): CreateSidebarInjectionStateReturn<Arguments, Return> {
  const key: string | InjectionKey<Return> = Symbol(
    composable.name || 'SidebarInjectionState'
  )
  const useProvidingState = (...args: Arguments) => {
    const state = composable(...args)
    provide(key, state)
    return state
  }
  const useInjectedState = () => inject(key)
  return [useProvidingState, useInjectedState]
}

const [useProvideSidebar, useInjectSidebar] = createSidebarInjectionState(
  (
    props: SidebarMenuProps,
    sidebarRef: Ref<HTMLElement | null>,
    isCollapsed: Ref<boolean>,
    getMobileItem: ComputedRef<SidebarItem | null>,
    getMobileItemRect: ComputedRef<MobileItemRect>,
    currentRoute: Ref<string>,
    updateIsCollapsed: (val: boolean) => void,
    setMobileItem: ({
      item,
      itemEl,
    }: {
      item: SidebarItem
      itemEl: HTMLElement
    }) => void,
    unsetMobileItem: (immediate?: boolean, delay?: number) => void,
    clearMobileItemTimeout: () => void,
    onRouteChange: () => void,
    emitItemClick: (event: Event, item: SidebarItem) => void
  ) => {
    return {
      getSidebarProps: props,
      getSidebarRef: sidebarRef,
      getIsCollapsed: isCollapsed,
      getMobileItem,
      getMobileItemRect,
      getCurrentRoute: currentRoute,
      updateIsCollapsed,
      setMobileItem,
      unsetMobileItem,
      clearMobileItemTimeout,
      onRouteChange,
      emitItemClick,
    }
  }
)

export { useProvideSidebar, useInjectSidebar as useSidebar }
