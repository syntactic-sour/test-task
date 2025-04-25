import { computed } from 'vue'
import { createFetch, type BeforeFetchContext, type UseFetchOptions } from '@vueuse/core'

import { useAuthStore } from '@/stores/mock/auth'
import { useClientStoreStore } from '@/stores/mock/store'

const BASE_URL = import.meta.env.VITE_API_BASE

export interface useFetchOptions {
  fetchOptions?: RequestInit
  manual?: boolean
  beforeFetch?: (ctx: BeforeFetchContext) => Promise<unknown>
  afterFetch?: UseFetchOptions['afterFetch']
}

export function useFetch({ fetchOptions, manual, beforeFetch, afterFetch }: useFetchOptions) {
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
      refetch: !manual,
      async beforeFetch(ctx) {
        if (beforeFetch) {
          await beforeFetch(ctx)
        }

        if (!authStore.token || !clientStoreStore.storeId) {
          ctx.cancel()
        }

        ctx.options.headers = {
          ...ctx.options.headers,
          Authorization: `Bearer ${authStore.token}`,
        }

        return {
          options: ctx.options,
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
