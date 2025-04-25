import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

export function useCategories({
  parentId,
  paginationApiParams,
  setTotal,
}: {
  paginationApiParams: ComputedRef<PaginationAPIPartial>
  parentId?: ComputedRef<string> | Ref<string>
  setTotal?: (total: number) => void
}) {
  const url = computed(() => {
    const params = new URLSearchParams({
      offset: String(paginationApiParams.value.offset || 0),
      limit: String(paginationApiParams.value.limit || 10),
      parent: parentId ? String(parentId.value) : '0',
    })

    return 'categories?' + params.toString()
  })

  const collection = ref<CategoryItem[]>([])
  const isLoading = ref<boolean>(false)

  async function beforeFetch() {
    await useInitMock()
    collection.value = []
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Categories>()

  watch(data, (newValue) => {
    if (!data || !newValue) {
      collection.value = []
      if (setTotal) {
        setTotal(0)
      }
      isLoading.value = false
      return
    }
    collection.value.push(...(newValue.items || []))
    if (setTotal) {
      setTotal(newValue.total)
    }
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
