<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/stores/cart'

import SecondaryButton from '@/components/ui-kit/SecondaryButton.vue'

const { product } = defineProps<{ product: Product }>()

const cart = useCartStore()
const { productsInCart } = storeToRefs(cart)
</script>

<template>
  <SecondaryButton @click="() => cart.removeProduct(product.id, 1)" arial-label="Decrease amount">
    −
  </SecondaryButton>
  <span class="amount">{{ productsInCart[product.id] }}</span>
  <SecondaryButton @click="() => cart.addProduct(product.id, 1)" aria-label="Increase amount">
    +
  </SecondaryButton>
</template>

<style scoped>
.amount {
  padding: 0 0.5em;
}
</style>
