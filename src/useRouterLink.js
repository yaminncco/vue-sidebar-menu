// Adapted from vue-router-next
// See: https://github.com/vuejs/vue-router-next/blob/master/src/RouterLink.ts

export default function useRouterLink (router) {
  const activeRecordIndex = (route) => {
    let { matched } = route
    let { length } = matched
    const routeMatched = matched[length - 1]

    let currentMatched = router.currentRoute.value.matched
    if (!routeMatched || !currentMatched.length) return -1
    let index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    )
    if (index > -1) return index

    let parentRecordPath = getOriginalPath(
      matched[length - 2]
    )
    return (
      length > 1 &&
      getOriginalPath(routeMatched) === parentRecordPath &&
      currentMatched[currentMatched.length - 1].path !== parentRecordPath
        ? currentMatched.findIndex(
          isSameRouteRecord.bind(null, matched[length - 2])
        )
        : index
    )
  }

  const getOriginalPath = (record) => {
    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : ''
  }

  const isSameRouteRecord = (a, b) => {
    return (a.aliasOf || a) === (b.aliasOf || b)
  }

  const isSameRouteLocationParams = (a, b) => {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    for (let key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key])) return false
    }
    return true
  }

  const isSameRouteLocationParamsValue = (a, b) => {
    return Array.isArray(a)
      ? isEquivalentArray(a, b)
      : Array.isArray(b)
        ? isEquivalentArray(b, a)
        : a === b
  }

  const isEquivalentArray = (a, b) => {
    return Array.isArray(b)
      ? a.length === b.length && a.every((value, i) => value === b[i])
      : a.length === 1 && a[0] === b
  }

  return {
    activeRecordIndex,
    isSameRouteLocationParams
  }
}
