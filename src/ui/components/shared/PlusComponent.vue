<script setup lang="ts">
import { mdiPlus } from '@mdi/js'

defineProps<{
  props: Record<string, any>
}>()
</script>

<template>
  <div class="container-plus">
    <v-btn
      :icon="mdiPlus"
      size="x-large"
      v-bind="props"
      variant="outlined"
    ></v-btn>
  </div>
</template>

<style scoped>
.container-plus {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
