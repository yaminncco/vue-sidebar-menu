<template>
    <div class="vsm-item" :class="[{'has-dropdown open' : item && item.child}]">
        <router-link class="vsm-link" v-if="isRouterLink" :to="item.href">
            {{item.title}}
            <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : show}"></i>
        </router-link>
        <a class="vsm-link" v-else-if="item" :href="!item.child ? item.href : '#'" @click="clickEvent">
            {{item.title}}
            <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : show}"></i>
        </a>
        <div class="item-bg">
            <transition name="slide-animation">
                <span v-if="item"></span>
            </transition>
        </div>
        <div class="vsm-dropdown" :style="{'max-height' : `calc(100vh - ${mobileItemPos + 50}px)`}">
            <transition name="show-animation">
                <div class="vsm-list" v-if="item && item.child">
                    <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index"/>
                </div>
            </transition>
        </div>
    </div>
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