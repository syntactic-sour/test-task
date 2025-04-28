<script setup lang="ts">
const { heading } = defineProps<{ heading?: string }>()
</script>

<template>
  <section>
    <!--
        YAGNI for current task,
        but irl component should be able to render headings of different levels -->
    <h2 class="heading">{{ heading }}</h2>
    <slot></slot>
    <div class="pagination-container"><slot name="pagination"></slot></div>
  </section>
</template>

<style scoped>
.heading {
  margin: 2rem 0 1rem;
}

.pagination-container {
  margin-top: 1.4rem;
}
</style>
