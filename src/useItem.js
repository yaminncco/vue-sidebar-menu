import { getCurrentInstance, computed, ref } from 'vue'
import useRouterLink from './useRouterLink'

export default function useItem (itemProps) {
  const router = getCurrentInstance().ctx.$router
  const { activeRecordIndex, isSameRouteLocationParams } = useRouterLink(router)

  const currentLocation = ref('')

  const active = computed(() => {
    return isLinkActive(itemProps) || isChildActive(itemProps.child)
  })

  const exactActive = computed(() => {
    return isLinkActive(itemProps)
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

  return {
    active,
    exactActive,
    currentLocation
  }
}
