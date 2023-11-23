<script setup lang="ts">
import { Profile, ProfileInfo } from '@models/profile.ts'
import { createProfile, updateProfile } from '@api/index.ts'
import { handleRequest } from '@api/handle.ts'
import { useToast } from 'vue-toastification'
import ProfileForm from '@components/profile/ProfileForm.vue'
import { computed } from 'vue'

const props = defineProps<{ profile: Profile }>()

const getTextOrPlaceholder = (e?: string) => {
  return formatText(e ?? 'Данных нет')
}

const formatText = (e: string) => {
  return e.length > 50 ? e.slice(0, 50) + '...' : e
}
const createProfileClick = (profile: ProfileInfo) => {
  if (!props.profile.profile) {
    return handleRequest(createProfile(profile), () => {
      useToast().success('Профиль успешно создан')
    })
  }
  return handleRequest(updateProfile(profile), () => {
    useToast().success('Профиль успешно обновлен')
  })
}

const profileInfo: ProfileInfo = props.profile.profile ?? {
  id: 1,
  link: '',
  uuid: props.profile.octoInfo.uuid,
  proxy: {
    id: 0,
    host: '',
    port: 1,
    login: '',
    password: '',
    type: 'socks',
    changeIpUrl: '',
    httpPort: 1,
  },
}

const getProxyInfo = computed(() => {
  if (!props.profile.profile?.proxy) {
    return 'Прокси нет'
  }
  const proxy = props.profile.profile.proxy
  return (
    proxy.login + ':' + proxy.password + '@' + proxy.host + ':' + proxy.port
  )
})
</script>

<template>
  <tr>
    <td>{{ profile.octoInfo.title }}</td>
    <td>{{ profile.octoInfo.tags.join(', ') }}</td>
    <td>
      {{ getTextOrPlaceholder(profile.profile?.link) }}
    </td>
    <td style="width: 200px">{{ getProxyInfo }}</td>

    <td>
      <ProfileForm :onEnd="createProfileClick" :profile="profileInfo">
        <template #activator="data">
          <v-btn variant="outlined" class="w-100" v-bind="data.props">
            {{ profile.profile ? 'Изменить' : 'Создать' }}
          </v-btn>
        </template>
      </ProfileForm>
    </td>
  </tr>
</template>

<style scoped></style>
