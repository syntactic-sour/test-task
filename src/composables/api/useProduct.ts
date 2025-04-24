import { computed, ref, watch, type ComputedRef } from 'vue'
import { useFetch } from './useFetch'
import { useInitMock } from '../mock/useInitMock'

// TODO: add isLoading
export function useProduct(id: ComputedRef<string>) {
  const url = computed(() => `products/${id.value}`)
  const product = ref<Product | null>(null)

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch: useInitMock,
  })(url).json<Product>()

  watch(data, (newValue) => {
    if (!data || !newValue) {
      product.value = null
      return
    }

    product.value = {
      ...newValue,
    }
  })

  return { product, execute }
}
