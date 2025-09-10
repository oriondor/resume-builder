<script setup lang="ts">
  useTheme();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  html,
  body,
  #__nuxt {
    height: 100%;
    background: var(--color-bg);
    color: var(--color-text);
  }
</style>
