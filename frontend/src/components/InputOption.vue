<template>
  <div>
    <p class="text-[12px] text-gray-800 font-semibold">{{ label }}</p>
    <select
      class="w-full h-[46.8px] rounded-[6px] py-4 px-3 text-[14px] bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-rose-800"
      :class="{ 'text-gray-500': value === '', 'text-slate-800': value !== '' }"
      v-model="value"
      :required="required"
    >
      <slot name="options" />
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  required?: boolean
}

defineProps<Props>()
const value = defineModel<string | number | boolean | null>({ default: '' })
</script>
