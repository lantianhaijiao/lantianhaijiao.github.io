/*
 * @Author: haobin.wang
 * @Date: 2024-02-05 18:15:03
 * @LastEditors: haobin.wang
 * @LastEditTime: 2025-04-14 09:48:05
 * @Description: Do not edit
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
// console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
