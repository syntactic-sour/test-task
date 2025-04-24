<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useInitMock } from './composables/mock/useInitMock'
import BaseLayout from './components/layouts/BaseLayout.vue'

useInitMock()
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
