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
              :total="transaction.total"
              :status="transaction.status"
              :users="transaction.users"
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
      {
        name: 'User 2',
        amount: 100,
      },
      {
        name: 'User 3',
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
        amount: 200,
      },
      {
        name: 'User 2',
        amount: 200,
      },
      {
        name: 'User 3',
        amount: 200,
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
        amount: 300,
      },
      {
        name: 'User 2',
        amount: 300,
      },
      {
        name: 'User 3',
        amount: 400,
      },
      {
        name: 'User 4',
        amount: 100,
      },
    ],
  },
  {
    id: 4,
    name: 'Transaction 4',
    total: 1000,
    status: 'Per month',
    users: [
      {
        name: 'User 1',
        amount: 300,
      },
      {
        name: 'User 2',
        amount: 300,
      },
      {
        name: 'User 3',
        amount: 400,
      },
      {
        name: 'User 4',
        amount: 100,
      },
    ],
  },
]
</script>
