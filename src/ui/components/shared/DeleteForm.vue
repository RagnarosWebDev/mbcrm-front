<script setup lang="ts">
import { Ref } from 'vue'

const { onDelete } = defineProps<{
  onDelete: () => void
}>()

const removeItem = (isActive: Ref<boolean>) => {
  isActive.value = false
  onDelete()
}
</script>

<template>
  <v-dialog>
    <template #activator="data">
      <v-btn variant="outlined" color="red" v-bind="data.props">X</v-btn>
    </template>
    <template #default="{ isActive }">
      <VCard class="ma-auto" style="display: flex; flex-direction: column">
        <VCardTitle>Вы уверены что хотите удалить пользователя?</VCardTitle>

        <VCardActions style="margin-left: auto">
          <VBtn
            type="submit"
            variant="outlined"
            @click="isActive.value = false"
            color="red"
            >Отменить</VBtn
          >
          <VBtn
            type="submit"
            variant="outlined"
            @click="removeItem(isActive)"
            color="green"
            >Ок</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </v-dialog>
</template>

<style scoped></style>
