<script setup lang="ts" generic="T extends User">
import { User } from '@models/user.ts'
import { VForm } from 'vuetify/components/VForm'
import { Ref, ref } from 'vue'

const props = defineProps<{
  user: T
  updateUser: (user: T) => void
}>()
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
const refUser = ref<T>({ ...props.user })
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
  props.updateUser(refUser.value as T)
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
              v-model="refUser.login"
              placeholder="Введите логин"
            />

            <VSelect
              label="Выберите тип прокси"
              :items="['admin', 'media', 'mediaSupport']"
              v-model="refUser.role"
            >
            </VSelect>

            <VTextField
              :rules="notEmpty"
              v-model="refUser.tag"
              placeholder="Введите тег"
            />

            <VTextField
              :rules="notEmpty"
              v-model="refUser.password"
              placeholder="Введите пароль"
              v-if="'password' in refUser && refUser.password != undefined"
            />
          </VCardText>

          <VCardActions>
            <VBtn type="submit" :block="true" variant="outlined">Ок</VBtn>
          </VCardActions>
        </VForm>
      </VCard>
    </template>
  </v-dialog>
</template>

<style scoped></style>
