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
        return item.child ? this.isLinkActive(item) || this.isChildActive(item.child) : this.isLinkActive(item)
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
        return this.$route.fullPath.endsWith(route)
      } else {
        return window.location.href.endsWith(route)
      }
    },
    clickEvent (event, mobileItem) {
      this.emitItemClick(event, this.item)

      if ((!this.item.href && (!this.item.child || mobileItem)) || this.item.disabled) {
        event.preventDefault()
        return
      }

      if (!mobileItem && this.isCollapsed && this.firstItem) {
        let clearCloseTimeout = this.item.child
        this.$parent.$emit('touchClickItem', clearCloseTimeout)
      }

      let showOneChildEnabled = this.firstItem && this.showOneChild && !this.showChild
      if (!mobileItem && this.item.child) {
        if (this.isRouterLink && !this.active) {
          showOneChildEnabled ? this.setActiveShow(true, this._uid) : this.itemShow = true
          return
        }
        if (!this.item.href) {
          event.preventDefault()
        }
        if (showOneChildEnabled) {
          this.activeShow.uid === this._uid ? this.setActiveShow(false) : this.setActiveShow(true, this._uid)
        } else {
          this.itemShow = !this.itemShow
        }
      } else if (!mobileItem && showOneChildEnabled) {
        this.emitActiveShow(null)
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
        if (this.showChild) {
          this.itemShow = true
        } else {
          this.itemShow = this.isLinkActive(this.item) || this.isChildActive(this.item.child)
          if (this.showOneChild && !this.showChild && this.firstItem && (this.active || this.childActive)) {
            this.emitActiveShow(this._uid)
          }
        }
      }
    }
  },
  computed: {
    isRouterLink () {
      return this.$router && this.item && this.item.href !== undefined
    },
    show () {
      if (!this.item || !this.item.child) return false
      if (this.firstItem && this.showOneChild && !this.showChild) {
        return this.activeShow.uid ? this._uid === this.activeShow.uid : false
      } else {
        return this.itemShow
      }
    }
  },
  watch: {
    $route () {
      this.initActiveState()
    }
  },
  inject: ['showChild', 'showOneChild', 'emitActiveShow', 'activeShow', 'emitItemClick', 'rtl']
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
