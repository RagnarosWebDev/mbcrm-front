import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/ui/components'),
      '@pages': path.resolve(__dirname, './src/ui/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@models': path.resolve(__dirname, './src/core/models'),
      '@api': path.resolve(__dirname, './src/core/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
