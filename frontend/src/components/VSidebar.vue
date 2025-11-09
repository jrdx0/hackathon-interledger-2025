<template>
  <header class="w-full flex flex-col gap-5 mt-5">
    <h1 class="text-[10px] text-center font-bold">UNDEFINED - COMMUNITY TECH</h1>

    <div class="w-full flex justify-between items-center px-5">
      <img class="w-[55px]" src="@/assets/Inter_400x400.png" alt="Inter" />

      <div class="text-sm font-bold">
        <p>{{ username }}</p>
      </div>
    </div>

    <div class="flex justify-between">
      <VSectionButton routerName="ReceiveTransaction" text="Recibir" />

      <VSectionButton routerName="TransferTransaction" text="Transferir" />
    </div>
  </header>
</template>

<script setup lang="ts">
import VSectionButton from '@/components/VSectionButton.vue'
import { api } from '@/common/api'
import { ref } from 'vue'

const username = ref('')

api.get('/me').then((response) => {
  username.value = response.data.username
})
</script>
