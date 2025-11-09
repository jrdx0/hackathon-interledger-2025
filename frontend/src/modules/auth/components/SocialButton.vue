<template>
  <button
    class="social-btn"
    :class="`social-btn--${variant}`"
    @click="$emit('click', props)"
    type="button"
  >
    <Icon
      v-if="variant === 'google'"
      icon="logos:google-icon"
      width="22"
      height="22"
    />
    <Icon
      v-else-if="variant === 'facebook'"
      icon="logos:facebook"
      width="22"
      height="22"
    />
    <Icon
      v-else-if="variant === 'github'"
      icon="logos:github-icon"
      width="22"
      height="22"
    />
    <Icon
      v-else-if="variant === 'apple'"
      icon="logos:apple"
      width="22"
      height="22"
    />
    <span class="label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = withDefaults(
  defineProps<{
    label: string
    variant?: 'google' | 'facebook' | 'github' | 'apple'
  }>(),
  { variant: 'google' }
)

defineEmits<{ click: [] }>()
</script>

<style scoped>
.social-btn {
  --c: #ff8a8a;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 18px;
  border: 2px solid var(--c);
  border-radius: 14px;
  background: #fff;
  color: var(--c);
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}
.social-btn:hover {
  background: rgba(0, 0, 0, 0.02);
}
.social-btn:active {
  transform: translateY(0.5px);
}
.social-btn:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--c) 30%, white);
}

.icon {
  display: inline-flex;
}
.icon svg {
  display: block;
}

.social-btn--google {
  --c: #ff8a8a;
}
.social-btn--facebook {
  --c: #9aaeca;
}
.social-btn--github {
  --c: #333333;
}
.social-btn--apple {
  --c: #000000;
}
</style>
