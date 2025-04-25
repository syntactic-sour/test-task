import { computed, ref, watch, type ComputedRef } from 'vue'
import { useFetch } from './useFetch'

export function useCategory(id: ComputedRef<string>) {
  const url = computed(() => `categories/${id.value}?productIds=true`)

  const category = ref<Omit<Category, 'productsIds'> | null>(null)
  const productsIds = ref<string[]>([])
  const isLoading = ref<boolean>(false)

  async function beforeFetch() {
    category.value = null
    productsIds.value = []
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Category>()

  watch(data, (newValue) => {
    if (!newValue) {
      category.value = null
      productsIds.value = []
      isLoading.value = false
      return
    }

    category.value = {
      id: newValue.id,
      name: newValue.name,
      seoTitle: newValue.seoTitle,
      enabled: newValue.enabled,
      orderBy: newValue.orderBy,
      parentId: newValue.parentId,
    }

    productsIds.value = newValue.productIds || []
    isLoading.value = false
  })

  return { category, productsIds, isLoading, execute }
}
