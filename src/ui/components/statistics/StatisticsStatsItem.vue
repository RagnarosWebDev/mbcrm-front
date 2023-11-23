<script setup lang="ts">
import { StatisticsInfo, StatisticsInfoStatus } from '@models/statistics.ts'

defineProps<{
  stats: StatisticsInfo
  changeStatus: (name: string, status: StatisticsInfoStatus) => void
}>()

const mapStatus = (status: 'enabled' | 'disabled' | 'none') => {
  if (status == 'enabled') return 'Включено'
  if (status == 'none') return 'Нет данных'
  return 'Остановлен'
}

const mapStatusType = (status: 'enabled' | 'disabled' | 'none') => {
  if (status == 'enabled') return 'Остановить'
  return 'Запустить'
}
</script>

<template>
  <tr>
    <td>{{ stats.name }}</td>
    <td>{{ stats.budget }}</td>
    <td>{{ stats.ctr }}</td>
    <td>{{ stats.clicks }}</td>
    <td>{{ stats.conversion }}</td>
    <td>{{ stats.averageClicksPrice }}</td>
    <td>{{ stats.expenses }}</td>
    <td>{{ stats.views }}</td>
    <td
      :style="{
        color:
          stats.status != 'none'
            ? stats.status == 'enabled'
              ? 'green'
              : 'red'
            : '',
      }"
    >
      {{ mapStatus(stats.status) }}
    </td>
    <td>
      <VBtn
        class="w-100"
        variant="outlined"
        v-if="stats.status != 'none'"
        @click="changeStatus(stats.name, stats.status)"
        >{{ mapStatusType(stats.status) }}</VBtn
      >
    </td>
  </tr>
</template>

<style scoped></style>
