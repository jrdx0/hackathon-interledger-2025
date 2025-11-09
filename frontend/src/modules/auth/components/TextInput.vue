<template>
  <div style="display: flex; flex-direction: column; gap: 4px;">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      style="padding: 8px; border: 1px solid #ccc; border-radius: 6px;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' }
})

const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

watch(value, (v) => emit('update:modelValue', v))
</script>
