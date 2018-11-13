<template>
    <div class="vsm-item mobile-item" v-if="item" :class="[{'open-item' : item.child}, {'active-item' : active}]">
        <router-link class="vsm-link" v-if="isRouterLink" :to="item.href">
            {{item.title}}
            <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : show}"></i>
        </router-link>
        <a class="vsm-link" v-else-if="item" :href="!item.child ? item.href : '#'" @click="clickEvent">
            {{item.title}}
            <i class="vsm-arrow" v-if="item.child" :class="{'open-arrow' : item.child}"></i>
        </a>
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
    },
    components: {
        SubItem
    },
    mixins: [itemMixin],
    watch: {
        item() {
            this.active = this.isLinkActive()
        }
    }
}
</script>