<script setup lang="ts">
  import type { FieldProps } from "~/types/field";

  defineProps<FieldProps>();

  const modelValue = defineModel();
</script>
<template>
  <template v-if="!collapsed">
    <helper-input v-model="modelValue" :label :placeholder />
  </template>
  <template v-else>
    <view-text :type :model-value />
  </template>
</template>
