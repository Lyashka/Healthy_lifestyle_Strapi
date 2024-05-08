import { createRouter, createWebHistory } from 'vue-router'

const MainPage = () => import('../views/MainPage.vue')
const StatisticsPage = () => import('../views/StatisticsPage.vue')
const GuidePage = () => import('../views/GuidePage.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/Statistics', 
      name: 'StatisticsPage',
      component: StatisticsPage
    },
    {
      path: '/Guide', 
      name: 'GuidePage',
      component: GuidePage
    }
     
  ] 
})

export default router
