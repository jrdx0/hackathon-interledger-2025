<template>
  <VCard class="w-full cursor-pointer select-none transition-all duration-200 hover:shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase">{{ title }}</h2>
      <p>{{ status }}</p>
    </div>

    <!-- Totales -->
    <div class="flex justify-between text-sm">
      <!-- <div class="flex items-center gap-0.5">
        <Icon icon="tabler:user" width="18" />
        <p>{{ users.length }}</p>
      </div> -->
      <p class="font-bold text-[#3E8762]">{{ formatAmount(total) }}</p>
    </div>

    <div class="flex justify-end">
      <VIconButton
        icon="tabler:moneybag"
        color="bg-gossamer-500 text-white"
        :text="statusRes === 'pending' ? 'Continuar' : 'Pagar'"
        @click="pay"
      />
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { formatAmount } from '@/herlper/formatAmount'
import VCard from '@/components/VCard.vue'
import VIconButton from '@/components/VIconButton.vue'
import { api } from '@/common/api'
import { ref } from 'vue'

const props = defineProps<{
  id: string
  title: string
  total: number
  status: string
}>()

const statusRes = ref('')
const loading = ref(false)
const accessToken = ref('')

function pay() {
  if (loading.value) return

  if (statusRes.value === '') {
    loading.value = true
    api
      .post('/payments', {
        party_id: props.id,
      })
      .then((response) => {
        statusRes.value = response.data.status
        accessToken.value = response.data.accessToken

        if (response.data.status === 'pending') {
          window.open(response.data.interactUrl, '_blank')
          loading.value = false
        }
      })
  } else if (statusRes.value === 'pending') {
    loading.value = true
    api
      .get('/payments/continue' + props.id, { data: { accessToken: accessToken.value } })
      .then((response) => {
        statusRes.value = response.data.status

        if (response.data.status === 'success') {
          loading.value = false
          console.log(response.data)
        }
      })
  }
}
</script>
