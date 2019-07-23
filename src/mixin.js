export const itemMixin = {
  data () {
    return {
      active: false,
      childActive: false,
      itemShow: false
    }
  },
  created () {
    this.initActiveState()
    this.initShowState()

    if (!this.$router) {
      window.addEventListener('hashchange', () => {
        this.initActiveState()
      })
    }
  },
  methods: {
    isLinkActive (item) {
      return this.matchRoute(item.href) || this.isAliasActive(item)
    },
    isChildActive (child) {
      return child.some(item => {
        return this.isLinkActive(item) || (item.child ? this.isChildActive(item.child) : false)
      })
    },
    isAliasActive (item) {
      if (item.alias) {
        if (Array.isArray(item.alias)) {
          return item.alias.some(alias => {
            return this.matchRoute(alias)
          })
        } else {
          return this.matchRoute(item.alias)
        }
      }
      return false
    },
    matchRoute (route) {
      if (this.$route) {
        return route === this.$route.fullPath
      } else {
        return route === window.location.pathname + window.location.search + window.location.hash
      }
    },
    clickEvent (event) {
      this.emitItemClick(event, this.item)

      if ((!this.item.href && !this.item.child) || this.item.disabled) {
        event.preventDefault()
        return
      }

      if (!this.mobileItem && this.isCollapsed && this.isFirstLevel) {
        let clearCloseTimeout = this.item.child
        this.$parent.$emit('touchClickItem', clearCloseTimeout)
      }

      if (!this.item.child) {
        if (this.showOneChild) this.emitActiveShow(null)
      } else {
        if (!this.item.href) event.preventDefault()
        if (this.mobileItem) return
        if (this.showOneChild) {
          this.activeShow === this._uid ? this.setActiveShow(false) : this.setActiveShow(true, this._uid)
        } else {
          this.itemShow = !this.itemShow
        }
      }
    },
    setActiveShow (itemShow, uid = null) {
      this.emitActiveShow(itemShow ? uid : null)
      this.itemShow = itemShow
    },
    initActiveState () {
      this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
      this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
    },
    initShowState () {
      if (this.item && this.item.child) {
        this.itemShow = this.isLinkActive(this.item) || this.isChildActive(this.item.child)
        if (this.showOneChild && !this.showChild && this.isFirstLevel && (this.active || this.childActive)) {
          this.emitActiveShow(this._uid)
        }
      }
    }
  },
  computed: {
    isRouterLink () {
      return this.$router && this.item && this.item.href !== undefined
    },
    isFirstLevel () {
      return this.level === 1
    },
    show () {
      if (!this.item.child) return false
      if (this.showChild || this.mobileItem) return true
      if (this.isFirstLevel && this.showOneChild) {
        return this._uid === this.activeShow
      }
      return this.itemShow
    },
    itemLinkClass () {
      return [
        'vsm--link',
        `vsm--link_level-${this.level}`,
        { 'vsm--link_mobile-item': this.mobileItem },
        { 'vsm--link_exact-active': this.active },
        { 'vsm--link_active': this.childActive },
        { 'vsm--link_disabled': this.item.disabled },
        this.item.class
      ]
    }
  },
  watch: {
    $route () {
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
      if (this.isCollapsed) {
        el.style.display = 'none'
        return
      }
      el.style.height = el.scrollHeight + 'px'
    }
  }
}
