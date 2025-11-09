<template>
  <button class="social-btn" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
defineEmits<{ click: [] }>()
</script>

<style scoped>
.social-btn {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-weight: 500;
}
.social-btn:hover {
  background: #f3f4f6;
}
</style>
