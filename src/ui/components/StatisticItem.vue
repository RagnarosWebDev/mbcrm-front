<script setup lang="ts">
import { Statistics } from '@models/statistics.ts'
import StatisticItemTable from '@components/StatisticItemTable.vue'
import { checkIp, resetProxy, updateById } from '@api/index.ts'
import { handleRequest } from '@api/handle.ts'
import { useToast } from 'vue-toastification'
import { Task } from '@models/task.ts'
import { useTasks } from '@store/tasks.store.ts'
import { Ref, ref } from 'vue'
import { mdiReload, mdiRestart, mdiUpdate } from '@mdi/js'
import { VDatePicker } from 'vuetify/labs/VDatePicker'

const props = defineProps<{ item: Statistics }>()
const tasks = useTasks()

const updateAll = () => {
  handleRequest(updateById(props.item.id), (e: Task) => {
    tasks.addNewTask(e.uuid)
    useToast().success('Началось обновление')
  })
}

const currentIp = ref('')
const startDate = ref(new Date())
const endDate = ref(new Date())
const formatter = new Intl.DateTimeFormat()
const updateByDate = (isActive: Ref<boolean>) => {
  isActive.value = false
  handleRequest(
    updateById(
      props.item.id,
      formatter.format(startDate.value),
      formatter.format(endDate.value),
    ),
    (e: Task) => {
      tasks.addNewTask(e.uuid)
      useToast().success('Началось обновление')
    },
  )
}

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
  <div class="mb-4">
    <VCard variant="tonal">
      <VCardText>
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

        <StatisticItemTable
          :profileId="item.id"
          :info="item.info ? item.info : []"
        />

        <VBtn variant="outlined" class="mb-3" @click="updateAll" :block="true"
          >За все время</VBtn
        >

        <v-dialog>
          <template #activator="data">
            <v-btn
              variant="outlined"
              v-bind="data.props"
              :block="true"
              text="По дате"
            >
            </v-btn>
          </template>

          <template #default="{ isActive }">
            <VCard style="width: fit-content" class="ma-auto">
              <VCardTitle>Выберите даты</VCardTitle>
              <VContainer>
                <VRow>
                  <VDatePicker
                    :hideActions="true"
                    v-model="startDate"
                    title="Введите дату начала"
                    class="mr-5"
                  />
                  <VDatePicker
                    :hideActions="true"
                    title="Введите дату конца"
                    v-model="endDate"
                  />
                </VRow>
              </VContainer>
              <VCardActions>
                <VBtn
                  @click="updateByDate(isActive)"
                  variant="outlined"
                  :block="true"
                  >Ок</VBtn
                >
              </VCardActions>
            </VCard>
          </template>
        </v-dialog>
      </VCardText>
    </VCard>
  </div>
</template>
