<template>
    <li :class="[{'has-dropdown' : item.child}, {'open' : show}]" @mouseenter="mouseEnter($event)">
        <template v-if="item.name">
            <Heading :name="item.name" />
        </template>
        <template v-if="isRouterLink">
            <router-link :to="item.href" @click.native="clickEvent">
                <i v-if="item.icon" class="item-icon" :class="item.icon"></i>
                <template v-if="!isCollapsed">
                    <span class="item-text">{{item.title}}</span>
                    <i class="item-arrow" v-if="item.child"></i>
                </template>
            </router-link>
        </template>
        <template v-else>
            <a :href="!item.child ? item.href : '#'" @click="clickEvent" :class="{'active' : isLinkActive}">
                <i v-if="item.icon" class="item-icon" :class="item.icon"></i>
                <template v-if="!isCollapsed">
                    <span class="item-text">{{item.title}}</span>
                    <i class="item-arrow" v-if="item.child"></i>
                </template>
            </a>
        </template>
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
import Heading from './Heading.vue'
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
        }
    },
    components: {
        SubItem,
        Heading
    },
    mixins: [itemMixin],
    created() {
        if ( this.firstItem ) {
            this.$parent.$on('collapse',  this.closeDropdown)
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

