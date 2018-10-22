export const itemMixin = {
    methods: {
        toggleDropdown() {
            if (!this.item.child) return
            this.show = !this.show
        },
        closeDropdown() {
            this.show = false
        },
        isLinkActive() {
            if ( this.item && this.item.href ) {
                if ( this.item.href == window.location.pathname ) {
                    return true
                }
            }
        }
    },
}