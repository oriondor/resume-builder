<script setup lang="ts">
  const text = ref("");
</script>

<template>
  <helper-button> Click Me </helper-button>
  <helper-input v-model="text" />
  <helper-textarea v-model="text" />
  <p>{{ text }}</p>
</template>
