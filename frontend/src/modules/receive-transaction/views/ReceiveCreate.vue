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
            <VCard>
              <InputText
                id="name"
                v-model="party.name"
                label="Nombre"
                placeholder="Nombre"
                type="text"
                required
              />

              <InputText
                id="quantity"
                v-model="party.quantity"
                label="Cantidad"
                placeholder="Cantidad"
                type="number"
                required
              />

              <InputOption label="Periodo" v-model="party.period">
                <template #options>
                  <option value="MONTHLY">Mensual</option>
                  <option value="ANNUAL">Anual</option>
                  <option value="ONE_TIME">Unico</option>
                </template>
              </InputOption>

              <VIconButton
                icon="tabler:moneybag"
                color="bg-gossamer-500 text-white"
                text="Crear Grupo"
                @click="onSubmit"
              />
            </VCard>
          </template>
        </VContent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import InputText from '@/components/InputText.vue'
import VCard from '@/components/VCard.vue'
import VContent from '@/components/VContent.vue'
import InputOption from '@/components/InputOption.vue'
import VSidebarBack from '@/components/VSidebarBack.vue'
import VIconButton from '@/components/VIconButton.vue'
import { api } from '@/common/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const party = reactive({
  name: '',
  quantity: 0,
  period: 'MONTHLY',
})

function onSubmit() {
  if (!party.name || !party.quantity || !party.period) {
    console.log('Faltan datos')
    return
  }

  api.post('/parties', party).then((response) => {
    console.log(response)
    router.push({ name: 'receive-read', params: { id: response.data.id } })
  })
}
</script>
