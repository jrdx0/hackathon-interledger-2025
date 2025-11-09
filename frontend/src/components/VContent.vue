<template>
  <div class="w-full h-full flex flex-col gap-2.5 min-h-0">
    <slot name="header" />

    <div class="flex-1 min-h-0 overflow-y-auto custom-scroll flex flex-col gap-2.5 py-3">
      <slot name="content" />
    </div>

    <slot name="footer" />
  </div>
</template>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.custom-scroll {
  scrollbar-width: thin;
}
</style>
