<script setup lang="ts">
import { ref } from 'vue'
import { Profile } from '@models/profile.ts'
import { handleRequest } from '@api/handle.ts'
import { getProfile } from '@api/index.ts'
import ProfileList from '@components/profile/ProfileList.vue'
import VirtualList from '@components/shared/VirtualList.vue'

const profiles = ref(new Array<Profile>())

const onLoadNewPage = (page: number) => {
  handleRequest(getProfile(page), (e) => {
    profiles.value.push(...e)
  })
}
</script>

<template>
  <VirtualList :onLoad="onLoadNewPage">
    <ProfileList :profiles="profiles" />
  </VirtualList>
</template>

<style scoped></style>
