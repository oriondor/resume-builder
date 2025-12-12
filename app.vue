<script setup lang="ts">
  useTheme();

  // Disable zoom on mobile
  useHead({
    meta: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],
  });

  useOptimizeMobile();
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

  /* Disable double-tap zoom globally via touch-action */
  * {
    touch-action: manipulation;
  }
</style>
