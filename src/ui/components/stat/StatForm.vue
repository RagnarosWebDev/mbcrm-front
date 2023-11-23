<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { Ref, ref } from 'vue'
import { StatInfo } from '@models/stat-info.ts'

const props = defineProps<{
  stat: StatInfo
  updateStat: (stat: StatInfo) => void
}>()

console.log(props.stat)

const slots = defineSlots<{
  activator: (data: { props: Record<string, any> }) => any
}>()

const notEmpty = [
  (e: string) => {
    if (!e?.length) {
      return 'Поле не должно быть пустым'
    }
    return true
  },
]
const refStat = ref({
  ...props.stat,
  values: [...props.stat.values],
})
const form: Ref<VForm | null> = ref(null)

const validate = async (isActive: Ref<boolean>) => {
  if (!form.value) {
    return
  }
  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }

  isActive.value = false
  props.updateStat(refStat.value)
}

const addNew = () => {
  refStat.value.values.push('')
}
const remove = (index: number) => {
  refStat.value.values.splice(index, 1)
}
</script>

<template>
  <v-dialog>
    <template #activator="data">
      <slot name="activator" :props="data.props"></slot>
    </template>
    <template #default="{ isActive }">
      <VCard style="width: 700px" class="ma-auto">
        <VForm ref="form" @submit.prevent="validate(isActive)">
          <VCardTitle>Введите информацию</VCardTitle>

          <VCardText>
            <VTextField
              :rules="notEmpty"
              v-model="refStat.tag"
              placeholder="Введите тег"
            />

            <VTextField
              :rules="notEmpty"
              v-model="refStat.keyName"
              placeholder="Введите имя ключа"
            />

            <VCheckbox v-model="refStat.isCheck" label="Работает ли?" />

            <div class="list-stats">
              <div
                v-for="item in refStat.values.length"
                :key="item"
                class="mb-4"
                style="display: flex"
              >
                <VTextField
                  :rules="notEmpty"
                  v-model="refStat.values[item - 1]"
                  placeholder="Введите значние ключа"
                />
                <VBtn
                  variant="outlined"
                  @click="remove(item - 1)"
                  class="ma-auto ml-2"
                  >-</VBtn
                >
              </div>

              <VBtn :block="true" variant="outlined" @click="addNew">+</VBtn>
            </div>
          </VCardText>

          <VCardActions>
            <VBtn type="submit" :block="true" variant="outlined">Ок</VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </template>
  </v-dialog>
</template>

<style scoped>
.list-stats :deep(.v-input__details) {
  display: none;
}
</style>
