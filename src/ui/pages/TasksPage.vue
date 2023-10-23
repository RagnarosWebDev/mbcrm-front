<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTasks } from '@store/tasks.store.ts'
import { onMounted, ref } from 'vue'
import { Task, TaskType } from '@models/task.ts'
import { handleRequest } from '@api/handle.ts'
import { loadTasks } from '@api/index.ts'

const taskStore = useTasks()
const { tasksUuids } = storeToRefs(taskStore)
const tasks = ref(new Array<Task>())
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
  handleRequest(
    loadTasks(tasksUuids.value),
    (e: Task[]) => {
      tasks.value = e
      taskStore.removeTasks(e.map((e1) => e1.uuid))
      isLoading.value = false
    },
    () => {
      isLoading.value = false
    },
  )
})

const mapStatus = (status: TaskType) => {
  if (status == 'success') return 'Успешно'
  if (status == 'error') return 'Ошибка'
  return 'Выполняется'
}
</script>

<template>
  <VTable v-if="!isLoading" class="mb-4">
    <thead>
      <tr>
        <th>UUID</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="task.uuid" v-for="task of tasks">
        <td>{{ task.uuid }}</td>
        <td>{{ mapStatus(task.status) }}</td>
      </tr>
    </tbody>
  </VTable>
  <div
    class="w-100"
    style="display: flex; flex-direction: column; flex: 1"
    v-if="isLoading"
  >
    <VProgressCircular class="ma-auto" indeterminate />
  </div>
</template>

<style scoped></style>
