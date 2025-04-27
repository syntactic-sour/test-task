<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useProducts } from '@/composables/api/useProducts'
import { useCartStore } from '@/stores/cart'

import WithLoader from '@/components/ui-kit/WithLoader.vue'
import CtaButton from '@/components/ui-kit/CtaButton.vue'
import CartTable from '@/components/CartTable.vue'
import CartList from '@/components/CartList.vue'

const cart = useCartStore()
const { productsIds } = storeToRefs(cart)
const step = ref(0)

const { execute, isLoading, collection } = useProducts({
  productsIds,
  manual: true,
})

const products = computed(() =>
  [...collection.value].filter((p) => productsIds.value.includes(String(p.id))),
)

if (productsIds.value.length) {
  execute()
}

function handleOrder() {
  step.value = 1
  cart.emptyCart()
}
</script>

<template>
  <h1>Cart</h1>

  <WithLoader
    v-if="step === 0 && productsIds.length"
    :is-loading="isLoading"
    loaderLabel="Loading cart"
  >
    <div v-if="collection">
      <CartTable :products class="cart-table" />
      <CartList :products class="cart-list" />
      <div class="cta-wrapper">
        <CtaButton type="button" @click="handleOrder">Place an order</CtaButton>
      </div>
    </div>
  </WithLoader>

  <p v-else-if="step === 0">Cart is empty.</p>
  <div v-else-if="step === 1">
    <p>Your order is placed. Thank you!</p>
    <RouterLink to="/">Back to shopping</RouterLink>
  </div>
</template>

<style scoped>
.cta-wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

@media (min-width: 20rem) {
  .cta-wrapper {
    justify-content: end;
  }
}

.cart-table {
  display: none;
}

@media screen and (min-width: 46rem) {
  .cart-list {
    display: none;
  }

  .cart-table {
    display: table;
  }
}
</style>
