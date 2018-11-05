export const itemMixin = {
    methods: {
        toggleDropdown(e) {
            e.preventDefault()
            this.show = !this.show
        },
        closeDropdown() {
            this.show = false
        },
        clickEvent(e) {
            if (this.item.child) this.toggleDropdown(e)
        }
    },
    computed: {
        isRouterLink() {
            return this.$router && this.item && this.item.href !== undefined
        },
        isLinkActive() {
            if ( this.item && this.item.href ) {
                return this.item.href == window.location.pathname
            }
        }
    }
}