import { createRouter, createWebHistory } from 'vue-router'
import RootCategoriesView from '../views/RootCategoriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root-categories',
      component: RootCategoriesView,
    },
  ],
})

export default router
