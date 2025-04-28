import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

import { useFetch } from './useFetch'

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
      responseFields: 'total, items(id, name, imageUrl, thumbnail)',
      offset: String(paginationApiParams.value.offset || 0),
      limit: String(paginationApiParams.value.limit || 10),
      parent: parentId ? String(parentId.value) : '0',
    })

    return 'categories?' + params.toString()
  })

  const collection = ref<CategoryItem[]>([])
  const isLoading = ref<boolean>(false)

  async function beforeFetch() {
    collection.value = []
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Categories>()

  watch(data, (newValue) => {
    if (!newValue) {
      collection.value = []
      if (setTotal) {
        setTotal(0)
      }
      isLoading.value = false
      return
    }

    collection.value.push(
      ...(newValue.items || []).map((item) => {
        // Mocking images as API doesnt return them for given store
        if (!item.imageUrl && !item.thumbnail) {
          item.imageUrl = 'https://cdn2.thecatapi.com/images/edp.jpg'
        }
        return item
      }),
    )
    if (setTotal) {
      setTotal(newValue.total)
    }
    isLoading.value = false
  })

  return { collection, isLoading, execute }
}
