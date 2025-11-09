<template>
  <main class="layout">
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f4f6;
}
</style>
