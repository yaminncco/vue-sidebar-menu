import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-sidebar-menu/',
  build: {
    outDir: '../docs'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    },
    dedupe: [
      'vue'
    ]
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
