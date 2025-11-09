<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.btn {
  width: 100%;
  background: #2e9b85;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn:hover {
  background: #277d6c;
}
</style>
