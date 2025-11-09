<template>
  <header class="w-full flex flex-col gap-5 my-5">
    <h1 class="text-[10px] text-center font-bold">UNDEFINED - COMMUNITY TECH</h1>

    <div class="w-full flex justify-between items-center px-5">
      <Icon
        icon="tabler:chevrons-left"
        class="text-gossamer-500 cursor-pointer"
        width="30"
        @click="router.push({ name: routerName })"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{ routerName: string }>()
</script>
