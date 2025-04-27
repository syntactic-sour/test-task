<script setup lang="ts">
import DotsLoader from '@/components/ui-kit/DotsLoader.vue'

const { isLoading, loaderLabel } = defineProps<{ isLoading: boolean; loaderLabel: string }>()
</script>

<template>
  <div class="with-loader-container">
    <Transition name="fade">
      <DotsLoader v-if="isLoading" :ariaLabel="loaderLabel" class="loader" />
    </Transition>
    <Transition name="fade">
      <slot v-if="!isLoading"></slot>
    </Transition>
  </div>
</template>

<style scoped>
.with-loader-container {
  position: relative;
  min-height: 2rem;
}

.loader {
  position: absolute;
  top: 0.8rem;
  font-size: 2rem;
}
</style>
