<script setup lang="ts">
import { Statistics } from '@models/statistics.ts'
import { handleRequest } from '@api/handle.ts'
import { checkIp, resetProxy } from '@api/index.ts'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'
import { mdiReload, mdiRestart, mdiUpdate } from '@mdi/js'

const props = defineProps<{ item: Statistics }>()

const currentIp = ref('')

const reloadProxy = () => {
  handleRequest(
    resetProxy(props.item.proxy!.id, 'softReset'),
    (e: { oldIp: string }) => {
      currentIp.value = e.oldIp ?? ''
      useToast().success('Обновление IP началось')
    },
  )
}
const restartProxy = () => {
  handleRequest(resetProxy(props.item.proxy!.id, 'hardReset'), () => {
    useToast().success('Перезагрузка прокси началось')
  })
}

const updateProxyInfo = () => {
  handleRequest(checkIp(props.item.proxy!.id), (e: { ip: string }) => {
    console.log(e)
    currentIp.value = e.ip
    useToast().success('Прокси упешно обновился')
  })
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol>
        <div class="text-h5 mb-3">{{ item.title }}</div>
        <div class="text-h6 mb-3">Теги: {{ item.tags.join(', ') }}</div>
      </VCol>
      <VCol cols="auto">
        <div class="text-h6">
          {{ currentIp }}
        </div>
      </VCol>
      <VCol cols="auto" v-if="item.proxy">
        <VIcon
          @click="updateProxyInfo"
          class="mr-2"
          size="x-large"
          :icon="mdiUpdate"
        />
        <VIcon
          @click="restartProxy"
          class="mr-2"
          size="x-large"
          :icon="mdiRestart"
        />
        <VIcon
          @click="reloadProxy"
          class="mr-2"
          size="x-large"
          :icon="mdiReload"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped></style>
