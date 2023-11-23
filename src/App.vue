<script setup lang="ts">
import { useRoute } from 'vue-router'
import { User } from '@models/user.ts'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { userInfo } from '@api/index.ts'
import { handleRequest } from '@api/handle.ts'
import router from './router'
import { useAuth } from '@store/auth.store.ts'
import { storeToRefs } from 'pinia'

const route = useRoute()
const user: Ref<User | null> = ref(null)
const { accessToken } = storeToRefs(useAuth())

const updateProfile = () => {
  handleRequest(
    userInfo(),
    (e: User) => {
      user.value = e
    },
    () => {
      useAuth().changeToken({
        accessToken: '',
        refreshToken: '',
      })
      router.push({
        path: '/login',
      })
    },
  )
}

watch(accessToken!, updateProfile)
onMounted(updateProfile)

const isAdmin = computed(() => {
  return user.value?.role == 'admin'
})

const isMedia = computed(() => {
  return user.value?.role == 'media'
})
</script>

<template>
  <div>
    <VApp>
      <VLayout>
        <VNavigationDrawer v-if="route.meta.isNeedNavigation">
          <VListItem>
            <div class="text-h4 pa-2">Octo Admin</div>
          </VListItem>
          <VDivider></VDivider>

          <VListItem to="/statistics" title="Statistics"></VListItem>
          <VListItem to="/tasks" title="Tasks"></VListItem>

          <VListItem to="/users" title="Users" v-if="isAdmin"></VListItem>
          <VListItem to="/profiles" title="Profiles" v-if="isAdmin"></VListItem>

          <VListItem
            to="/proxies"
            title="Proxies"
            v-if="isAdmin || isMedia"
          ></VListItem>

          <VListItem to="/statInfo" title="Stats" v-if="isAdmin"></VListItem>
        </VNavigationDrawer>
        <VMain>
          <div class="card-container pa-3" v-if="route.meta.isNeedNavigation">
            <VCard class="card-content">
              <RouterView></RouterView>
            </VCard>
          </div>
          <RouterView v-if="!route.meta.isNeedNavigation"> </RouterView>
        </VMain>
      </VLayout>
    </VApp>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
