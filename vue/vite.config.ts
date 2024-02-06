/*
 * @Author: haobin.wang
 * @Date: 2024-02-05 18:15:03
 * @LastEditors: haobin.wang
 * @LastEditTime: 2024-02-06 14:51:40
 * @Description: Do not edit
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue/docs/",
  build: {
    outDir: "docs"
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
