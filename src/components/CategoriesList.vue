<script setup lang="ts">
import DotsLoader from '@/components/ui-kit/DotsLoader.vue'

const { collection, isLoading } = defineProps<{ collection: CategoryItem[]; isLoading: boolean }>()
</script>

<template>
  <div class="list-container">
    <Transition name="fade">
      <DotsLoader v-if="isLoading" ariaLabel="Loading content" class="loader" />
    </Transition>
    <Transition name="fade">
      <ul v-if="!isLoading" class="categories-list">
        <li v-for="item in collection" :key="item.id" class="categories-item">
          <RouterLink :to="`/categories/${item.id}`">
            {{ item.seoTitle || item.name }}
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.list-container {
  position: relative;
  min-height: 2rem;
}

.categories-list {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}

.categories-item + .categories-item {
  margin-top: 0.5rem;
}

.loader {
  position: absolute;
  font-size: 2rem;
}
</style>
