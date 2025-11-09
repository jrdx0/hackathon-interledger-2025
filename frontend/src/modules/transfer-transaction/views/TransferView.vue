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
              :title="transaction.name"
              :total="transaction.total"
              :status="transaction.status"
              :users="transaction.users"
              @click="
                router.push({ name: 'TransferTransactionRead', params: { id: transaction.id } })
              "
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
import { useRouter } from 'vue-router'

const router = useRouter()

const transactions = [
  {
    id: 1,
    name: 'Transaction 1',
    total: 100,
    status: 'Unique',
    users: [
      {
        name: 'User 1',
        amount: 100,
      },
    ],
  },
  {
    id: 2,
    name: 'Transaction 2',
    total: 600,
    status: 'Per month',
    users: [
      {
        name: 'User 1',
        amount: 600,
      },
    ],
  },
  {
    id: 3,
    name: 'Transaction 3',
    total: 1000,
    status: 'Per month',
    users: [
      {
        name: 'User 1',
        amount: 1000,
      },
    ],
  },
]
</script>
