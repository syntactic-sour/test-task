import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import type { BeforeFetchContext } from '@vueuse/core'

import { useFetch } from './useFetch'

export function useProducts({
  setTotal,
  productsIds,
  paginationApiParams,
  manual,
}: {
  setTotal?: (total: number) => void
  productsIds: Ref<string[] | number[]> | ComputedRef<string[] | number[]>
  paginationApiParams?: ComputedRef<PaginationAPIPartial>
  manual?: boolean
}) {
  const idsChunk = computed(() => {
    if (!paginationApiParams) {
      return productsIds.value
    }

    if (productsIds.value.length) {
      const start = paginationApiParams.value.offset * paginationApiParams.value.limit
      return productsIds.value.slice(start, start + paginationApiParams.value.limit)
    }

    return []
  })

  const url = computed(() => {
    const params = new URLSearchParams({})
    params.set('productId', idsChunk.value.join(','))
    return 'products?' + params.toString()
  })

  const collection = ref<Product[]>([])
  const isLoading = ref<boolean>(false)

  async function beforeFetch({ cancel }: BeforeFetchContext) {
    if (!idsChunk.value.length) {
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
      setTotal(productsIds.value.length)
    }
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
