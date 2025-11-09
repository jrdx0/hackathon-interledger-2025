<template>
  <header class="w-full flex flex-col gap-5 my-5">
    <h1 class="text-[10px] text-center font-bold">UNDEFINED - COMMUNITY TECH</h1>

    <div class="w-full flex justify-between items-center px-5">
      <img class="w-[55px]" src="@/assets/Inter_400x400.png" alt="Inter" />

      <div
        class="w-[45px] h-[45px] flex flex-col items-center justify-center rounded-full bg-emerald-300"
      >
        <p>REY</p>
      </div>
    </div>

    <div class="flex justify-between">
      <VSectionButton routerName="ReceiveTransactionApp" text="Recibir" />

      <VSectionButton routerName="TransferTransactionApp" text="Transferir" />
    </div>
  </header>
</template>

<script setup lang="ts">
import VSectionButton from '@/components/VSectionButton.vue'
</script>
