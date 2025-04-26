<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'

import { useInitMock } from '@/composables/mock/useInitMock'
import { useCartStore } from '@/stores/cart'
import BaseLayout from '@/components/layouts/BaseLayout.vue'

const cart = useCartStore()

// Mock login
useInitMock()
</script>

<template>
  <BaseLayout>
    <template #header>
      <nav class="header-navigation">
        <RouterLink to="/categories">Categories list</RouterLink>{{ ' ' }}
        <RouterLink to="/cart">Cart: {{ cart.productsInCartCount }}</RouterLink>
      </nav>
    </template>
    <RouterView />
  </BaseLayout>
</template>

<style scoped>
.header-navigation {
  display: flex;
  justify-content: space-between;
}
</style>
