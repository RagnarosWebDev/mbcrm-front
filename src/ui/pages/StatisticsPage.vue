<script setup lang="ts">
import { ref } from 'vue'
import { Statistics } from '@models/statistics.ts'
import { handleRequest } from '@api/handle.ts'
import { getStatistics } from '@api/index.ts'
import StatisticItem from '@components/statistics/StatisticItem.vue'
import VirtualList from '@components/shared/VirtualList.vue'

const statistics = ref(new Array<Statistics>())

const onLoadNewPage = (page: number) => {
  handleRequest(getStatistics(page), (data: Statistics[]) => {
    if (page == 0) return (statistics.value = data)
    statistics.value.push(...data)
  })
}
</script>

<template>
  <div class="ma-3 h-100 overflow">
    <VirtualList :onLoad="onLoadNewPage">
      <StatisticItem :item="item" v-for="item of statistics" :key="item.uuid" />
    </VirtualList>
  </div>
</template>

<style scoped>
.overflow {
  overflow: scroll;
}
.overflow::-webkit-scrollbar {
  display: none;
}
</style>
