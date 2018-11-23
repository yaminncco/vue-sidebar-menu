<template>
    <div class="vsm-item mobile-item" v-if="item" :class="[{'open-item' : item.child}, {'active-item' : active}, {'parent-active-item' : childActive}]">
        <template v-if="!item.child">
            <router-link class="vsm-link" v-if="isRouterLink" :to="item.href" :disabled="item.disabled">
                {{item.title}}
            </router-link>
            <a class="vsm-link" v-else :href="item.href" :disabled="item.disabled">
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
import { itemMixin } from '../mixin'

export default {
  props: {
    item: {
      type: Object
    }
  },
  components: {
    SubItem
  },
  mixins: [itemMixin],
  watch: {
    item() {
      this.active =
        this.item && this.item.href ? this.isLinkActive(this.item) : false
      this.childActive =
        this.item && this.item.child
          ? this.isChildActive(this.item.child)
          : false
    }
  }
}
</script>