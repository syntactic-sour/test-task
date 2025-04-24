import { computed, ref, watch, type ComputedRef } from 'vue'
import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

export function useCategories(
  paginationApiParams: ComputedRef<PaginationAPIPartial>,
  { setTotal }: { setTotal: (total: number) => void },
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
      setTotal(0)
      isLoading.value = false
      return
    }
    // Save root categories only
    collection.value.push(...(newValue.items || []).filter((item: CategoryItem) => !item.parentId))
    setTotal(newValue.total)
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
