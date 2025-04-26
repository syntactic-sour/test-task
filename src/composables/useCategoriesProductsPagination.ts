import { onBeforeMount, ref } from 'vue'
import { onBeforeRouteUpdate, type LocationQuery } from 'vue-router'

import { usePaginationWithRouter } from '@/composables/ui/usePaginationWithRouter'

export function useCategoriesProductsPagination() {
  const prevQuery = ref<LocationQuery | null>(null)
  const prevId = ref<string | null>(null)

  const subcategoriesPagination = usePaginationWithRouter(new Set([1, 2, 3, 10]))
  const productsPagination = usePaginationWithRouter(new Set([1, 2, 3, 10]), {
    showParam: 'showProducts',
    pageParam: 'productsPage',
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

  return {
    subcategoriesPagination,
    productsPagination,
    setUrlQueryParams,
  }
}
