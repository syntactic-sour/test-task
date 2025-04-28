<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCategory } from '@/composables/api/useCategory'
import { useCategories } from '@/composables/api/useCategories'
import { useProducts } from '@/composables/api/useProducts'
import { useCategoriesProductsPagination } from '@/composables/useCategoriesProductsPagination'

import CategoryContent from '@/components/CategoryContent.vue'

const route = useRoute()

const categoryId = computed(() =>
  typeof route.params.categoryId === 'string'
    ? route.params.categoryId
    : route.params.categoryId[0],
)

const { category, productsIds, isLoading, execute } = useCategory(categoryId)

const {
  subcategoriesPagination: categoriesPagination,
  productsPagination,
  setUrlQueryParams,
} = useCategoriesProductsPagination()

const subCategories = useCategories({
  paginationApiParams: categoriesPagination.paginationApiParams,
  parentId: categoryId,
  setTotal: categoriesPagination.setTotal,
})

const products = useProducts({
  paginationApiParams: productsPagination.paginationApiParams,
  setTotal: productsPagination.setTotal,
  productsIds,
})

execute()
subCategories.execute()

watch(category, () => {
  products.execute()
})

watch(categoryId, () => {
  execute()
  setUrlQueryParams()
})
</script>

<template>
  <h1>{{ isLoading || !category ? 'Category' : category.seoTitle || category.name }}</h1>

  <CategoryContent
    categoriesHeading="Subcategories"
    :categoriesPagination
    :productsPagination
    :categories="subCategories.collection.value"
    :products="products.collection.value"
    :isLoadingCategories="subCategories.isLoading.value"
    :isLoadingProducts="products.isLoading.value"
  />
</template>

<style scoped></style>
