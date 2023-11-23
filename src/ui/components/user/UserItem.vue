<script setup lang="ts">
import { User } from '@models/user.ts'
import { computed } from 'vue'
import { handleRequest } from '@api/handle.ts'
import { deleteUser, updateUserInfo } from '@api/index.ts'
import { useToast } from 'vue-toastification'
import UserForm from '@components/user/UserForm.vue'
import DeleteForm from '@components/shared/DeleteForm.vue'

const props = defineProps<{ user: User }>()

const role = computed(() => {
  if (props.user.role == 'admin') return 'Администратор'
  if (props.user.role == 'media') return 'Медиабайер'
  return 'Помощник медиабаейра'
})

const updateUser = (user: User) => {
  handleRequest(updateUserInfo(user), () => {
    useToast().success('Пользователь успешно обновлен')
  })
}

const onDelete = () => {
  handleRequest(deleteUser(props.user.id), () => {
    useToast().success('Пользователь успешно удален')
  })
}
</script>

<template>
  <tr>
    <td>{{ user.login }}</td>
    <td>{{ user.id }}</td>
    <td>{{ role }}</td>
    <td>{{ user.tag }}</td>
    <td>
      <UserForm
        :updateUser="updateUser"
        :user="{ ...user, password: undefined }"
      >
        <template #activator="data">
          <v-btn variant="outlined" class="w-100" v-bind="data.props">
            Изменить
          </v-btn>
        </template>
      </UserForm>
    </td>
    <td>
      <DeleteForm :onDelete="onDelete" />
    </td>
  </tr>
</template>

<style scoped></style>
