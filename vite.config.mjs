import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: ['src/index.js'],
      name: 'VueSidebarMenu',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => {
        const { main, module, unpkg, name } = pkg
        const file = {
          umd: main.split('/').pop(),
          es: module.split('/').pop(),
          iife: unpkg.split('/').pop(),
        }
        return file[format] || `${name}.${format}.js`
      },
      cssFileName: 'vue-sidebar-menu',
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
