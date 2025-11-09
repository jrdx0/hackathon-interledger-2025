<template>
  <div class="">
    <p v-if="label" class="text-[12px] text-gray-800 font-semibold">
      {{ label }}
    </p>
    <input
      ref="inputRef"
      :id="id"
      v-model="value"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :required="required ?? false"
      :disabled="disabled ?? false"
      :class="{
        'bg-white placeholder:text-gray-500 text-slate-800 border border-gray-200': !disabled,
        'border-none bg-white text-black': disabled,
      }"
      class="w-full rounded-[6px] py-4 px-3 text-[14px] bg-white placeholder:text-gray-500 text-slate-800 border border-gray-200"
      :maxlength="limit"
    />
    <slot name="icon"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

interface Props {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  type?: string
  limit?: number
}

defineProps<Props>()

const value = defineModel()

const inputRef = ref<HTMLInputElement>()
defineExpose({
  focus: () => inputRef.value?.focus(),
})
</script>

<style scoped></style>
