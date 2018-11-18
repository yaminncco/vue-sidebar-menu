<template>
    <div class="vsm-item mobile-item" v-if="item" :class="[{'open-item' : item.child}, {'active-item' : active}]">
        <template v-if="!item.child">
            <router-link class="vsm-link" v-if="isRouterLink" :to="item.href">
                {{item.title}}
            </router-link>
            <a class="vsm-link" v-else :href="item.href">
                {{item.title}}
            </a>
        </template>
        <template v-else>
            <div class="vsm-link">
                {{item.title}}
                <i class="vsm-arrow open-arrow"></i>
            </div>
        </template>
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