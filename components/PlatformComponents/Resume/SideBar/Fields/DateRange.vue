<script setup lang="ts">
  import type { FieldProps } from "~/types/field";

  defineProps<FieldProps>();

  const modelValue = defineModel();
</script>
<template>
  <template v-if="!collapsed">
    <helper-date-range-picker v-model:dates="modelValue" :label :placeholder month />
  </template>
  <template v-else>
    <view-dates :dates="modelValue" month />
  </template>
</template>
