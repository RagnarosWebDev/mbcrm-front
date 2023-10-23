<script setup lang="ts">
import { PropType } from 'vue'
import { StatisticsInfo } from '@models/statistics.ts'
import { handleRequest } from '@api/handle.ts'
import { changeStatusRequest } from '@api/index.ts'
import { Task } from '@models/task.ts'
import { useToast } from 'vue-toastification'
import { useTasks } from '@store/tasks.store.ts'

const props = defineProps({
  info: {
    type: Object as PropType<StatisticsInfo[]>,
    required: true,
  },
  profileId: {
    type: Number,
    required: true,
  },
})

const mapStatus = (status: 'enabled' | 'disabled' | 'none') => {
  if (status == 'enabled') return 'Включено'
  if (status == 'none') return 'Нет данных'
  return 'Остановлен'
}

const mapStatusType = (status: 'enabled' | 'disabled' | 'none') => {
  if (status == 'enabled') return 'Остановить'
  return 'Запустить'
}

const changeStatus = (
  name: string,
  status: 'enabled' | 'disabled' | 'none',
) => {
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
    <tbody>
      <tr :key="stats.name" v-for="stats of info">
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
    </tbody>
  </VTable>
</template>

<style scoped></style>
