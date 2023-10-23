<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Statistics } from '@models/statistics.ts'
import { handleRequest } from '@api/handle.ts'
import { getStatistics } from '@api/index.ts'
import StatisticItem from '@components/StatisticItem.vue'

const statistics = ref(new Array<Statistics>())
onMounted(() => {
  handleRequest(getStatistics(0), (data) => {
    statistics.value.push(...data)
  })
})
</script>

<template>
  <div class="ma-3 h-100">
    <StatisticItem :item="item" v-for="item of statistics" :key="item.uuid" />
  </div>
</template>

<style scoped></style>
