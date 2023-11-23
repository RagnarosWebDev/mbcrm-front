<script setup lang="ts">
import UserItem from '@components/user/UserItem.vue'
import { User } from '@models/user.ts'

defineProps<{
  users: User[]
}>()
</script>

<template>
  <VTable class="mb-4">
    <thead>
      <tr>
        <th>Логин</th>
        <th>Id</th>
        <th>Роль</th>
        <th>Тег</th>
        <th>Изменить</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <UserItem :key="user.id" :user="user" v-for="user of users" />
    </tbody>
  </VTable>
</template>

<style scoped></style>
