<script setup lang="ts">
import { Statistics } from '@models/statistics.ts'
import StatisticItemTable from '@components/statistics/StatisticsList.vue'
import { computed, ref } from 'vue'
import StatisticsTitleInfo from '@components/statistics/StatisticsTitleInfo.vue'
import { useTasks } from '@store/tasks.store.ts'
import { handleRequest } from '@api/handle.ts'
import { updateById } from '@api/index.ts'
import { Task } from '@models/task.ts'
import { useToast } from 'vue-toastification'
import StatisticsDatesList from '@components/statistics/StatisticsDatesList.vue'
import { storeToRefs } from 'pinia'
import { useDates } from '@store/dates.store.ts'

const tasks = useTasks()
const { getDatesById } = storeToRefs(useDates())

const updateAll = () => {
  handleRequest(
    updateById(props.item.id, getDatesById.value(props.item.id)),
    (e: Task) => {
      tasks.addNewTask(e.uuid)
      useToast().success('Началось обновление')
    },
  )
}
const props = defineProps<{ item: Statistics }>()

const selectedDate = ref('all')

const stats = computed(() => {
  return props.item.info ? new Map(Object.entries(props.item.info)) : new Map()
})

const onDateChanged = (date: string) => {
  selectedDate.value = date
}
</script>

<template>
  <div class="mb-4">
    <VCard variant="tonal">
      <VCardText>
        <StatisticsTitleInfo :item="item" />

        <StatisticsDatesList
          :selectedDate="selectedDate"
          :onDateChanged="onDateChanged"
          :itemId="item.id"
          :stats="stats"
        />

        <StatisticItemTable
          :profileId="item.id"
          :info="stats.get(selectedDate)"
        />

        <VBtn variant="outlined" :block="true" @click="updateAll"
          >Обновить стату</VBtn
        >
      </VCardText>
    </VCard>
  </div>
</template>
