<template>
  <div class="screen bg-blue-700 overflow-hidden">
    <VSidebar />

    <div class="content" :class="navigatorStore.active ? 'screen-active' : ''">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import VSidebar from '@/components/VSidebar.vue'
import { useNavigatorStore } from '@/stores/session.store.ts'

const navigatorStore = useNavigatorStore()
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100svh;
  background-color: #f0f0f0;
}

.content {
  height: 100svh;
  display: flex;
  flex-direction: column;
}

.screen-active {
  @media (min-width: 480px) {
    width: calc(100% - 300px);
  }
}
</style>
