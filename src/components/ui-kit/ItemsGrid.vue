<script setup lang="ts" generic="T">
interface Item {
  id: string | number
}

type Collection = Array<Item & T>

const { collection } = defineProps<{ collection: Collection }>()
</script>

<template>
  <ul class="collection">
    <li class="item" v-for="item in collection" :key="item.id">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<style scoped>
.collection {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}

.item {
  display: flex;
}
</style>
