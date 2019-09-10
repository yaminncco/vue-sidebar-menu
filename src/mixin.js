export const itemMixin = {
  data () {
    return {
      active: false,
      exactActive: false,
      childActive: false,
      itemShow: false
    }
  },
  created () {
    if (this.item.header || this.item.component) return
    this.initActiveState()
    this.initShowState()

    if (!this.$router) {
      window.addEventListener('hashchange', this.initActiveState)
    }
  },
  destroyed () {
    if (!this.$router) {
      window.removeEventListener('hashchange', this.initActiveState)
    }
  },
  methods: {
    isLinkActive (item) {
      if (!item.href) return false
      return this.matchRoute(item.href)
    },
    isLinkExactActive (item) {
      if (!item.href) return false
      return this.matchExactRoute(item.href) || this.isAliasActive(item)
    },
    isChildActive (child) {
      if (!child) return false
      return child.some(item => {
        return this.isLinkExactActive(item) || (item.child ? this.isChildActive(item.child) : false)
      })
    },
    isAliasActive (item) {
      if (item.alias) {
        if (Array.isArray(item.alias)) {
          return item.alias.some(alias => {
            return this.matchExactRoute(alias)
          })
        } else {
          return this.matchExactRoute(item.alias)
        }
      }
      return false
    },
    matchRoute (itemRoute) {
      if (this.$router) {
        const { route } = this.$router.resolve(itemRoute)
        return this.item.exactPath ? route.path === this.$route.path : this.matchExactRoute(itemRoute)
      } else {
        return this.item.exactPath ? itemRoute === window.location.pathname : this.matchExactRoute(itemRoute)
      }
    },
    matchExactRoute (itemRoute) {
      if (this.$router) {
        const { route } = this.$router.resolve(itemRoute)
        return route.fullPath === this.$route.fullPath
      } else {
        return itemRoute === window.location.pathname + window.location.search + window.location.hash
      }
    },
    clickEvent (event) {
      this.emitItemClick(event, this.item)

      if ((!this.item.href && !this.item.child) || this.item.disabled) {
        event.preventDefault()
        return
      }

      if (!this.mobileItem && this.isCollapsed && this.isFirstLevel) {
        this.$emit('unset-mobile-item', true, this.item.child !== undefined)
      }

      if (!this.item.child) {
        if (this.showOneChild) this.emitActiveShow(null)
      } else {
        if (!this.item.href) event.preventDefault()
        if (this.mobileItem) return
        if (this.showOneChild) {
          this.activeShow === this.item ? this.setActiveShow(false) : this.setActiveShow(true, this.item)
        } else {
          this.itemShow = !this.itemShow
        }
      }
    },
    setActiveShow (itemShow, item = null) {
      this.emitActiveShow(item)
      this.itemShow = itemShow
    },
    initActiveState () {
      this.active = this.isLinkActive(this.item)
      this.exactActive = this.isLinkExactActive(this.item)
      this.childActive = this.isChildActive(this.item.child)
    },
    initShowState () {
      if (this.item && this.item.child) {
        this.itemShow = this.active || this.childActive
        if (this.showOneChild && !this.showChild && this.isFirstLevel && (this.active || this.childActive)) {
          this.emitActiveShow(this.item)
        }
      }
    },
    mouseEnterEvent (event) {
      if (this.isCollapsed && this.isFirstLevel && !this.mobileItem && !this.item.disabled) {
        this.$emit('set-mobile-item', { event, item: this.item })
      }
    }
  },
  computed: {
    isRouterLink () {
      return (this.$router && this.item && this.item.href !== undefined && !this.item.external) === true
    },
    isFirstLevel () {
      return this.level === 1
    },
    show () {
      if (!this.item.child) return false
      if (this.showChild || this.mobileItem) return true
      if (this.isFirstLevel && this.showOneChild) {
        return this.item === this.activeShow
      }
      return this.itemShow
    },
    itemLinkClass () {
      return [
        'vsm--link',
        `vsm--link_level-${this.level}`,
        { 'vsm--link_mobile-item': this.mobileItem },
        { 'vsm--link_active': (this.active && !this.exactActive) || this.childActive },
        { 'vsm--link_exact-active': this.exactActive },
        { 'vsm--link_disabled': this.item.disabled },
        this.item.class
      ]
    },
    isItemHidden () {
      if (this.isCollapsed) {
        if (this.item.hidden && this.item.hiddenOnCollapse === undefined) {
          return true
        } else {
          return this.item.hiddenOnCollapse === true
        }
      } else {
        return this.item.hidden === true
      }
    },
    itemLinkHref () {
      if (!this.$router && (!this.item.href || typeof this.item.href !== 'string')) return '#'
      return this.item.href ? this.item.href : '#'
    }
  },
  watch: {
    $route () {
      if (this.item.header || this.item.component) return
      this.initActiveState()
    }
  },
  inject: ['emitActiveShow', 'emitItemClick']
}

export const animationMixin = {
  methods: {
    expandEnter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    expandAfterEnter (el) {
      el.style.height = 'auto'
    },
    expandBeforeLeave (el) {
      if (this.isCollapsed && (this.isFirstLevel || this.level === undefined)) {
        el.style.display = 'none'
        return
      }
      el.style.height = el.scrollHeight + 'px'
    }
  }
}
