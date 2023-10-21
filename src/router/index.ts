import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@pages/MainPage.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Index',
    component: MainPage,
    path: '/',
  },
]

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
