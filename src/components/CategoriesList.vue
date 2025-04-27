<script setup lang="ts">
import WithLoader from '@/components/ui-kit/WithLoader.vue'

const { collection, isLoading } = defineProps<{ collection: CategoryItem[]; isLoading: boolean }>()
</script>

<template>
  <WithLoader :isLoading="isLoading" loaderLabel="Loading content">
    <ul class="categories-list">
      <li v-for="item in collection" :key="item.id" class="categories-item">
        <RouterLink :to="`/categories/${item.id}`">
          {{ item.seoTitle || item.name }}
        </RouterLink>
      </li>
    </ul>
  </WithLoader>
</template>

<style scoped>
.categories-list {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}

.categories-item + .categories-item {
  margin-top: 0.5rem;
}
</style>
