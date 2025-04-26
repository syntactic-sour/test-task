<script setup lang="ts">
import {
  useRouter,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'

import BuyButton from '@/components/ui-kit/BuyButton.vue'

const { product, linkTo } = defineProps<{
  product: Product
  linkTo: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()

const router = useRouter()

function handleClick() {
  router.push(linkTo)
}
</script>

<template>
  <article @click.self="handleClick" class="product-card">
    <RouterLink :to="linkTo" class="product-link">
      <picture v-if="product.media?.images">
        <source media="(max-width:200px)" :srcset="product.media.images[0].image160pxUrl" />
        <source media="(max-width:480px)" :srcset="product.media.images[0].image400pxUrl" />
        <!-- Alt is missing in API response -->
        <img :src="product.media?.images[0].image800pxUrl" alt="" class="product-image" />
      </picture>
      <!--
          YAGNI for current task,
          but irl component should be able to render headings of different levels -->
      <h3 class="product-name">{{ product.seoTitle || product.name }}</h3>
    </RouterLink>
    <BuyButton :productId="product.id" />
  </article>
</template>

<style scoped>
.product-card {
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-card:focus-within,
.product-card:hover {
  border-color: var(--color-links-decoration-hover);
}

.product-link {
  flex: 1 0 auto;
  text-decoration: none;
  cursor: default;
}

.product-link:focus {
  outline: none;
}

.product-image {
  width: 100%;
}

.product-name {
  color: var(--color-text);
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0.5rem;
}
</style>
