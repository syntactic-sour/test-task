import { computed } from 'vue'
import { createFetch, type UseFetchOptions } from '@vueuse/core'
import { useAuthStore } from '../../stores/mock/auth'
import { useClientStoreStore } from '../../stores/mock/store'

const BASE_URL = import.meta.env.VITE_API_BASE

export interface useFetchOptions {
  fetchOptions?: RequestInit
  beforeFetch?: () => Promise<unknown>
  afterFetch?: UseFetchOptions['afterFetch']
}

export function useFetch({ fetchOptions, beforeFetch, afterFetch }: useFetchOptions) {
  const authStore = useAuthStore()
  const clientStoreStore = useClientStoreStore()

  const baseUrl = computed(() => {
    if (clientStoreStore.storeId) {
      return `${BASE_URL}${clientStoreStore.storeId}`
    }

    return ''
  })

  return createFetch({
    baseUrl,
    options: {
      immediate: false,
      refetch: true,
      async beforeFetch({ options, cancel }) {
        if (beforeFetch) {
          await beforeFetch()
        }

        if (!authStore.token || !clientStoreStore.storeId) {
          cancel()
        }

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
        }

        return {
          options,
        }
      },
      afterFetch,
    },

    fetchOptions: {
      mode: 'cors',
      ...(fetchOptions || {}),
    },
  })
}
