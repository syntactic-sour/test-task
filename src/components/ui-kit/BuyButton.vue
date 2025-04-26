<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

import { useCartStore } from '@/stores/cart'

const { productId } = defineProps<{
  productId: string | number
}>()

const { addProduct } = useCartStore()
const effect = ref(false)
const timeout = ref()

function handleClick() {
  clearTimeout(timeout.value)
  addProduct(productId)
  effect.value = true
  timeout.value = setTimeout(() => {
    effect.value = false
  }, 300)
  // TODO: aria live-region
}

onBeforeUnmount(() => {
  clearTimeout(timeout.value)
})
</script>

<template>
  <button type="button" @click="handleClick" class="cta" :disabled="effect">
    Add to cart
    <Transition name="fade">
      <span v-if="effect" class="effect"></span>
    </Transition>
  </button>
</template>

<style scoped>
.cta {
  background: var(--color-text);
  color: var(--color-background);
  padding: 0.4em 1.2em;
  border-radius: var(--radius-controls);
  border: none;
  box-shadow: none;
  font-size: 1.1em;
  position: relative;
}

.cta:hover {
  background: var(--color-cta-hover-bg);
  color: var(--color-cta-hover-text);
}

.effect {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-radius: inherit;
  box-shadow: 0 0 10px 2px var(--color-price-accent);
  background: var(--color-price-accent);
  z-index: -1;
}
</style>
