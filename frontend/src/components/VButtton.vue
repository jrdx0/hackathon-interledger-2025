<template>
  <button class="flex px-3.5" :class="color">
    <Icon :icon="icon" :color="colorIcon" />
    <p class="text-sm" :class="colorText">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  text: string
  icon: string
  color: string
  colorText: string
  colorIcon: string
}>()
</script>
