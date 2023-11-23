<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  onLoad: (page: number) => void
}>()

const end = ref<HTMLElement | null>(null)
const page = ref(-1)
const observer = new IntersectionObserver(() => {
  page.value++
  props.onLoad(page.value)
})

onMounted(() => {
  if (end.value) observer.observe(end.value)
})
</script>

<template>
  <div class="scrollable-list">
    <slot></slot>
    <div ref="end"></div>
  </div>
</template>

<style scoped>
.scrollable-list {
  overflow: scroll;
}
.scrollable-list::-webkit-scrollbar {
  display: none;
}
</style>
