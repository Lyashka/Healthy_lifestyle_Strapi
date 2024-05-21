import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../views/MainPage.vue')
    },
    {
      path: '/Statistics', 
      name: 'StatisticsPage',
      component: () => import('../views/StatisticsPage.vue')
    },
    {
      path: '/Guide', 
      name: 'GuidePage',
      component: () => import('../views/GuidePage.vue')
    }
     
  ] 
})

export default router
