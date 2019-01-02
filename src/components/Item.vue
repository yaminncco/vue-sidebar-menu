<template>
    <div class="vsm-item" :class="[{'first-item' : firstItem}, {'open-item' : show}, {'active-item' : active}, {'parent-active-item' : childActive}]" @mouseenter="mouseEnter($event)">
        <template v-if="!item.child">
            <template v-if="isRouterLink">
                <router-link class="vsm-link" :to="item.href" :disabled="item.disabled" :event="item.disabled ? '' : 'click'" @click.native="clickEvent">
                    <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                    <span v-if="!isCollapsed" class="vsm-title">{{item.title}}</span>
                </router-link>
            </template>
            <template v-else>
                <a class="vsm-link" :href="item.href" :disabled="item.disabled" @click="clickEvent">
                    <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                    <span v-if="!isCollapsed" class="vsm-title">{{item.title}}</span>
                </a>
            </template>
        </template>
        <template v-else>
            <a href="#" class="vsm-link" @click.prevent="toggleDropdown">
                <i v-if="item.icon" class="vsm-icon" :class="item.icon"></i>
                <template v-if="!isCollapsed">
                    <span class="vsm-title">{{item.title}}</span>
                    <i class="vsm-arrow" :class="{'open-arrow' : show}" ></i>
                </template>
            </a>
            <template v-if="!isCollapsed">
                <transition name="expand" @enter="expandEnter" @afterEnter="expandAfterEnter" @beforeLeave="expandBeforeLeave">
                    <div class="vsm-dropdown" v-if="show">
                        <div class="vsm-list">
                            <sub-item v-for="(subItem, index) in item.child" :item="subItem" :key="index" />
                        </div>
                    </div>
                </transition>
            </template>
        </template>
    </div>
</template>

<script>
import SubItem from './SubItem.vue'
import { itemMixin, animationMixin } from '../mixin'

export default {
  data() {
    return {
      show: false
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
      type: Boolean
    }
  },
  components: {
    SubItem
  },
  mixins: [itemMixin, animationMixin],
  methods: {
    mouseEnter(event) {
      if (this.isCollapsed && this.firstItem) {
          this.$parent.$emit('mouseEnterItem', {
            item: this.item,
            pos:
              event.currentTarget.getBoundingClientRect().top -
              this.$parent.$el.getBoundingClientRect().top,
            height: this.$el.offsetHeight
          })
      }
    }
  }
}
</script>

