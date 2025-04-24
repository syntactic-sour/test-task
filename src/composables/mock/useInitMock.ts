import { useAuthStore } from '../../stores/mock/auth'
import { useClientStoreStore } from '../../stores/mock/store'

// Mock login & store selection
export async function useInitMock(): Promise<void> {
  const authStore = useAuthStore()
  const clientStoreStore = useClientStoreStore()

  if (authStore.token && clientStoreStore.storeId) {
    return
  }

  await authStore.login()
  await clientStoreStore.setStore()
}
