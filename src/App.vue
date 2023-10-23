<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <VApp>
      <VLayout>
        <VNavigationDrawer v-if="route.meta.isNeedNavigation">
          <VListItem>
            <div class="text-h4 pa-2">Octo Admin</div>
          </VListItem>
          <v-divider></v-divider>

          <v-list-item to="/statistics" title="Statistics"></v-list-item>
          <v-list-item to="/tasks" title="Tasks"></v-list-item>
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
  min-height: 100vh;
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
