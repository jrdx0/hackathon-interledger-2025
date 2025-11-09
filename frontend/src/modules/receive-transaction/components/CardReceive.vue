<template>
  <VCard
    class="w cursor-pointer select-none transition-all duration-200 hover:shadow-sm"
    @click="toggleUsers"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase">{{ title }}</h2>
      <VBadge v-if="status === 'Unique'" :label="status" color="bg-blue-700/20 text-blue-700" />
      <VBadge
        v-if="status === 'Per month'"
        :label="status"
        color="bg-orange-700/20 text-orange-700"
      />
    </div>

    <!-- Totales -->
    <div class="mt-1">
      <div class="flex justify-between text-sm">
        <p class="text-gray-600">Total</p>
        <p class="font-semibold">{{ formatAmount(total) }}</p>
      </div>
      <div class="flex justify-between text-sm">
        <p class="text-gray-600">Número de personas</p>
        <p class="font-semibold">{{ users.length }}</p>
      </div>
    </div>

    <transition name="accordion">
      <div v-if="showUsers" class="overflow-hidden">
        <hr class="my-2 border-gray-200" />

        <ul class="text-sm text-gray-700">
          <li
            v-for="user in users"
            :key="user.name"
            class="flex justify-between items-center py-0.5"
          >
            <span>{{ user.name }}</span>
            <span class="font-semibold">{{ formatAmount(user.amount) }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatAmount } from '@/herlper/formatAmount'
import VCard from '@/components/VCard.vue'
import VBadge from '@/components/VBadge.vue'

defineProps<{
  title: string
  total: number
  status: string
  users: {
    name: string
    amount: number
  }[]
}>()

const showUsers = ref(false)
const toggleUsers = () => {
  showUsers.value = !showUsers.value
}
</script>

<style scoped>
/* Transición tipo acordeón */
.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease,
    transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px) scaleY(0.98);
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 600px;
  opacity: 1;
  transform: translateY(0) scaleY(1);
}
</style>
