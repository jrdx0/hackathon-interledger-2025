<template>
  <button
    type="button"
    class="border cursor-pointer rounded-[6px] flex justify-center items-center font-semibold px-2 py-1.5 gap-1"
    :class="[color || '', borderColor || 'border-none']"
  >
    <Icon v-if="icon" :icon="icon" :width="width" />
    <span class="text-xs" v-if="text">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    width?: number
    color: string
    icon: string
    text: string
    borderColor?: string
  }>(),
  {
    width: 20,
  },
)
</script>

<style scoped></style>
