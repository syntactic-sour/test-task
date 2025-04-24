import { createRouter, createWebHistory } from 'vue-router'
import RootCategoriesView from '@/views/RootCategoriesView.vue'
import CategoryView from '@/views/CategoryView.vue'
import ProductView from '@/views/ProductView.vue'

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
      path: '/categories/:categoryId',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/categories/:categoryId/products/:productId',
      name: 'product',
      component: ProductView,
    },
  ],
})

export default router
