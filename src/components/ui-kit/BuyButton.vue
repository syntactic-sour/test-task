<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const { productId } = defineProps<{
  productId: string | number
}>()

const { addProduct } = useCartStore()

function handleClick() {
  addProduct(productId)
  // TODO: aria live-region
}
</script>

<template>
  <button type="button" @click="handleClick" class="cta">Add to cart</button>
  <div class="visually-hidden"></div>
</template>

<style scoped>
.cta {
  background: var(--color-text);
  color: var(--color-background);
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-controls);
  border: none;
  box-shadow: none;
  font-size: 1.1rem;
  margin: 0 0.5rem 1rem;
}

.cta:hover {
  background: var(--color-cta-hover-bg);
  color: var(--color-cta-hover-text);
}
</style>
