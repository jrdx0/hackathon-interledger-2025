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
                  <option value="PER_MONTH">Mensual</option>
                  <option value="UNIQUE">Anual</option>
                </template>
              </InputOption>
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

const party = reactive({
  name: '',
  quantity: 0,
  period: 'PER_MONTH',
})
</script>
