<template>
  <div style="display: flex; flex-direction: column; gap: 6px;">
    <label
      style="font-size: 14px; color: #4a4a4a; font-weight: 500;"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="value"
      style="
        border: 2px solid #65b6ac;
        border-radius: 10px;
        padding: 10px 14px;
        font-size: 15px;
        color: #65b6ac;
        outline: none;
        transition: all 0.2s ease;
      "
      @focus="onFocus"
      @blur="onBlur"
      :style="{ borderColor: isFocused ? '#3fa59b' : '#65b6ac' }"
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
const isFocused = ref(false)

watch(value, (v) => emit('update:modelValue', v))

function onFocus() {
  isFocused.value = true
}
function onBlur() {
  isFocused.value = false
}
</script>
