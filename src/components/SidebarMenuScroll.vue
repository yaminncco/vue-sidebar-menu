<template>
  <div class="vsm--scroll-wrapper">
    <div class="vsm--scroll-overflow">
      <div
        ref="scrollRef"
        class="vsm--scroll"
        @scroll="onScroll"
      >
        <slot />
      </div>
      <div
        ref="scrollBarRef"
        class="vsm--scroll-bar"
        @mousedown="onClick"
      >
        <div
          ref="scrollThumbRef"
          class="vsm--scroll-thumb"
          :style="thumbStyle"
          @mousedown="onMouseDown"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject, watch, nextTick, provide, onUnmounted } from 'vue'
import useMenu from '../use/useMenu'

export default {
  name: 'SidebarMenuScroll',
  setup () {
    const sidebarProps = inject('vsm-props')
    const { isCollapsed } = useMenu(sidebarProps)

    const scrollRef = ref(null)
    const scrollBarRef = ref(null)
    const scrollThumbRef = ref(null)

    const thumbYPerc = ref(0)
    const thumbHeightPerc = ref(0)

    let cursorY = 0
    let cursorDown = false

    const thumbStyle = computed(() => {
      return {
        height: `${thumbHeightPerc.value}%`,
        transform: `translateY(${thumbYPerc.value}%)`
      }
    })

    const onScrollUpdate = () => {
      if (!scrollRef.value) return
      nextTick(() => {
        updateThumb()
      })
    }

    provide('emitScrollUpdate', onScrollUpdate)

    onMounted(() => {
      onScrollUpdate()
      window.addEventListener('resize', onScrollUpdate)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', onScrollUpdate)
    })

    watch(() => isCollapsed.value, () => {
      onScrollUpdate()
    })

    const onScroll = () => {
      requestAnimationFrame(onScrollUpdate)
    }

    const onClick = (e) => {
      const offset = Math.abs(scrollBarRef.value.getBoundingClientRect().y - e.clientY)
      const thumbHalf = scrollThumbRef.value.offsetHeight / 2
      updateScrollTop(offset - thumbHalf)
    }

    const onMouseDown = (e) => {
      e.stopImmediatePropagation()
      cursorDown = true
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      cursorY = scrollThumbRef.value.offsetHeight - (e.clientY - scrollThumbRef.value.getBoundingClientRect().y)
    }

    const onMouseMove = (e) => {
      if (!cursorDown) return
      const offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y
      const thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY
      updateScrollTop(offset - thumbClickPosition)
    }

    const onMouseUp = (e) => {
      cursorDown = false
      cursorY = 0
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    const updateThumb = () => {
      const heightPerc = scrollRef.value.clientHeight * 100 / scrollRef.value.scrollHeight
      thumbHeightPerc.value = heightPerc < 100 ? heightPerc : 0
      thumbYPerc.value = scrollRef.value.scrollTop * 100 / scrollRef.value.clientHeight
    }

    const updateScrollTop = (y) => {
      const scrollPerc = y * 100 / scrollBarRef.value.offsetHeight
      scrollRef.value.scrollTop = scrollPerc * scrollRef.value.scrollHeight / 100
    }

    return {
      scrollRef,
      scrollBarRef,
      scrollThumbRef,
      thumbStyle,
      onScroll,
      onClick,
      onMouseDown
    }
  }
}
</script>
