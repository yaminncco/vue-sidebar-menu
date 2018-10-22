<template>
    <li :class="[{'has-dropdown' : item.child}, {'open' : show}, {'active' : isLinkActive()}]" @mouseenter="mouseEnter($event)">
        <a :href="item.href" @click="toggleDropdown">
            <i v-if="item.icon" class="item-icon" :class="item.icon"></i>
            <template v-if="!isCollapsed">
                <span class="item-text">{{item.title}}</span>
                <i class="item-arrow" v-if="item.child"></i>
            </template>
        </a>   
        <div class="dropdown" v-if="!isCollapsed && item.child">
            <transition name="show-animation">
                <ul v-if="show">
                    <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                </ul>
            </transition>
        </div>
    </li>
</template>

<script>
import SubItem from './SubItem.vue'
import {itemMixin} from '../mixin'

export default {
    data() {
        return {
            show: false,
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        firstItem: {
            type: Boolean,
            default: false
        },
        isCollapsed: {
            type: Boolean,
        },
    },
    components: {
        SubItem
    },
    mixins: [itemMixin],
    created() {
        if ( this.firstItem ) {
            this.$parent.$on('toggleCollapse',  this.closeDropdown)
        }
    },
    methods: {
        mouseEnter(event) {
            if (this.isCollapsed && this.firstItem) {
               this.$parent.$emit('mouseEnterItem', {item : this.item, pos: event.currentTarget.getBoundingClientRect().top})
            }
        },
    },
}
</script>

