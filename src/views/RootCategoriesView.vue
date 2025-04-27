<script setup lang="ts">
import { onBeforeMount } from 'vue'

import { useCategories } from '@/composables/api/useCategories'
import { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'

import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import CategoriesList from '@/components/CategoriesList.vue'

const {
  limitsWhitelist,
  currentLimit,
  currentPage,
  pagesTotal,
  paginationApiParams,

  setTotal,
  setLimit,
  setPage,
  getInitialParams,
  setInitialParams,
} = usePaginationWithRouter(new Set([1, 2, 10, 20]))

const { collection, isLoading, execute } = useCategories({
  paginationApiParams,
  setTotal,
})

execute()

onBeforeMount(() => {
  setInitialParams(getInitialParams())
})
</script>

<template>
  <h1>Root categories</h1>

  <CategoriesList :collection="collection" :isLoading="isLoading" class="categories-list" />

  <PaginationControl
    pagination-aria-label="Categories pagination"
    :limit-options="limitsWhitelist"
    :default-limit="currentLimit"
    :pages="pagesTotal"
    :current-page="currentPage"
    @set-limit="setLimit"
    @set-page="setPage"
  />
</template>

<style scoped>
.categories-list {
  margin: 1rem 0 2rem;
}
</style>
