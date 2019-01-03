export const itemMixin = {
    data() {
        return {
            active: false,
            childActive: false
        }
    },
    created() {
        this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
        this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
        if (this.item && this.item.child) {
            if (this.showChild) {
                this.show = true
            } else {
                this.show = this.isChildActive(this.item.child)
            }
        } else {
            this.show = false
        }
    },
    methods: {
        toggleDropdown() {
            this.show = !this.show
        },
        isLinkActive(item) {
            if ( this.$route ) {
                return item.href == this.$route.path
            } else {
                return item.href == window.location.pathname
            }
        },
        isChildActive(child) {
            for (let item of child) {
                if (this.isLinkActive(item)) {
                    return true
                }
                if (item.child) {
                    if ( this.isChildActive(item.child) ) {
                        return true
                    }
                }
            }
            return false
        },
        clickEvent(event) {
            if (this.item.disabled) {
                event.preventDefault()
                return
            }
            if (this.isCollapsed && this.firstItem) {
                this.$parent.$emit('clickItem')
            }
        }
    },
    computed: {
        isRouterLink() {
            return this.$router && this.item && this.item.href !== undefined
        }
    },
    watch: {
        $route() {
            this.active = this.item && this.item.href ? this.isLinkActive(this.item) : false
            this.childActive = this.item && this.item.child ? this.isChildActive(this.item.child) : false
        }
    },
    inject:['showChild'],
}

export const animationMixin = {
    methods: {
        expandEnter(el) {
            el.style.height = el.scrollHeight+'px'
        },
        expandAfterEnter(el) {
            el.style.height = 'auto'
        },
        expandBeforeLeave(el) {
            if(this.isCollapsed) {
                el.style.display = 'none'
                return
            }
            el.style.height = el.scrollHeight+'px'
        }
    }
}