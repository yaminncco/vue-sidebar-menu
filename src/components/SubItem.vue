<template>
    <li :class="[{'has-dropdown' : item.child}, {'open' : show}, {'active' : isLinkActive()}]">
        <a :href="item.href" @click="toggleDropdown">
            <i v-if="item.icon" class="item-icon" :class="item.icon" ></i>
            <span class="item-text">{{item.title}}</span>
            <i class="item-arrow" v-if="item.child"></i>
        </a>
        <div class="dropdown" v-if="item.child">
            <transition name="show-animation">
                <ul v-if="show">
                    <item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                </ul>
            </transition>
        </div>
    </li>
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
