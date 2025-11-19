<script setup lang="ts">
  import type { FieldProps } from "~/types/field";

  interface Props extends FieldProps {
    lineClamp: number | string;
  }

  defineProps<Props>();

  const modelValue = defineModel();
</script>
<template>
  <template v-if="!collapsed">
    <helper-textarea v-model="modelValue" :label :placeholder />
  </template>
  <template v-else>
    <view-text :type :model-value :line-clamp />
  </template>
</template>
