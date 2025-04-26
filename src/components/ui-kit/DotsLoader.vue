<script setup lang="ts">
const { ariaLabel } = defineProps<{ ariaLabel: string }>()
</script>

<template>
  <div class="loader" :aria-label="ariaLabel"></div>
</template>

<style scoped>
.loader {
  color: var(--color-loader);
  width: 1em;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0 / calc(100% / 3) 100%
    space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
}

@keyframes l1 {
  to {
    clip-path: inset(0 -34% 0 0);
  }
}
</style>
