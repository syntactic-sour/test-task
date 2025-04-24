<script setup lang="ts">
import { ref } from 'vue'
import {
  DEFAULT_QUERY_PARAMS_ALIAS,
  type QueryParamsAlias,
} from '@/composables/ui/usePaginationWithRouter'

const { defaultLimit, queryParamsAlias = DEFAULT_QUERY_PARAMS_ALIAS } = defineProps<{
  limitOptions: Set<number>
  defaultLimit: number
  pages: number
  currentPage: number
  queryParamsAlias?: QueryParamsAlias
}>()

const currentLimit = ref<number>(defaultLimit)
</script>

<template>
  <div>
    <label>
      <span>Items per page:</span>
      <select v-model="currentLimit" @change="$emit('set-limit', currentLimit)">
        <option v-for="lim in limitOptions" :key="lim" :value="lim">{{ lim }}</option>
      </select>
    </label>

    <ul v-if="pages > 1">
      <li v-if="currentPage > 1">
        <RouterLink
          :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage - 1 } }"
        >
          Prev
        </RouterLink>
      </li>
      <li v-for="page in pages" :key="page">
        <RouterLink :to="{ query: { ...$route.query, page } }">
          {{ page }}
        </RouterLink>
      </li>
      <li v-if="currentPage < pages">
        <RouterLink
          :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage + 1 } }"
        >
          Next
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
