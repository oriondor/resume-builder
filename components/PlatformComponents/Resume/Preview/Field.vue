<script setup lang="ts">
  import { computed, toRefs } from "vue";
  import type { CustomSectionFieldConfig } from "~/types/templates";

  const props = defineProps<{
    fieldConfig: CustomSectionFieldConfig;
    name?: string;
  }>();

  const modelValue = defineModel();
  const { fieldConfig } = toRefs(props);

  const { componentTag } = useFetchFields(fieldConfig);

  const fieldPayload = computed(() => ({
    type: fieldConfig.value.type,
  }));
</script>

<template>
  <component
    v-if="componentTag"
    :is="componentTag"
    v-model="modelValue"
    v-bind="fieldPayload"
    :name
    :collapsed="true"
  />
</template>
