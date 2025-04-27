<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

import { useCartStore } from '@/stores/cart'

import CtaButton from '@/components/ui-kit/CtaButton.vue'

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
  <CtaButton @click="handleClick">Add to cart</CtaButton>
</template>

<style scoped></style>
