<script setup lang="ts">
  import { computed, toRefs } from "vue";
  import type { CustomSectionFieldConfig } from "~/types/templates";

  const props = defineProps<{
    collapsed: boolean;
    fieldConfig: CustomSectionFieldConfig;
    name?: string;
  }>();

  const modelValue = defineModel();
  const { collapsed, fieldConfig } = toRefs(props);

  const { componentTag } = useFetchFields(fieldConfig);

  const fieldPayload = computed(() => ({
    collapsed: collapsed.value,
    ...fieldConfig.value.attrs,
    lineClamp: 3,
  }));
</script>

<template>
  <component
    v-if="componentTag"
    :is="componentTag"
    v-model="modelValue"
    v-bind="fieldPayload"
    :name
  />
</template>
