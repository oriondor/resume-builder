<script setup lang="ts">
  import type { FieldProps } from "~/types/field";

  defineProps<FieldProps>();

  const modelValue = defineModel();
</script>
<template>
  {{ modelValue }}
  <template v-if="!collapsed">
    <helper-date-range-picker v-model="modelValue" :label :placeholder />
  </template>
  <template v-else>
    <view-dates :dates="modelValue" />
  </template>
</template>
