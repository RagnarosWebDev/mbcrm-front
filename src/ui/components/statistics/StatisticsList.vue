<script setup lang="ts">
import { StatisticsInfo, StatisticsInfoStatus } from '@models/statistics.ts'
import { handleRequest } from '@api/handle.ts'
import { changeStatusRequest } from '@api/index.ts'
import { Task } from '@models/task.ts'
import { useToast } from 'vue-toastification'
import { useTasks } from '@store/tasks.store.ts'
import StatisticsStatsItem from '@components/statistics/StatisticsStatsItem.vue'

const props = defineProps<{ info?: StatisticsInfo[]; profileId: number }>()

const changeStatus = (name: string, status: StatisticsInfoStatus) => {
  if (status == 'none') return
  handleRequest(
    changeStatusRequest(
      props.profileId,
      name,
      status == 'enabled' ? 'stopped' : 'active',
    ),
    (e: Task) => {
      useToast().success('Смена статуса началась')
      useTasks().addNewTask(e.uuid)
    },
  )
}
</script>

<template>
  <VTable class="mb-4">
    <thead>
      <tr>
        <th>Имя</th>
        <th>Бюджет</th>
        <th>Ctr</th>
        <th>Клики</th>
        <th>Конверсия</th>
        <th>Среднее число кликов</th>
        <th>Траты</th>
        <th>Просмотры</th>
        <th>Статус</th>
        <th>Состояния</th>
      </tr>
    </thead>
    <tbody v-if="info != undefined">
      <StatisticsStatsItem
        :key="stats.name"
        v-for="stats of info"
        :changeStatus="changeStatus"
        :stats="stats"
      ></StatisticsStatsItem>
    </tbody>
  </VTable>
</template>

<style scoped></style>
