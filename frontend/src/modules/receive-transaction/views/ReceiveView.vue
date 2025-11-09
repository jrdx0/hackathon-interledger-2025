<template>
  <div class="flex flex-col w-full h-svh overflow-hidden">
    <VSidebar />

    <div class="flex flex-col flex-1 min-h-0">
      <div class="w-full h-full">
        <VContent>
          <template #content>
            <CardReceive
              v-for="transaction in transactions"
              :key="transaction.id"
              :title="transaction.name"
              :total="transaction.quantity"
              :status="transaction.period"
              @click="router.push({ name: 'receive-read', params: { id: transaction.id } })"
            />

            <VButtonFloat
              text="Crear grupo"
              icon="mdi:plus"
              @click="router.push({ name: 'receive-create' })"
            />
          </template>
        </VContent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VSidebar from '@/components/VSidebar.vue'
import VContent from '@/components/VContent.vue'
import CardReceive from '@/modules/receive-transaction/components/CardReceive.vue'
import VButtonFloat from '@/components/VButtonFloat.vue'
import { useRouter } from 'vue-router'
import { api } from '@/common/api'
import { ref } from 'vue'

const router = useRouter()

const transactions = ref([
  {
    id: 1,
    name: '',
    quantity: 0,
    period: '',
    lockAccess: false,
  },
])

api.get('/parties?type=receive').then((response) => {
  transactions.value = response.data
})
</script>
