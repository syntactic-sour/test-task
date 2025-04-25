<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useCategories } from '@/composables/api/useCategories'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'

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
} = usePaginationWithRouter(new Set([1, 10, 20, 30]))

const parentId = ref('0')

const { collection, isLoading, execute } = useCategories(paginationApiParams, {
  setTotal,
  parentId,
})

execute()

onBeforeMount(() => {
  setInitialParams(getInitialParams())
})
</script>

<template>
  <h1>Root categories</h1>
  <ul v-if="!isLoading && collection.length">
    <li v-for="item in collection" :key="item.id">
      <RouterLink :to="`/categories/${item.id}`">
        {{ item.seoTitle || item.name }}
      </RouterLink>
    </li>
  </ul>
  <strong v-else-if="isLoading">LOADING</strong>
  <p v-else>No data</p>

  <PaginationControl
    :limit-options="limitsWhitelist"
    :default-limit="currentLimit"
    :pages="pagesTotal"
    :current-page="currentPage"
    @set-limit="setLimit"
    @set-page="setPage"
  />
</template>
