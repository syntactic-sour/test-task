import { computed, ref, watch, type ComputedRef } from 'vue'

import { useFetch } from './useFetch'

export function useProduct(id: ComputedRef<string>) {
  const url = computed(() => `products/${id.value}`)

  const product = ref<Product | null>(null)
  const isLoading = ref<boolean>(false)

  async function beforeFetch() {
    product.value = null
    isLoading.value = true
  }

  const { data, execute } = useFetch({
    fetchOptions: { method: 'GET' },
    beforeFetch,
  })(url).json<Product>()

  watch(data, (newValue) => {
    product.value = newValue ? { ...newValue } : null
    isLoading.value = false
  })

  return { product, execute }
}
