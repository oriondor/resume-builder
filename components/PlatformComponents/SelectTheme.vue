<script setup lang="ts">
  const { theme, setTheme } = useTheme();
</script>

<template>
  <helper-selector
    :model-value="theme"
    :options="['navy', 'teal', 'forest', 'wine', 'royal']"
    @update:model-value="setTheme($event as string)"
  />
</template>
