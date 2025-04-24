// Mocked store for client's store

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useClientStoreStore = defineStore('clientStore', () => {
  const storeId = ref('')

  // Mocked
  async function setStore() {
    storeId.value = import.meta.env.VITE_STORE_ID
  }

  function resetStore() {
    storeId.value = ''
  }

  return { storeId, setStore, resetStore }
})
