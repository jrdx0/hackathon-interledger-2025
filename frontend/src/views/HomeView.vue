<template>
  <div class="screen overflow-hidden">
    <VSidebar />

    <div class="content bg-[#E3E3E3]">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import VSidebar from '@/components/VSidebar.vue'
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
