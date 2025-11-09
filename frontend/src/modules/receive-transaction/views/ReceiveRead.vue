<template>
  <div class="flex flex-col w-full h-svh overflow-hidden">
    <VSidebarBack routerName="ReceiveTransaction" />

    <div class="flex justify-center">
      <VIconButton icon="tabler:lock" color="bg-rose-700/80 text-white" text="Bloqueado" />
    </div>

    <div class="flex flex-col flex-1 min-h-0">
      <div class="w-full h-full">
        <VContent>
          <template #content>
            <div class="my-5">
              <h1 class="text-2xl font-semibold text-center">{{ party.name }}</h1>
              <p class="text-5xl text-green-700 font-bold text-center">
                {{ formatAmount(party.quantity) }}
              </p>
              <div class="flex justify-center mt-3">
                <Icon icon="tabler:rotate-clockwise-2" class="text-slate-700" width="40" />
              </div>
            </div>

            <div class="px-5 flex flex-col">
              <div class="flex justify-between items-center">
                <div class="flex mt-3 gap-1">
                  <Icon icon="tabler:users" class="text-slate-700" width="18" />
                  <p class="text-sm text-slate-700">Participantes</p>
                </div>

                <Icon
                  icon="tabler:link"
                  class="text-blue-900 cursor-pointer"
                  width="20"
                  @click="openInvitation"
                />
              </div>

              <div class="flex flex-col text-sm text-slate-700">
                <p v-for="participant in party.party_users" :key="participant">
                  @{{ participant }}
                </p>
              </div>
            </div>
          </template>
        </VContent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { formatAmount } from '@/herlper/formatAmount'

import { Icon } from '@iconify/vue'

import VSidebarBack from '@/components/VSidebarBack.vue'
import VContent from '@/components/VContent.vue'
import VIconButton from '@/components/VIconButton.vue'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'

const route = useRoute()

const party = reactive({
  name: '',
  quantity: 0,
  period: '',
  party_users: [],
})

api.get(`/parties/${route.params.id}`).then((response) => {
  console.log(response.data)
  party.name = response.data.name
  party.quantity = response.data.quantity
  party.period = response.data.period
  party.party_users = response.data.party_users
})

async function openInvitation() {
  try {
    // Clipboard API (recomendado)
    await navigator.clipboard.writeText(
      `http://localhost:3001/#/party/invitation/${route.params.id}`,
    )
    console.log('Copiado ✅')
  } catch (err) {
    console.error('Clipboard API error:', err)
  }
}
</script>
