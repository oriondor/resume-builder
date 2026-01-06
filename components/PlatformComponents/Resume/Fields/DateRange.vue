<script setup lang="ts">
  import type { FieldProps } from "~/types/field";

  defineProps<FieldProps>();

  const modelValue = defineModel();
</script>
<template>
  <div>
    <helper-date-range-picker v-if="!collapsed" v-model:dates="modelValue" :label :placeholder month />
    <view-dates v-else :dates="modelValue" month />
  </div>
</template>
