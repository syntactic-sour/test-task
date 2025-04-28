<script setup lang="ts">
import { onBeforeMount } from 'vue'

import { useCategories } from '@/composables/api/useCategories'
import { useProducts } from '@/composables/api/useProducts'
import { useCategoriesProductsPagination } from '@/composables/useCategoriesProductsPagination'

import ItemsGrid from '@/components/ui-kit/ItemsGrid.vue'
import WithLoader from '@/components/ui-kit/WithLoader.vue'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import CategorySection from '@/components/CategorySection.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import ProductCard from '@/components/ProductCard.vue'

const {
  subcategoriesPagination: categoriesPagination,
  productsPagination,
  setUrlQueryParams,
} = useCategoriesProductsPagination()

const { collection, isLoading, execute } = useCategories({
  paginationApiParams: categoriesPagination.paginationApiParams,
  setTotal: categoriesPagination.setTotal,
})

const products = useProducts({
  paginationApiParams: productsPagination.paginationApiParams,
  setTotal: productsPagination.setTotal,
  fetchAll: true,
})

execute()
products.execute()

onBeforeMount(() => {
  setUrlQueryParams()
})
</script>

<template>
  <h1>Store</h1>

  <CategorySection
    v-if="isLoading || collection.length"
    heading="Root categories"
    class="categories-section"
  >
    <CategoriesList :collection :is-loading="isLoading" />

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
    <WithLoader :is-loading="products.isLoading.value" loaderLabel="Loading products">
      <ItemsGrid :collection="products.collection.value" v-slot="slotProps">
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
