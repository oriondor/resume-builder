<script setup lang="ts">
  interface Props {
    text: string;
  }
  defineProps<Props>();
</script>
<template>
  <h3>{{ text }}</h3>
</template>
