<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useProduct } from '@/composables/api/useProduct'
import { useCartStore } from '@/stores/cart'

const route = useRoute()

const productId = computed(() =>
  typeof route.params.productId === 'string' ? route.params.productId : route.params.productId[0],
)

const { product, execute } = useProduct(productId)
const { addProduct } = useCartStore()
execute()
</script>

<template>
  <h1>{{ product?.seoTitle || product?.name }}</h1>
  <picture v-for="pic in product?.media?.images" :key="pic.id">
    <source media="(max-width:320px)" :srcset="pic.image160pxUrl" />
    <source media="(max-width:480px)" :srcset="pic.image400pxUrl" />
    <source media="(max-width:560px)" :srcset="pic.image800pxUrl" />
    <source media="(max-width:700px)" :srcset="pic.image1500pxUrl" />

    <img
      :src="pic.image1500pxUrl"
      alt="???????????? No description for images? ATAG"
      style="width: auto"
    />
  </picture>
  <strong>{{ product?.price }}</strong>
  <button :disabled="!product" type="button" @click="() => product && addProduct(product.id)">
    Buy
  </button>
</template>
