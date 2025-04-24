<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { onBeforeRouteUpdate, RouterLink, useRoute, type LocationQuery } from 'vue-router'
import PaginationControl from '@/components/ui-kit/PaginationControl.vue'
import { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'
import { useCategory } from '@/composables/api/useCategory'
import { useCategories } from '@/composables/api/useCategories'
import { useProducts } from '@/composables/api/useProducts'

const route = useRoute()

const categoryId = computed(() =>
  typeof route.params.categoryId === 'string'
    ? route.params.categoryId
    : route.params.categoryId[0],
)

const prevQuery = ref<LocationQuery | null>(null)
const prevId = ref<string | null>(null)

const { category, productsIds, execute } = useCategory(categoryId)

const subcategoriesPagination = usePaginationWithRouter(new Set([1, 10, 20, 30]))
const productsPagination = usePaginationWithRouter(new Set([1, 10, 20, 30]), {
  showParam: 'showProducts',
  pageParam: 'productsPage',
})

const subCategories = useCategories(subcategoriesPagination.paginationApiParams, {
  setTotal: subcategoriesPagination.setTotal,
  parentId: categoryId,
})

function setUrlQueryParams() {
  productsPagination.setInitialParams(
    productsPagination.getInitialParams(subcategoriesPagination.getInitialParams()),
  )
}

onBeforeMount(setUrlQueryParams)
onBeforeRouteUpdate((to, from) => {
  if (to.params.categoryId === from.params.categoryId) {
    return
  }

  // Back
  if (prevId.value === to.params.categoryId && prevQuery.value) {
    productsPagination.setTotal(Infinity)
    subcategoriesPagination.setTotal(Infinity)
    productsPagination.setPage(Number(prevQuery.value['productsPage']))
    subcategoriesPagination.setPage(Number(prevQuery.value['page']))
  } else {
    productsPagination.setPage(1)
    subcategoriesPagination.setPage(1)
  }

  prevId.value = from.params.categoryId as string
  prevQuery.value = from.query
})

const products = useProducts(productsPagination.paginationApiParams, {
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
  <!-- TODO: proper pagination -->
  <RouterLink :to="`/categories/`"> Back to root categories </RouterLink>
  <h1>{{ category?.seoTitle || category?.name }}</h1>

  <template v-if="!subCategories.isLoading.value && subCategories.collection.value.length">
    <h2>Subcategories</h2>
    <ul>
      <li v-for="item in subCategories.collection.value" :key="item.id">
        <RouterLink :to="`/categories/${item.id}`">
          {{ item.seoTitle || item.name }}
        </RouterLink>
      </li>
    </ul>

    <PaginationControl
      :limit-options="subcategoriesPagination.limitsWhitelist.value"
      :default-limit="subcategoriesPagination.currentLimit.value"
      :pages="subcategoriesPagination.pagesTotal.value"
      :current-page="subcategoriesPagination.currentPage.value"
      @set-limit="subcategoriesPagination.setLimit"
      @set-page="subcategoriesPagination.setPage"
    />
  </template>
  <strong v-else-if="subCategories.isLoading.value">LOADING Subcategories</strong>

  <template v-if="!products.isLoading.value">
    <h2>Products</h2>
    <ul>
      <li v-for="item in products.collection.value" :key="item.id">
        <RouterLink :to="`/categories/${categoryId}/products/${item.id}`">
          {{ item.seoTitle || item.name }}
        </RouterLink>
      </li>
    </ul>

    <PaginationControl
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
  <strong v-else-if="products.isLoading.value">LOADING Subcategories</strong>
</template>
