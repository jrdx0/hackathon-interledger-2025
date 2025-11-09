<template>
  <div class="flex flex-col w-full h-[100svh] overflow-hidden">
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

                <Icon icon="tabler:link" class="text-blue-900 cursor-pointer" width="20" />
              </div>

              <div class="flex flex-col text-sm text-slate-700">
                <p v-for="participant in party.participants" :key="participant">
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

const party = reactive({
  name: 'Spotify Amigos',
  quantity: 304.92,
  participants: ['Participante 1', 'Participante 2', 'Participante 3'],
})
</script>
