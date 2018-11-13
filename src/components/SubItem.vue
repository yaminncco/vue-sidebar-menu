<template>
    <div class="vsm-item" :class="[{'open-item' : show}, {'active-item' : active}]">
        <template v-if="isRouterLink">
            <router-link class="vsm-link" :to="item.href" @click.native="clickEvent">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon" ></i>
                <span class="vsm-title">{{item.title}}</span>
                <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : show}"></i>
            </router-link>
        </template>
        <template v-else>
            <a class="vsm-link" :href="!item.child ? item.href : '#'" @click="clickEvent" :class="{'active' : isLinkActive}">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon" ></i>
                <span class="vsm-title">{{item.title}}</span>
                <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : show}"></i>
            </a>
        </template>
        <div class="vsm-dropdown" v-if="item.child">
            <transition name="show-animation">
                <div class="vsm-list" v-if="show">
                    <item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Item from './Item.vue'
import {itemMixin} from '../mixin'

export default {
    data() {
        return {
            show: false,
        }
    },
    mixins: [itemMixin],
    props: {
        item: Object,
    },
    components: {
        Item
    },
    beforeCreate() {
        this.$options.components.Item = require('./Item.vue').default
    },
}
</script>
