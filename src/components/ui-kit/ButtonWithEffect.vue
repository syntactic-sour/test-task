<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const emit = defineEmits(['click'])

const effect = ref(false)
const timeout = ref()

function handleClick() {
  clearTimeout(timeout.value)
  effect.value = true
  timeout.value = setTimeout(() => {
    effect.value = false
  }, 300)
  // TODO: aria live-region

  emit('click')
}

onBeforeUnmount(() => {
  clearTimeout(timeout.value)
})
</script>

<template>
  <button type="button" @click="handleClick" class="button" :disabled="effect">
    <slot></slot>
    <Transition name="fade">
      <span v-if="effect" class="effect"></span>
    </Transition>
  </button>
</template>

<style scoped>
.button {
  border-radius: var(--radius-controls);
  border: none;
  box-shadow: none;
  font-size: 1.1em;
  position: relative;
}

.effect {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-radius: inherit;
  box-shadow: 0 0 10px 2px var(--color-price-accent);
  background: var(--color-price-accent);
  z-index: -1;
}
</style>
