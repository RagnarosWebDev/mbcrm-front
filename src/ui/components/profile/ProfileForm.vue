<script setup lang="ts">
import { ProfileInfo } from '@models/profile.ts'
import { Ref, ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  profile: ProfileInfo
  onEnd: (profile: ProfileInfo) => void
}>()
const slots = defineSlots<{
  activator: (data: { props: Record<string, any> }) => any
}>()

const profile = ref({
  ...props.profile,
  proxy: {
    ...(props.profile.proxy ?? {
      host: '',
      id: 1,
      port: 0,
      login: '',
      password: '',
      type: 'socks',
      httpPort: 0,
      changeIpUrl: '',
    }),
  },
})
const isUseProxy = ref(props.profile.proxy != undefined)
const form: Ref<VForm | null> = ref(null)

const notEmpty = [
  (e: string) => {
    if (!e?.length) {
      return 'Поле не должно быть пустым'
    }
    return true
  },
]
const onSubmit = async (isActive: Ref<boolean>) => {
  if (!form.value) {
    return
  }
  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }
  isActive.value = false
  props.onEnd({
    ...profile.value,
    proxy: isUseProxy.value ? profile.value.proxy : null,
  })
}
</script>

<template>
  <v-dialog>
    <template #activator="data">
      <slot name="activator" :props="data.props"></slot>
    </template>

    <template #default="{ isActive }">
      <VForm ref="form" @submit.prevent="onSubmit(isActive)">
        <VCard style="width: 700px" class="ma-auto">
          <VCardTitle>Введите информацию</VCardTitle>

          <VCardText>
            <VTextField
              :rules="notEmpty"
              v-model="profile.link"
              placeholder="Введите ссылку"
            />

            <VCheckbox
              v-model="isUseProxy"
              label="Использовать прокси"
            ></VCheckbox>
            <VSelect
              label="Выберите тип прокси"
              :items="['socks', 'mobile', 'ChangeIp']"
              v-model="profile.proxy.type"
              v-if="isUseProxy"
            >
            </VSelect>

            <VTextField
              v-if="isUseProxy"
              :rules="notEmpty"
              v-model="profile.proxy.host"
              placeholder="Введите хост"
            />
            <VTextField
              v-if="isUseProxy"
              :rules="notEmpty"
              v-model="profile.proxy.port"
              type="number"
              placeholder="Введите порт"
            />
            <VTextField
              :rules="notEmpty"
              v-if="isUseProxy"
              v-model="profile.proxy.login"
              placeholder="Введите логин"
            />
            <VTextField
              :rules="notEmpty"
              v-if="isUseProxy"
              v-model="profile.proxy.password"
              placeholder="Введите пароль"
            />

            <VTextField
              :rules="notEmpty"
              v-if="isUseProxy"
              v-model="profile.proxy.changeIpUrl"
              placeholder="Введите адрес для смены прокси"
            />
            <VTextField
              :rules="notEmpty"
              v-if="isUseProxy"
              v-model="profile.proxy.httpPort"
              type="number"
              placeholder="Введите хттп порт"
            />
          </VCardText>

          <VCardActions>
            <VBtn :block="true" variant="outlined" type="submit">Ок</VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </template>
  </v-dialog>
</template>

<style scoped></style>
