export const itemMixin = {
    data() {
        return {
            active: false
        }
    },
    created() {
        this.active = this.isLinkActive()
    },
    methods: {
        toggleDropdown() {
            this.show = !this.show
        },
        closeDropdown() {
            this.show = false
        },
        isLinkActive() {
            if ( this.item && this.item.href ) { 
                if ( this.$route ) {
                    return this.item.href == this.$route.path
                } else {
                    return this.item.href == window.location.pathname
                }
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
            this.active = this.isLinkActive()
        }
    },
}