import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface ProductsInCart {
  [id: string | number]: number
}

export const useCartStore = defineStore(
  'cart',
  () => {
    const productsInCart = ref<ProductsInCart>({})
    const productsInCartCount = computed(() =>
      Object.values(productsInCart.value).reduce((sum, val) => sum + val, 0),
    )
    const productsIds = computed(() => Object.keys(productsInCart.value))

    function addProduct(id: string | number, amount: number = 1) {
      if (productsInCart.value[id]) {
        productsInCart.value[id] += amount
        return
      }
      productsInCart.value[id] = amount
    }

    function removeProduct(id: string | number, amount?: number) {
      // Remove all
      if (!amount || productsInCart.value[id] === amount) {
        delete productsInCart.value[id]
        return
      }
      productsInCart.value[id] -= amount
    }

    function emptyCart() {
      productsInCart.value = {}
    }

    return {
      productsInCart,
      productsIds,
      productsInCartCount,
      addProduct,
      removeProduct,
      emptyCart,
    }
  },
  { persist: { pick: ['productsInCart'] } },
)
