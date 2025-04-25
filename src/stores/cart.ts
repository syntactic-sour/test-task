import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface ProductsInCart {
  [id: string | number]: number
}

export const useCartStore = defineStore('cart', () => {
  const productsInCart = ref<ProductsInCart>({})
  const productsInCartCount = computed(() => {
    return Object.values(productsInCart.value).reduce((sum, val) => sum + val, 0)
  })

  function addProduct(id: string | number, amount: number = 1) {
    if (productsInCart.value[id]) {
      productsInCart.value[id] += amount
      return
    }
    productsInCart.value[id] = amount
  }

  return { productsInCart, productsInCartCount, addProduct }
})
