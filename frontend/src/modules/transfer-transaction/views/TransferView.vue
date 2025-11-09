<template>
  <div class="flex flex-col w-full h-svh overflow-hidden">
    <VSidebar />

    <div class="flex flex-col flex-1 min-h-0">
      <div class="w-full h-full">
        <VContent>
          <template #content>
            <CardTransfer
              v-for="transaction in transactions"
              :key="transaction.id"
              :id="transaction.id"
              :title="transaction.name"
              :total="transaction.quantity"
              :status="transaction.period"
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
import CardTransfer from '@/modules/transfer-transaction/components/CardTransfer.vue'
import { api } from '@/common/api'
import { ref } from 'vue'

const transactions = ref([
  {
    id: '',
    name: '',
    quantity: 0,
    period: '',
    lockAccess: false,
  },
])

api.get('/parties?type=send').then((response) => {
  transactions.value = response.data
})
</script>
