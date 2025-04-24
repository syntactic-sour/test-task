import { computed, ref, watch, type ComputedRef } from 'vue'
import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

export function useCategories(
  paginationApiParams: ComputedRef<{
    offset: number
    limit: number
  }>,
) {
  const url = computed(() => {
    const params = new URLSearchParams({
      hidden_categories: 'true',
      offset: String(paginationApiParams.value.offset || 0),
      limit: String(paginationApiParams.value.limit || 10),
    })
    return 'categories?' + params.toString()
  })

  const collection = ref<CategoryItem[]>([])
  const isLoading = ref<boolean>(false)
  const total = ref<number>(0)

  function _resetStore(loading: boolean = false) {
    collection.value = []

    isLoading.value = loading
  }

  async function beforeFetch() {
    await useInitMock()
    _resetStore(true)
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Categories>()

  watch(data, (newValue) => {
    if (!data || !newValue) {
      _resetStore()
      total.value = 0
      return
    }
    // Save root categories only
    collection.value.push(...(newValue.items || []).filter((item: CategoryItem) => !item.parentId))
    total.value = newValue.total
    isLoading.value = false
  })

  return { collection, isLoading, total, execute }
}
