<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useClientStoreStore } from '@/stores/mock/store'
import { useCartStore } from '@/stores/cart'

import { formatTotalPrices, formatTotalPrice } from '@/utils/formatPrice'

import SecondaryButton from '@/components/ui-kit/SecondaryButton.vue'
import ProductPreviewImage from '@/components/ProductPreviewImage.vue'
import ProductAmount from '@/components/ProductAmount.vue'

const { products } = defineProps<{ products: Product[] }>()

const { currency } = useClientStoreStore()
const cart = useCartStore()
const { productsInCart } = storeToRefs(cart)

const total = computed(() =>
  formatTotalPrices({
    collection: products,
    amounts: productsInCart.value,
    keyPrice: 'price',
    keyAmount: 'id',
    currency,
  }),
)
</script>

<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        <ProductPreviewImage :images="product.media?.images" imgClass="preview-image" />

        <RouterLink
          :to="`/categories/${product.defaultCategoryId}/products/${product.id}`"
          class="product-link"
        >
          {{ product.seoTitle || product.name }}
        </RouterLink>
        <SecondaryButton
          @click="() => cart.removeProduct(product.id)"
          aria-label="Remove from cart"
        >
          ×
        </SecondaryButton>
        <dl>
          <dt>Price:</dt>
          <dd>{{ product.price }}&nbsp;{{ currency }}</dd>

          <dt>Amount:</dt>
          <dd><ProductAmount :product></ProductAmount></dd>

          <dt>Total price:</dt>
          <dd>{{ formatTotalPrice(product.price, productsInCart[product.id], currency) }}</dd>
        </dl>
      </li>
    </ul>
    <dl class="order-total">
      <dt>Order total:</dt>
      <dd>{{ total }}</dd>
    </dl>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  border-bottom: 2px solid var(--color-border);
  padding: 0 0 1rem;
  margin: 0 0 1rem;
}

li::after {
  content: '';
  clear: both;
  display: table;
}

>>> .preview-image {
  width: 30%;
  max-width: 300px;
  float: left;
  margin: 0 1rem 1rem 0;
}

.product-link {
  margin-right: 2rem;
}

dl {
  clear: left;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

@media (min-width: 24.8rem) {
  dl {
    clear: none;
    margin-top: 2rem;
    max-width: 12rem;
  }
}

dt {
  font-weight: bold;
  flex: 1 0 50%;
}

.order-total {
  margin-top: 10px;
  margin-left: auto;
}
</style>
