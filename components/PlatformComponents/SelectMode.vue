<script setup lang="ts">
  const { mode, setMode } = useTheme();
</script>

<template>
  <helper-selector
    :model-value="mode"
    :options="['dark', 'light']"
    @update:model-value="setMode($event as string)"
  />
</template>
