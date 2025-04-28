<script setup lang="ts">
import type { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'

import ItemsGrid from '@/components/ui-kit/ItemsGrid.vue'
import WithLoader from '@/components/ui-kit/WithLoader.vue'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import CategorySection from '@/components/CategorySection.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import ProductCard from '@/components/ProductCard.vue'

const {
  categoriesPagination,
  productsPagination,
  categories,
  products,
  isLoadingCategories,
  isLoadingProducts,
  categoriesHeading,
} = defineProps<{
  categoriesPagination: usePaginationWithRouter
  productsPagination: usePaginationWithRouter
  categories: Category[]
  products: Product[]
  isLoadingCategories: boolean
  isLoadingProducts: boolean
  categoriesHeading: string
}>()
</script>

<template>
  <CategorySection
    v-if="isLoadingCategories || categories.length"
    :heading="categoriesHeading"
    class="categories-section"
  >
    <CategoriesList :collection="categories" :is-loading="isLoadingCategories" />

    <template #pagination>
      <PaginationControl
        pagination-aria-label="Subcategories pagination"
        :limit-options="categoriesPagination.limitsWhitelist.value"
        :default-limit="categoriesPagination.currentLimit.value"
        :pages="categoriesPagination.pagesTotal.value"
        :current-page="categoriesPagination.currentPage.value"
        @set-limit="categoriesPagination.setLimit"
        @set-page="categoriesPagination.setPage"
      />
    </template>
  </CategorySection>

  <CategorySection heading="Products">
    <WithLoader :is-loading="isLoadingProducts" loaderLabel="Loading products">
      <ItemsGrid :collection="products" v-slot="slotProps">
        <ProductCard
          :product="slotProps.item"
          :linkTo="`/categories/${slotProps.item.defaultCategoryId}/products/${slotProps.item.id}`"
        />
      </ItemsGrid>
    </WithLoader>
    <template #pagination>
      <PaginationControl
        pagination-aria-label="Products pagination"
        :limit-options="productsPagination.limitsWhitelist.value"
        :default-limit="productsPagination.currentLimit.value"
        :pages="productsPagination.pagesTotal.value"
        :current-page="productsPagination.currentPage.value"
        :queryParamsAlias="{
          showParam: 'showProducts',
          pageParam: 'productsPage',
        }"
        @set-limit="productsPagination.setLimit"
        @set-page="productsPagination.setPage"
      />
    </template>
  </CategorySection>
</template>

<style scoped>
.categories-section {
  margin-bottom: 4rem;
}
</style>
