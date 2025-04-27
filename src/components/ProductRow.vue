<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useClientStoreStore } from '@/stores/mock/store'
import { useCartStore } from '@/stores/cart'

import { formatTotalPrice } from '@/utils/formatPrice'

import SecondaryButton from '@/components/ui-kit/SecondaryButton.vue'
import ProductPreviewImage from '@/components/ProductPreviewImage.vue'
import ProductAmount from '@/components/ProductAmount.vue'

const { product } = defineProps<{ product: Product }>()

const { currency } = useClientStoreStore()
const cart = useCartStore()
const { productsInCart } = storeToRefs(cart)

const total = computed(() =>
  formatTotalPrice(product.price, productsInCart.value[product.id], currency),
)
</script>

<template>
  <tr :key="product.id">
    <td>
      <ProductPreviewImage :images="product.media?.images" />
    </td>
    <td>
      <RouterLink :to="`/categories/${product.defaultCategoryId}/products/${product.id}`">
        {{ product.seoTitle || product.name }}
      </RouterLink>
    </td>
    <td>{{ product.price }}&nbsp;{{ currency }}</td>
    <td>
      <ProductAmount :product></ProductAmount>
    </td>
    <td>
      <span> {{ total }}</span>
    </td>
    <td>
      <SecondaryButton @click="() => cart.removeProduct(product.id)" aria-label="Remove from cart">
        ×
      </SecondaryButton>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.5rem;
}

td:first-child {
  padding: 0.5rem 0 0;
}

td {
  border-bottom: 2px solid var(--color-border);
}

td:nth-child(n + 3) {
  text-align: right;
}

.amount {
  padding: 0 0.5em;
}
</style>
