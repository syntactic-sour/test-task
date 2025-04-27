<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCategory } from '@/composables/api/useCategory'
import { useCategories } from '@/composables/api/useCategories'
import { useProducts } from '@/composables/api/useProducts'
import { useCategoriesProductsPagination } from '@/composables/useCategoriesProductsPagination'

import ItemsGrid from '@/components/ui-kit/ItemsGrid.vue'
import WithLoader from '@/components/ui-kit/WithLoader.vue'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import CategorySection from '@/components/CategorySection.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()

const categoryId = computed(() =>
  typeof route.params.categoryId === 'string'
    ? route.params.categoryId
    : route.params.categoryId[0],
)

const { category, productsIds, isLoading, execute } = useCategory(categoryId)

const { subcategoriesPagination, productsPagination, setUrlQueryParams } =
  useCategoriesProductsPagination()

const subCategories = useCategories({
  paginationApiParams: subcategoriesPagination.paginationApiParams,
  parentId: categoryId,
  setTotal: subcategoriesPagination.setTotal,
})

const products = useProducts({
  paginationApiParams: productsPagination.paginationApiParams,
  setTotal: productsPagination.setTotal,
  productsIds,
})

execute()
subCategories.execute()

watch(category, () => {
  products.execute()
})

watch(categoryId, () => {
  execute()
  setUrlQueryParams()
})
</script>

<template>
  <h1>{{ isLoading || !category ? 'Category' : category.seoTitle || category.name }}</h1>

  <CategorySection
    v-if="subCategories.isLoading.value || subCategories.collection.value.length"
    heading="Subcategories"
    class="subcategories-section"
  >
    <CategoriesList
      :collection="subCategories.collection.value"
      :is-loading="subCategories.isLoading.value"
    />

    <template #pagination>
      <PaginationControl
        pagination-aria-label="Subcategories pagination"
        :limit-options="subcategoriesPagination.limitsWhitelist.value"
        :default-limit="subcategoriesPagination.currentLimit.value"
        :pages="subcategoriesPagination.pagesTotal.value"
        :current-page="subcategoriesPagination.currentPage.value"
        @set-limit="subcategoriesPagination.setLimit"
        @set-page="subcategoriesPagination.setPage"
      />
    </template>
  </CategorySection>

  <CategorySection heading="Products">
    <WithLoader :is-loading="products.isLoading.value" loaderLabel="Loading products">
      <ItemsGrid :collection="products.collection.value" v-slot="slotProps">
        <ProductCard
          :product="slotProps.item"
          :linkTo="`/categories/${categoryId}/products/${slotProps.item.id}`"
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
.subcategories-section {
  margin-bottom: 4rem;
}
</style>
