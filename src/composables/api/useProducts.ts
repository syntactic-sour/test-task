import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

export function useProducts(
  paginationApiParams: ComputedRef<PaginationAPIPartial>,
  { setTotal, productsIds }: { setTotal: (total: number) => void; productsIds: Ref<string[]> },
) {
  const idsChunk = computed(() => {
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

  async function beforeFetch() {
    await useInitMock()
    collection.value = []
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Products>()

  watch(data, (newValue) => {
    if (!data || !newValue) {
      collection.value = []
      isLoading.value = false
      return
    }

    collection.value.push(...(newValue.items || []))
    setTotal(productsIds.value.length)
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
