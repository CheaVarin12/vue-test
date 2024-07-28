import { createRouter, createWebHistory } from 'vue-router'
import CountryPage from '@/views/CountryPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'country',
      component: CountryPage
    },

  ]
})

export default router
