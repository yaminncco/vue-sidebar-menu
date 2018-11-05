<template>
    <li :class="[{'has-dropdown open' : item && item.child}]">
        <router-link v-if="isRouterLink" :to="item.href">
            {{item.title}}
            <i class="item-arrow" v-if="item.child"></i>
        </router-link>
        <a v-else-if="item" :href="!item.child ? item.href : '#'" @click="clickEvent">
            {{item.title}}
            <i class="item-arrow" v-if="item.child"></i>
        </a>
        <div class="item-bg">
            <transition name="slide-animation">
                <span v-if="item"></span>
            </transition>
        </div>
        <div class="dropdown" :style="{'max-height' : `calc(100vh - ${mobileItemPos + 50}px)`}">
            <transition name="show-animation">
                <ul v-if="item && item.child">
                    <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index"/>
                </ul>
            </transition>
        </div>
    </li>
</template>

<script>
import SubItem from './SubItem.vue'
import {itemMixin} from '../mixin'

export default {
    props: {
        item: {
            type: Object,
        },
        mobileItemPos: {
            type: Number,
            required: true
        }
    },
    components: {
        SubItem
    },
    mixins: [itemMixin],
}
</script>