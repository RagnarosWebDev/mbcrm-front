<script setup lang="ts">
import { Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDates } from '@store/dates.store.ts'
import { Statistics } from '@models/statistics.ts'
import { PairDateDto } from '@models/date.ts'

const props = defineProps<{
  itemId: number
  stats: Map<string, Statistics[]>
  selectedDate: string
  onDateChanged: (date: string) => void
}>()

const dates = useDates()
const { getDatesById } = storeToRefs(dates)

const startDate = ref([new Date()])
const endDate = ref([new Date()])

const formatter = new Intl.DateTimeFormat('ru')

const addNewDate = (isActive: Ref<boolean>) => {
  isActive.value = false
  console.log(startDate.value + ' ' + endDate.value)
  dates.addNewDate(props.itemId, {
    startDate: formatter.format(startDate.value[0]),
    endDate: formatter.format(endDate.value[0]),
  })
}

const calcDate = (date: PairDateDto) => {
  return date.startDate + '-' + date.endDate
}
const compareDates = (stringDate: string, date: PairDateDto) => {
  return stringDate == calcDate(date)
}

const onDateCanChanged = (date: PairDateDto) => {
  if (!props.stats.has(calcDate(date))) {
    return
  }
  props.onDateChanged(calcDate(date))
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap">
    <VBtn
      variant="outlined"
      :key="calcDate(currentDate)"
      class="mr-2 mb-2"
      :active="!stats.has(calcDate(currentDate))"
      :color="compareDates(selectedDate, currentDate) ? 'green' : 'white'"
      @click="onDateCanChanged(currentDate)"
      v-for="currentDate in getDatesById(itemId)"
    >
      {{ currentDate.startDate }} -
      {{ currentDate.endDate }}
    </VBtn>
    <VBtn
      variant="outlined"
      class="mr-2 mb-2"
      @click="onDateChanged('all')"
      :color="selectedDate == 'all' ? 'green' : 'white'"
    >
      За все время
    </VBtn>
    <VBtn
      variant="outlined"
      class="mr-2 mb-2"
      @click="onDateChanged('monthly')"
      :color="selectedDate == 'monthly' ? 'green' : 'white'"
    >
      За последний месяц
    </VBtn>
    <VBtn
      variant="outlined"
      class="mr-2 mb-2"
      @click="onDateChanged('two weakly')"
      :color="selectedDate == 'two weakly' ? 'green' : 'white'"
    >
      За последние две недели
    </VBtn>
    <VBtn
      variant="outlined"
      class="mr-2 mb-2"
      @click="onDateChanged('weakly')"
      :color="selectedDate == 'weakly' ? 'green' : 'white'"
    >
      За последнюю неделю
    </VBtn>
    <v-dialog>
      <template #activator="data">
        <v-btn variant="outlined" :disabled="true" v-bind="data.props" text="+">
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
            <VBtn @click="addNewDate(isActive)" variant="outlined" :block="true"
              >Ок</VBtn
            >
          </VCardActions>
        </VCard>
      </template>
    </v-dialog>
  </div>
</template>

<style scoped></style>
