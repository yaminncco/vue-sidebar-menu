import pathToRegexp from 'path-to-regexp'

export const itemMixin = {
  data () {
    return {
      active: false,
      exactActive: false,
      itemShow: false,
      itemHover: false
    }
  },
  created () {
    if (this.item.header || this.item.component) return
    this.initState()
  },
  mounted () {
    if (!this.$router) {
      window.addEventListener('hashchange', this.initState)
    }
  },
  destroyed () {
    if (!this.$router) {
      window.removeEventListener('hashchange', this.initState)
    }
  },
  methods: {
    isLinkActive (item) {
      return this.matchRoute(item) || this.isChildActive(item.child) || this.isAliasActive(item)
    },
    isLinkExactActive (item) {
      return this.matchExactRoute(item.href)
    },
    isChildActive (child) {
      if (!child) return false
      return child.some(item => {
        return this.isLinkActive(item)
      })
    },
    isAliasActive (item) {
      if (item.alias) {
        const current = this.$router ? this.$route.fullPath : window.location.pathname + window.location.search + window.location.hash
        if (Array.isArray(item.alias)) {
          return item.alias.some(alias => {
            return pathToRegexp(alias).test(current)
          })
        } else {
          return pathToRegexp(item.alias).test(current)
        }
      }
      return false
    },
    matchRoute ({ href, exactPath }) {
      if (!href) return false
      if (this.$router) {
        const { route } = this.$router.resolve(href)
        return exactPath ? route.path === this.$route.path : this.matchExactRoute(href)
      } else {
        return exactPath ? href === window.location.pathname : this.matchExactRoute(href)
      }
    },
    matchExactRoute (href) {
      if (!href) return false
      if (this.$router) {
        const { route } = this.$router.resolve(href)
        return route.fullPath === this.$route.fullPath
      } else {
        return href === window.location.pathname + window.location.search + window.location.hash
      }
    },
    clickEvent (event) {
      if (this.item.disabled) return

      this.emitItemClick(event, this.item, this)

      if (this.isCollapsed && this.isFirstLevel && !this.isMobileItem) {
        if (!this.mobileItem || this.mobileItem !== this.item) {
          this.$emit('set-mobile-item', { item: this.item, itemEl: event.currentTarget.offsetParent })
        }
        if (this.hover || this.item.child) return
        this.$emit('unset-mobile-item', true)
      }

      if (!this.item.child || this.showChild || this.isMobileItem) return
      if (!this.item.href || this.exactActive) {
        this.show = !this.show
      }
    },
    initState () {
      this.initActiveState()
      this.initShowState()
    },
    initActiveState () {
      this.active = this.isLinkActive(this.item)
      this.exactActive = this.isLinkExactActive(this.item)
    },
    initShowState () {
      if (!this.item.child || this.showChild) return
      if ((this.showOneChild && this.active && !this.show) || (this.active && !this.show)) {
        this.show = true
      } else if (this.showOneChild && !this.active && this.show) {
        this.show = false
      }
    },
    mouseEnterEvent (event) {
      event.stopPropagation()
      if (this.item.disabled) return
      this.itemHover = true
      if (this.hover) return
      if (this.isCollapsed && this.isFirstLevel && !this.isMobileItem) {
        this.$emit('set-mobile-item', { item: this.item, itemEl: event.currentTarget })
      }
    },
    mouseLeaveEvent (event) {
      event.stopPropagation()
      this.itemHover = false
    }
  },
  computed: {
    isRouterLink () {
      return (this.$router && this.item && this.item.href !== undefined && !this.item.external) === true
    },
    isFirstLevel () {
      return this.level === 1
    },
    show: {
      get () {
        if (!this.item.child) return false
        if (this.showChild || this.isMobileItem) return true
        return this.itemShow
      },
      set (show) {
        if (this.showOneChild) {
          show ? this.emitActiveShow(this.item) : this.emitActiveShow(null)
        }
        this.itemShow = show
      }
    },
    itemLinkClass () {
      return [
        'vsm--link',
        !this.isMobileItem ? `vsm--link_level-${this.level}` : '',
        { 'vsm--link_mobile-item': this.isMobileItem },
        { 'vsm--link_hover': this.hover },
        { 'vsm--link_active': this.active },
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
      if (!this.item.href || this.item.disabled) return null
      return this.item.href
    },
    hover () {
      if (this.isCollapsed && this.isFirstLevel) {
        return this.item === this.mobileItem
      }
      return this.itemHover
    },
    itemLinkTag () {
      if (!this.itemLinkHref) return 'span'
      return this.isRouterLink ? 'router-link' : 'a'
    }
  },
  watch: {
    $route () {
      setTimeout(() => {
        if (this.item.header || this.item.component) return
        this.initState()
      }, 1)
    },
    item (newItem, item) {
      this.emitItemUpdate(newItem, item)
    },
    activeShow () {
      this.itemShow = this.item === this.activeShow
    }
  },
  inject: ['emitActiveShow', 'emitItemClick', 'emitItemUpdate']
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
      if (this.isCollapsed && this.isFirstLevel) {
        el.style.display = 'none'
        return
      }
      el.style.height = el.scrollHeight + 'px'
    }
  }
}
