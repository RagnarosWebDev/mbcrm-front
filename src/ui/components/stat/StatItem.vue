<script setup lang="ts">
import { StatInfo } from '@models/stat-info.ts'
import StatForm from '@components/stat/StatForm.vue'
import { handleRequest } from '@api/handle.ts'
import { updateStat } from '@api/index.ts'
import { useToast } from 'vue-toastification'

defineProps<{
  item: StatInfo
}>()

const onEnd = (stat: StatInfo) => {
  handleRequest(updateStat(stat), () => {
    useToast().success('Инфа обновлена')
  })
}
</script>

<template>
  <tr>
    <td>{{ item.tag }}</td>
    <td>{{ item.isCheck ? 'Да' : 'Нет' }}</td>
    <td>{{ item.values.join(', ') }}</td>
    <td>{{ item.keyName }}</td>
    <td>
      <StatForm :updateStat="onEnd" :stat="item">
        <template #activator="data">
          <v-btn variant="outlined" class="w-100" v-bind="data.props">
            Изменить
          </v-btn>
        </template>
      </StatForm>
    </td>
  </tr>
</template>

<style scoped></style>
