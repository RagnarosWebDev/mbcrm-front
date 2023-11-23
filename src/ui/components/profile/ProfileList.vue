<script setup lang="ts">
import ProfileItem from '@components/profile/ProfileItem.vue'
import { Profile } from '@models/profile.ts'

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
        <th>Ссылка</th>
        <th>Прокси</th>
        <th>Профиль</th>
      </tr>
    </thead>
    <tbody>
      <ProfileItem
        :key="profile.octoInfo.uuid"
        v-for="profile of profiles"
        :profile="profile"
      />
    </tbody>
  </VTable>
</template>

<style scoped></style>
