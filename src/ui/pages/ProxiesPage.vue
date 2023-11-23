<script setup lang="ts">
import { ref } from 'vue'
import { Profile } from '@models/profile.ts'
import VirtualList from '@components/shared/VirtualList.vue'
import { handleRequest } from '@api/handle.ts'
import { createdProfiles } from '@api/index.ts'
import ProfileProxyList from '@components/proxies/ProfileProxyList.vue'
import { debounce } from 'debounce'

const profiles = ref<Profile[]>([])

const searchTag = ref('')
const debTag = ref('')

const onLoadNewPage = (page: number) => {
  handleRequest(createdProfiles(page, searchTag.value), (e: Profile[]) => {
    if (page == 0) return (profiles.value = e)
    profiles.value.push(...e)
  })
}

const onChange = debounce(() => {
  searchTag.value = debTag.value
}, 200)
</script>

<template>
  <div :key="searchTag">
    <VTextField
      class="mr-4 ml-4 mt-5 mb-5"
      placeholder="Введите тег"
      v-model="debTag"
      @change="onChange"
    />
    <VirtualList :onLoad="onLoadNewPage">
      <ProfileProxyList :profiles="profiles" />
    </VirtualList>
  </div>
</template>

<style scoped></style>
