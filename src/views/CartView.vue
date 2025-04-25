<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useProducts } from '@/composables/api/useProducts'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { productsIds, productsInCart } = storeToRefs(cart)

const { execute, collection } = useProducts({
  productsIds,
  manual: true,
})

const products = computed(() =>
  [...collection.value].filter((p) => productsIds.value.includes(String(p.id))),
)

if (productsIds.value.length) {
  execute()
}

//TODO: change to a proper modal
function handleOrder() {
  cart.emptyCart()
  alert('Your order is placed!')
}
</script>

<template>
  <h1>Cart</h1>
  <p v-if="!productsIds.length">Cart is empty.</p>
  <!-- TODO: change to a table -->
  <ul v-else-if="collection">
    <li v-for="product in products" :key="product.id">
      {{ product.name }}
      -
      <!-- TODO: visually-hidden text -->
      <button type="button" @click="() => cart.removeProduct(product.id, 1)">-</button>
      {{ productsInCart[product.id] }}

      <!-- TODO: visually-hidden text -->
      <button type="button" @click="() => cart.addProduct(product.id, 1)">+</button>

      <!-- TODO: visually-hidden text -->
      <button type="button" @click="() => cart.removeProduct(product.id)">Remove from cart</button>
    </li>
  </ul>

  <button type="button" @click="handleOrder">Place an order</button>
</template>
