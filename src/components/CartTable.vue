<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useClientStoreStore } from '@/stores/mock/store'
import { useCartStore } from '@/stores/cart'

import { formatTotalPrices } from '@/utils/formatPrice'

import ProductRow from '@/components/ProductRow.vue'

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
  <table cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Product</th>
        <th scope="col">Price</th>
        <th scope="col">Amount</th>
        <th scope="col">Total</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <ProductRow v-for="product in products" :key="product.id" :product="product" />
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" scope="row">Total:</th>
        <td>
          {{ total }}
        </td>
        <td></td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
}

th {
  font-weight: bold;
  text-align: left;
}

thead th:not(:first-child),
tfoot td,
tfoot th {
  padding: 0.5rem;
}

th:nth-child(n + 3),
tfoot td,
tfoot th {
  text-align: right;
}

th:first-child {
  width: 3rem;
}

th:nth-child(2) {
  width: 100%;
}

th:nth-child(3) {
  width: 6rem;
}

th:nth-child(4) {
  width: 7rem;
}

th:nth-child(5) {
  width: 7rem;
}

th:last-child {
  width: 2.8rem;
}

td:not(:first-child) {
  padding: 0.5rem;
}
</style>
