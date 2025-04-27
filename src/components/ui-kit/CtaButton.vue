<script setup lang="ts">
import ButtonWithEffect from '@/components/ui-kit/ButtonWithEffect.vue'
</script>

<template>
  <ButtonWithEffect class="cta">
    <slot></slot>
  </ButtonWithEffect>
</template>

<style scoped>
.cta {
  padding: 0.4em 1.2em;
  background: var(--color-text);
  color: var(--color-background);
}

.cta:hover {
  background: var(--color-cta-hover-bg);
  color: var(--color-cta-hover-text);
}
</style>
