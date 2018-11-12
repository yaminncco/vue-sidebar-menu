<template>
  <li class="nav-heading">
    <template>
      {{ name }}
    </template>
  </li>
</template>

<script>
import Item from './Item.vue'
import {itemMixin} from '../mixin'

export default {
  props: {
    name: {
      type: String,
      default: 'Cooked'
    }
  }
}
</script>