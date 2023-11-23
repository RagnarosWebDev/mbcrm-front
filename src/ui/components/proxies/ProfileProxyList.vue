<script setup lang="ts">
import { Profile } from '@models/profile.ts'
import ProfileProxyItem from '@components/proxies/ProfileProxyItem.vue'

defineProps<{
  profiles: Profile[]
}>()
</script>

<template>
  <VTable class="mb-4">
    <thead>
      <tr>
        <th>Имя профиля</th>
        <th>Теги</th>
        <th>Прокси</th>
        <th>Изменить</th>
      </tr>
    </thead>
    <tbody>
      <ProfileProxyItem
        :key="profile.octoInfo.uuid"
        v-for="profile of profiles"
        :profile="profile"
      />
    </tbody>
  </VTable>
</template>

<style scoped></style>
