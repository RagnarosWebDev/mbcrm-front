<script setup lang="ts">
import VirtualList from '@components/shared/VirtualList.vue'
import { ref } from 'vue'
import { handleRequest } from '@api/handle.ts'
import { createStat, getAllStatInfo } from '@api/index.ts'
import { StatInfo } from '@models/stat-info.ts'
import StatItem from '@components/stat/StatItem.vue'
import StatForm from '@components/stat/StatForm.vue'
import PlusComponent from '@components/shared/PlusComponent.vue'
import { useToast } from 'vue-toastification'

const statsInfos = ref(new Array<StatInfo>())

const onLoadNewPage = (page: number) => {
  handleRequest(getAllStatInfo(page), (data: StatInfo[]) => {
    if (page == 0) return (statsInfos.value = data)
    statsInfos.value.push(...data)
  })
}

const onEnd = (stat: StatInfo) => {
  const s = {
    ...stat,
    id: undefined,
  }
  handleRequest(createStat(s), () => {
    useToast().success('Успешно создан')
  })
}
</script>

<template>
  <div>
    <div class="ma-3 h-100 overflow">
      <VirtualList :onLoad="onLoadNewPage">
        <VTable class="mb-4">
          <thead>
            <tr>
              <th>Тег</th>
              <th>Запущен?</th>
              <th>Значения</th>
              <th>Ключ</th>
              <th>Изменить</th>
            </tr>
          </thead>
          <tbody>
            <StatItem :item="item" v-for="item of statsInfos" :key="item.id" />
          </tbody>
        </VTable>
      </VirtualList>
    </div>
    <StatForm
      :updateStat="onEnd"
      :stat="{ id: 0, isCheck: true, tag: '', values: [], keyName: '' }"
    >
      <template #activator="data">
        <PlusComponent :props="data.props" />
      </template>
    </StatForm>
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
