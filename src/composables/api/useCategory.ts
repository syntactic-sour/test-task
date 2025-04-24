import { ref, watch, type ComputedRef } from 'vue'
import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

export function useCategory(id: ComputedRef<string>) {
  const url = ref(`categories/${id.value}`)
  const category = ref<Omit<Category, 'productsIds'> | null>()
  const productsCollection = ref<Product[]>([])
  const subCategoriesCollection = ref<Category[]>([])

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch: useInitMock,
  })(url).json<Category>()

  watch(data, (newValue) => {
    if (!data || !newValue) {
      category.value = null
      productsCollection.value = []
      subCategoriesCollection.value = []
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

    console.log(newValue)
    productsCollection.value.push(...(newValue?.productIds || []))
  })

  return { category, productsCollection, subCategoriesCollection, execute }
}
