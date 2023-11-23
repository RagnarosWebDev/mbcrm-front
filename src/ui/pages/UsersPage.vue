<script setup lang="ts">
import { ref } from 'vue'
import { CreateUser, User } from '@models/user.ts'
import { createUserRequest, getUsers } from '@api/index.ts'
import { handleRequest } from '@api/handle.ts'
import UserList from '@components/user/UserList.vue'
import PlusComponent from '@components/shared/PlusComponent.vue'
import UserForm from '@components/user/UserForm.vue'
import { useToast } from 'vue-toastification'
import VirtualList from '@components/shared/VirtualList.vue'

const users = ref(new Array<User>())

const addUser: CreateUser = {
  id: 0,
  login: '',
  password: '',
  tag: '',
  role: 'mediaSupport',
}

const updateUser = (user: CreateUser) => {
  handleRequest(createUserRequest(user), () => {
    useToast().success('Юзер успешно создан')
  })
}

const onNewPage = (page: number) => {
  console.log(page)
  handleRequest(getUsers(page), (e: User[]) => {
    users.value.push(...e)
  })
}
</script>

<template>
  <VirtualList :onLoad="onNewPage">
    <UserList :users="users" />
  </VirtualList>

  <UserForm :updateUser="updateUser" :user="addUser">
    <template #activator="data">
      <PlusComponent :props="data.props" />
    </template>
  </UserForm>
</template>

<style scoped></style>
