<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useProduct } from '@/composables/api/useProduct'
import { useClientStoreStore } from '@/stores/mock/store'

import WithLoader from '@/components/ui-kit/WithLoader.vue'
import BuyButton from '@/components/BuyButton.vue'

const route = useRoute()

const productId = computed(() =>
  typeof route.params.productId === 'string' ? route.params.productId : route.params.productId[0],
)

const { currency } = useClientStoreStore()
const { product, isLoading, execute } = useProduct(productId)

execute()
</script>

<template>
  <WithLoader :is-loading="isLoading" loaderLabel="Loading product">
    <div v-if="product">
      <h1>{{ product.seoTitle || product.name }}</h1>
      <div class="images">
        <picture v-for="pic in product.media?.images" :key="pic.id">
          <source media="(max-width:320px)" :srcset="pic.image160pxUrl" />
          <source media="(max-width:480px)" :srcset="pic.image400pxUrl" />
          <source media="(max-width:560px)" :srcset="pic.image800pxUrl" />
          <source media="(max-width:700px)" :srcset="pic.image1500pxUrl" />

          <img :src="pic.image1500pxUrl" alt="" style="width: auto" />
        </picture>
      </div>
      <div class="shopping-container">
        <strong class="price">{{ product?.price }} {{ currency }}</strong>

        <BuyButton :productId="product?.id" />
      </div>
    </div>
  </WithLoader>

  <Transition name="fade">
    <div v-if="!isLoading && !product">
      <h1>Product not found</h1>
    </div>
  </Transition>
</template>

<style scoped>
.images {
  margin: 2rem 0;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}

.shopping-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2.8rem;
  font-size: 1.4rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-price-accent);
}
</style>
