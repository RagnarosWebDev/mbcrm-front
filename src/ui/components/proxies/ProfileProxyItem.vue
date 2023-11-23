<script setup lang="ts">
import { computed, ref } from 'vue'
import { Profile, Proxy } from '@models/profile.ts'
import { VForm } from 'vuetify/components/VForm'
import VirtualList from '@components/shared/VirtualList.vue'
import { castProxyToString } from '../../../core/utils/proxy.ts'
import { handleRequest } from '@api/handle.ts'
import { changeProxyRequest, getProxies } from '@api/index.ts'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  profile: Profile
}>()

const getProxyInfo = computed(() => {
  return castProxyToString(props.profile.profile?.proxy)
})

const proxies = ref<Proxy[]>([])

const onLoadNewProxies = (page: number) => {
  handleRequest(getProxies(page), (e: Proxy[]) => {
    if (page == 0) return (proxies.value = e)
    proxies.value.push(...e)
  })
}

const changeProxy = (proxyId?: number) => {
  handleRequest(changeProxyRequest(props.profile.profile!.id, proxyId), () => {
    useToast().success('Прокси успешно сменен')
  })
}
</script>

<template>
  <tr>
    <td>{{ profile.octoInfo.title }}</td>
    <td>{{ profile.octoInfo.tags.join(', ') }}</td>
    <td>{{ getProxyInfo }}</td>

    <td>
      <VMenu>
        <template #activator="data">
          <v-btn variant="outlined" class="w-100" v-bind="data.props">
            Изменить
          </v-btn>
        </template>

        <template #default>
          <VCard
            style="width: 500px; height: 400px; overflow: auto"
            class="ma-auto"
          >
            <VForm ref="form">
              <VCardTitle>Выберите прокси</VCardTitle>

              <VCardText>
                <VirtualList :onLoad="onLoadNewProxies">
                  <VBtn
                    class="w-100 mb-2"
                    variant="outlined"
                    @click="changeProxy(undefined)"
                  >
                    Без прокси
                  </VBtn>
                  <VBtn
                    class="w-100 mb-2"
                    variant="outlined"
                    @click="changeProxy(proxy.id)"
                    v-for="proxy of proxies"
                    :key="castProxyToString(proxy)"
                  >
                    {{ castProxyToString(proxy) }}
                  </VBtn>
                </VirtualList>
              </VCardText>
            </VForm>
          </VCard>
        </template>
      </VMenu>
    </td>
  </tr>
</template>

<style scoped></style>
