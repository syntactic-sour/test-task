<script setup lang="ts">
import WithLoader from '@/components/ui-kit/WithLoader.vue'
import ItemsGrid from '@/components/ui-kit/ItemsGrid.vue'

const { collection, isLoading } = defineProps<{ collection: Category[]; isLoading: boolean }>()
</script>

<template>
  <WithLoader :isLoading="isLoading" loaderLabel="Loading content">
    <ItemsGrid :collection v-slot="slotProps">
      <RouterLink :to="`/categories/${slotProps.item.id}`" class="link">
        <img
          :src="slotProps.item.thumbnail || slotProps.item.imageUrl"
          :alt="slotProps.item.alt"
          class="category-image"
        />
        <span class="link-text">
          {{ slotProps.item.seoTitle || slotProps.item.name }}
        </span>
      </RouterLink>
    </ItemsGrid>
  </WithLoader>
</template>

<style scoped>
.link {
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--color-border);
  text-decoration: none;
}

.link:hover,
.link:focus {
  outline: none;
  border-color: var(--color-outline);
}

.category-image {
  width: 100%;
}

.link-text {
  display: block;
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem 0.75rem;
  font-weight: bold;
  color: var(--color-text);
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
