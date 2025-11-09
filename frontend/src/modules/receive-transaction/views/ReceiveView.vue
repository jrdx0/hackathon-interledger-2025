<template>
  <VContent class="px-5">
    <template #content>
      <CardReceive
        v-for="transaction in transactions"
        :key="transaction.id"
        :title="transaction.title"
        :total="transaction.total"
        :status="transaction.status"
        :users="transaction.users"
      />

      <VButtonFloat
        text="Crear grupo"
        icon="mdi:plus"
        @click="router.push({ name: 'receive-create' })"
      />
    </template>
  </VContent>
</template>

<script setup lang="ts">
import VContent from '@/components/VContent.vue'
import CardReceive from '@/modules/receive-transaction/components/CardReceive.vue'
import VButtonFloat from '@/components/VButtonFloat.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const transactions = [
  {
    id: 1,
    title: 'Transaction 1',
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
    title: 'Transaction 2',
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
    title: 'Transaction 3',
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
