<template>
  <div class="divider">
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  color: #8075b4;
  font-size: 13px;
  margin: 12px 0;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #8075b4;
  margin: 0 8px;
}
</style>
