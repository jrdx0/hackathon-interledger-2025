<template>
  <span class="px-2 py-1 rounded-sm text-xs font-medium" :class="color">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  color: string
}>()
</script>
