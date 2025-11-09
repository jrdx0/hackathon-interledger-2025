<template>
  <Button
    class="flex bg-gossamer-500 py-1 px-2.5 gap-1.5 text-white font-semibold text-sm absolute bottom-5 right-5 rounded-sm items-center transition-all duration-200 hover:shadow-sm cursor-pointer"
  >
    <Icon :icon="icon" />
    {{ text }}
  </Button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  text: string
  icon: string
}>()
</script>
