<script setup lang="ts">
import { useCategories } from '@/composables/api/useCategories'
import { useProducts } from '@/composables/api/useProducts'
import { useCategoriesProductsPagination } from '@/composables/useCategoriesProductsPagination'

import CategoryContent from '@/components/CategoryContent.vue'

const { subcategoriesPagination: categoriesPagination, productsPagination } =
  useCategoriesProductsPagination()

const { collection, isLoading, execute } = useCategories({
  paginationApiParams: categoriesPagination.paginationApiParams,
  setTotal: categoriesPagination.setTotal,
})

const products = useProducts({
  paginationApiParams: productsPagination.paginationApiParams,
  setTotal: productsPagination.setTotal,
  fetchAll: true,
})

execute()
products.execute()
</script>

<template>
  <h1>Store</h1>

  <CategoryContent
    categoriesHeading="Root categories"
    :categoriesPagination
    :productsPagination
    :categories="collection"
    :products="products.collection.value"
    :isLoadingCategories="isLoading"
    :isLoadingProducts="products.isLoading.value"
  />
</template>
