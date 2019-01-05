<template>
    <div class="vsm-item" :class="[{'open-item' : show}, {'active-item' : active}, {'parent-active-item' : childActive}]">
        <template v-if="isRouterLink">
            <router-link class="vsm-link" :to="item.href" :disabled="item.disabled" :event="item.disabled ? '' : 'click'" @click.native="clickEvent">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                <span class="vsm-title">{{item.title}}</span>
                <i v-if="item.child" class="vsm-arrow" :class="{'open-arrow' : show}" ></i>
            </router-link>
        </template>
        <template v-else>
            <a class="vsm-link" :href="item.href ? item.href : '#'" :disabled="item.disabled" @click="clickEvent">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                <span class="vsm-title">{{item.title}}</span>
                <i v-if="item.child" class="vsm-arrow" :class="{'open-arrow' : show}" ></i>
            </a>
        </template>
        <template v-if="item.child">
            <transition name="expand" @enter="expandEnter" @afterEnter="expandAfterEnter" @beforeLeave="expandBeforeLeave">
                <div class="vsm-dropdown" v-if="show">
                    <div class="vsm-list">
                        <item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                    </div>
                </div>
            </transition>
        </template>
    </div>
</template>

<script>
import Item from './Item.vue'
import { itemMixin, animationMixin } from '../mixin'

export default {
  data() {
    return {
      show: false
    }
  },
  mixins: [itemMixin, animationMixin],
  props: {
    item: Object
  },
  components: {
    Item
  },
  beforeCreate() {
    this.$options.components.Item = require('./Item.vue').default
  }
}
</script>
