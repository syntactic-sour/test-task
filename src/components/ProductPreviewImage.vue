<script setup lang="ts">
import { computed } from 'vue'

const { images, imgClass = '' } = defineProps<{
  images?: ProductImage[]
  imgClass?: string
}>()

const imageSrc = computed(() => {
  if (images && images.length) {
    return images[0]
  }

  return null
})
</script>

<template>
  <picture v-if="imageSrc">
    <source media="(max-width:200px)" :srcset="imageSrc.image160pxUrl" />
    <source media="(max-width:480px)" :srcset="imageSrc.image400pxUrl" />
    <source media="(min-width:481px)" :srcset="imageSrc.image800pxUrl" />
    <!-- Alt is missing in API response -->
    <img :src="imageSrc.image160pxUrl" alt="" :class="['product-image', imgClass]" />
  </picture>
  <!-- In case of no images here might be a placeholder.
       Aspect ratio should be defined for it somehow. -->
</template>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
