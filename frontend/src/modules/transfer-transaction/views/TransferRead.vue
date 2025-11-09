<template>
  <div class="flex flex-col w-full h-svh overflow-hidden">
    <VSidebarBack routerName="TransferTransaction" />

    <div class="flex flex-col flex-1 min-h-0">
      <div class="w-full h-full">
        <VContent>
          <template #content>
            <div class="my-5">
              <h1 class="text-2xl font-semibold text-center">{{ party.name }}</h1>
              <p class="text-5xl text-rose-900 font-bold text-center">
                {{ formatAmount(party.quantity) }}
              </p>
              <div class="flex justify-center mt-3">
                <Icon icon="tabler:rotate-clockwise-2" class="text-slate-700" width="40" />
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
  name: 'Spotify Amigos',
  quantity: 304.92,
})

function pay() {
  api.post('/payments', {
    party_id: route.params.id,
  })
}
</script>
