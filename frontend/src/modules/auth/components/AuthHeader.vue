<template>
  <header class="mb-6 text-center">
    <p class="text-[11px] tracking-widest font-semibold text-gray-600 uppercase">
      {{ brand }}
    </p>
    <h1 class="text-3xl font-semibold text-emerald-700 mt-2">{{ title }}</h1>
    <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  brand: string
  title: string
  subtitle?: string
}>()
</script>
