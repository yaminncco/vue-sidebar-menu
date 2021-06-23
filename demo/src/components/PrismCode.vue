<template>
  <pre>
    <code
      ref="code"
      :class="`language-${lang}`"
    >
      <slot />
    </code>
  </pre>
</template>

<script>
import Prism from '../prismjs'

export default {
  props: {
    lang: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isHighlighted: false
    }
  },
  mounted () {
    if (!this.isHighlighted) {
      Prism.highlightElement(this.$refs.code)
      this.isHighlighted = true
    }
  }
}
</script>
