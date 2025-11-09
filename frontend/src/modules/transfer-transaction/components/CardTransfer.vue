<template>
  <VCard class="w-full cursor-pointer select-none transition-all duration-200 hover:shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase">{{ title }}</h2>
      <p>{{ status }}</p>
    </div>

    <!-- Totales -->
    <div class="flex justify-between text-sm">
      <div class="flex items-center gap-0.5">
        <Icon icon="tabler:user" width="18" />
        <p>{{ users.length }}</p>
      </div>
      <p class="font-bold text-[#3E8762]">{{ formatAmount(total) }}</p>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { formatAmount } from '@/herlper/formatAmount'
import VCard from '@/components/VCard.vue'
import { Icon } from '@iconify/vue'

defineProps<{
  title: string
  total: number
  status: string
  users: {
    name: string
    amount: number
  }[]
}>()
</script>
