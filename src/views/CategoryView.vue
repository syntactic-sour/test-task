<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'
import { useCategory } from '@/composables/api/useCategory'
import { useCategories } from '@/composables/api/useCategories'

const route = useRoute()

const categoryId = computed(() =>
  typeof route.params.id === 'string' ? route.params.id : route.params.id[0],
)

const { category, execute } = useCategory(categoryId)

const {
  limitsWhitelist,
  currentLimit,
  currentPage,
  pagesTotal,
  paginationApiParams,

  setTotal,
  setLimit,
} = usePaginationWithRouter(new Set([1, 10, 20, 30]))

const {
  collection,
  isLoading,
  execute: executeSubcategories,
} = useCategories(paginationApiParams, { setTotal, parentId: categoryId })

execute()
executeSubcategories()
</script>

<template>
  <h1>{{ category?.seoTitle || category?.name }}</h1>

  <h2 v-if="!isLoading && collection.length">Subcategories</h2>
  <ul v-if="!isLoading && collection.length">
    <li v-for="item in collection" :key="item.id">
      <RouterLink :to="`/categories/${item.id}`">
        {{ item.seoTitle || item.name }}
      </RouterLink>
    </li>
  </ul>
  <strong v-else-if="isLoading">LOADING</strong>

  <PaginationControl
    v-if="!isLoading && collection.length"
    :limit-options="limitsWhitelist"
    :default-limit="currentLimit"
    :pages="pagesTotal"
    :current-page="currentPage"
    @set-limit="setLimit"
  />
</template>
