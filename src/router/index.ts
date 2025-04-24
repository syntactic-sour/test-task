import { createRouter, createWebHistory } from 'vue-router'
import RootCategoriesView from '@/views/RootCategoriesView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/categories' },
    {
      path: '/categories',
      name: 'root-categories',
      component: RootCategoriesView,
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: CategoryView,
    },
  ],
})

export default router
