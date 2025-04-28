import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import type { BeforeFetchContext } from '@vueuse/core'

import { useFetch } from './useFetch'

export function useProducts({
  setTotal,
  productsIds,
  paginationApiParams,
  manual,
  fetchAll,
}: {
  setTotal?: (total: number) => void
  productsIds?: Ref<string[] | number[]> | ComputedRef<string[] | number[]>
  paginationApiParams?: ComputedRef<PaginationAPIPartial>
  manual?: boolean
  fetchAll?: boolean
}) {
  const idsChunk = computed(() => {
    if (productsIds && !paginationApiParams) {
      return productsIds.value
    }

    if (productsIds && productsIds.value.length && paginationApiParams) {
      const start = paginationApiParams.value.offset
      return productsIds.value.slice(start, start + paginationApiParams.value.limit)
    }

    return []
  })

  const url = computed(() => {
    const params = new URLSearchParams({})
    if (fetchAll) {
      params.set('offset', String(paginationApiParams?.value.offset))
      params.set('limit', String(paginationApiParams?.value.limit))
    } else {
      params.set('productId', idsChunk.value.join(','))
    }
    return 'products?' + params.toString()
  })

  const collection = ref<Product[]>([])
  const isLoading = ref<boolean>(false)

  async function beforeFetch({ cancel }: BeforeFetchContext) {
    if (!idsChunk.value.length && !fetchAll) {
      cancel()
    }
    collection.value = []
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    manual,
    beforeFetch,
  })(url).json<Products>()

  watch(data, (newValue) => {
    if (!newValue) {
      collection.value = []
      isLoading.value = false
      return
    }
    collection.value.push(...(newValue.items || []))

    if (setTotal) {
      setTotal(productsIds && !fetchAll ? productsIds.value.length : newValue.total)
    }
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
