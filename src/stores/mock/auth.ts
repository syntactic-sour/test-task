// Mocked store for client's token

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')

  // Mocked
  async function login() {
    token.value = import.meta.env.VITE_TOKEN
  }

  function logout() {
    token.value = ''
  }

  return { token, login, logout }
})
