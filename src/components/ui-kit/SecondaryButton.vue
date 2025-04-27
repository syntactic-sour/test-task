<script setup lang="ts">
import ButtonWithEffect from '@/components/ui-kit/ButtonWithEffect.vue'
</script>

<template>
  <ButtonWithEffect class="secondary">
    <slot></slot>
  </ButtonWithEffect>
</template>

<style scoped>
.secondary {
  border: 2px solid var(--color-border);

  padding: 0.2em 0.4em;
  background: var(--color-background);
  color: var(--color-text);
}

.secondary:hover {
  background: var(--color-secondary-hover-bg);
  border-color: var(--color-secondary-hover-bg);
  color: var(--color-secondary-hover-text);
}
</style>
