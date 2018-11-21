<template>
    <div class="vsm-item" :class="[{'first-item' : firstItem}, {'open-item' : show}, {'active-item' : active}, {'parent-active-item' : childActive}]" @mouseenter="mouseEnter($event)">
        <template v-if="!item.child">
            <template v-if="isRouterLink">
                <router-link class="vsm-link" :to="item.href">
                    <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                    <span v-if="!isCollapsed" class="vsm-title">{{item.title}}</span>
                </router-link>
            </template>
            <template v-else>
                <a class="vsm-link" :href="item.href">
                    <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                    <span v-if="!isCollapsed" class="vsm-title">{{item.title}}</span>
                </a>
            </template>
        </template>
        <template v-else>
            <div class="vsm-link" @click="toggleDropdown">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                <template v-if="!isCollapsed">
                    <span class="vsm-title">{{item.title}}</span>
                    <i class="vsm-arrow" :class="{'open-arrow' : show}" ></i>
                </template>
            </div>
            <div class="vsm-dropdown" v-if="!isCollapsed">
                <transition name="show-animation">
                    <div class="vsm-list" v-if="show">
                        <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                    </div>
                </transition>
            </div>
        </template>
    </div>
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
            this.$parent.$on('collapse',  this.closeDropdown)
        }
    },
    methods: {
        mouseEnter(event) {
            if (this.isCollapsed && this.firstItem) {
               this.$parent.$emit('mouseEnterItem', {
                   item : this.item,
                   pos: event.currentTarget.getBoundingClientRect().top - this.$parent.$el.getBoundingClientRect().top,
                   height: this.$el.offsetHeight
                })
            }
        },
    },
}
</script>

