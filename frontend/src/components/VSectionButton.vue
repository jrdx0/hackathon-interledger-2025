<template>
  <RouterLink
    active-class="bg-gossamer-500 text-white"
    :to="{ name: routerName }"
    class="w-full py-3.5 font-semibold text-[16px] text-gossamer-500 bg-[#F8F8F8] text-center rounded transition-colors duration-200"
  >
    {{ text }}
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  routerName: string
  text: string
}>()
</script>
