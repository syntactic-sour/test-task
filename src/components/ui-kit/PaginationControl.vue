<script setup lang="ts">
import { ref } from 'vue'
import {
  DEFAULT_QUERY_PARAMS_ALIAS,
  type QueryParamsAlias,
} from '@/composables/ui/usePaginationWithRouter'

const {
  defaultLimit,
  pages,
  queryParamsAlias = DEFAULT_QUERY_PARAMS_ALIAS,
} = defineProps<{
  limitOptions: Set<number>
  defaultLimit: number
  pages: number
  currentPage: number
  paginationAriaLabel: string
  queryParamsAlias?: QueryParamsAlias
}>()

const currentLimit = ref<number>(defaultLimit)
</script>

<template>
  <div class="pagination-control">
    <label class="pagination-count">
      <span class="pagination-count-label">Items per page:</span>
      <select
        class="pagination-count-select"
        v-model="currentLimit"
        @change="$emit('set-limit', currentLimit)"
      >
        <option v-for="lim in limitOptions" :key="lim" :value="lim">{{ lim }}</option>
      </select>
    </label>

    <nav v-if="pages > 1" class="pagination-pages" :aria-label="paginationAriaLabel">
      <RouterLink
        v-if="currentPage > 1"
        class="pagination-link"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage - 1 } }"
        @click="$emit('set-page', currentPage - 1)"
      >
        <span class="visually-hidden">Go to{{ ' ' }}</span>
        Previous
        <span class="visually-hidden">{{ ' ' }}page</span>
      </RouterLink>

      <RouterLink
        v-if="currentPage > 2"
        class="pagination-link"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: 1 } }"
        @click="$emit('set-page', 1)"
      >
        <span class="visually-hidden">Go to page{{ ' ' }}</span
        >1
      </RouterLink>
      <span v-if="currentPage > 2" class="pages-delimiter" aria-hidden="true">...</span>

      <RouterLink
        v-if="currentPage > 1"
        class="pagination-link"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage - 1 } }"
        @click="$emit('set-page', currentPage - 1)"
      >
        <span class="visually-hidden">Go to page{{ ' ' }}</span
        >{{ currentPage - 1 }}
      </RouterLink>
      <RouterLink
        class="pagination-link pagination-link-current"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage } }"
        @click="$emit('set-page', currentPage)"
      >
        <span class="visually-hidden">Go to page{{ ' ' }}</span
        >{{ currentPage }}
      </RouterLink>
      <RouterLink
        v-if="currentPage + 1 <= pages"
        class="pagination-link"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage + 1 } }"
        @click="$emit('set-page', currentPage + 1)"
      >
        <span class="visually-hidden">Go to page{{ ' ' }}</span
        >{{ currentPage + 1 }}
      </RouterLink>

      <RouterLink
        v-if="currentPage < pages"
        class="pagination-link"
        :to="{ query: { ...$route.query, [queryParamsAlias.pageParam]: currentPage + 1 } }"
        @click="$emit('set-page', currentPage + 1)"
      >
        <span class="visually-hidden">Go to{{ ' ' }}</span>
        Next
        <span class="visually-hidden">{{ ' ' }}page</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.pagination-control {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 2rem;
}

.pagination-count {
  display: inline-flex;
  flex-direction: column;
}

.pagination-count-select {
  padding: 0.5rem 0.8rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-controls);
  line-height: var(--line-height-text);
}

.pagination-pages {
  flex: 0 0 auto;
  display: inline-flex;
}

.pagination-link {
  padding: 0.3rem 0.8rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-controls);
  text-decoration: none;
}

.pagination-link + .pagination-link,
.pages-delimiter,
.pages-delimiter + .pagination-link {
  margin-left: 1rem;
}

.pages-delimiter {
  padding: 0.3rem;
  align-self: end;
}

.pagination-link-current,
.pagination-link-current:hover,
.pagination-link-current:active,
.pagination-link-current:visited {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}
</style>
