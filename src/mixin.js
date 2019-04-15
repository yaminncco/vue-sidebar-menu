export const itemMixin = {
  data () {
    return {
      active: false,
      childActive: false,
      itemShow: false
    }
  },
  created () {
    this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
    this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
    if (this.item && this.item.child) {
      if (this.showChild) {
        this.itemShow = true
      } else {
        this.itemShow = this.isLinkActive(this.item) || this.isChildActive(this.item.child)
        if (this.showOneChild && !this.showChild && (this.active || this.childActive) && this.firstItem) {
          this.emitActiveShow(this._uid)
        }
      }
    }

    if (!this.$router) {
      window.addEventListener('hashchange', () => {
        this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
        this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
      })
    }
  },
  methods: {
    toggleDropdown () {
      this.itemShow = !this.itemShow
    },
    isLinkActive (item) {
      if (this.$route) {
        return item.href === this.$route.path + this.$route.hash
      } else {
        return item.href === window.location.pathname + window.location.hash
      }
    },
    isChildActive (child) {
      for (let item of child) {
        if (this.isLinkActive(item)) {
          return true
        }
        if (item.child) {
          if (this.isChildActive(item.child)) {
            return true
          }
        }
      }
      return false
    },
    clickEvent (event, mobileItem) {
      this.emitItemClick(event, this.item)

      if ((!this.item.href && !this.item.child) || this.item.disabled || (mobileItem && !this.item.href)) {
        event.preventDefault()
        return
      }

      if (this.isCollapsed && this.firstItem) {
        let clearCloseTimeout = this.item.child
        this.$parent.$emit('touchClickItem', clearCloseTimeout)
      }

      if (!mobileItem && this.item.child) {
        if (this.isCollapsed && this.firstItem) {
          event.preventDefault()
          return
        }
        if (this.isRouterLink) {
          if (this.firstItem && this.showOneChild && !this.showChild) {
            if (this.active) {
              if (this.activeShow.uid === this._uid) {
                this.itemShow = false
                this.emitActiveShow(null)
              } else {
                this.itemShow = true
                this.emitActiveShow(this._uid)
              }
            } else {
              this.itemShow = true
              this.emitActiveShow(this._uid)
            }
          } else {
            this.active ? this.toggleDropdown() : this.itemShow = true
          }
        } else if (!this.item.href) {
          event.preventDefault()
          if (this.firstItem && this.showOneChild && !this.showChild) {
            if (this.activeShow.uid === this._uid) {
              this.itemShow = false
              this.emitActiveShow(null)
            } else {
              this.itemShow = true
              this.emitActiveShow(this._uid)
            }
          } else {
            this.toggleDropdown()
          }
        }
      } else if (!mobileItem && !this.isCollapsed && !this.item.child) {
        if (this.firstItem && this.showOneChild && !this.showChild) {
          this.emitActiveShow(null)
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
        if (!this.activeShow.uid) {
          return false
        } else {
          return this._uid === this.activeShow.uid
        }
      } else {
        return this.itemShow
      }
    }
  },
  watch: {
    $route () {
      this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
      this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
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
