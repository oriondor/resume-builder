<script setup lang="ts">
  import { pascalCase } from "change-case";
  import { computed, toRefs } from "vue";
  import type { CustomSectionFieldConfig } from "~/types/templates";

  const props = defineProps<{
    collapsed: boolean;
    fieldConfig: CustomSectionFieldConfig;
    name?: string;
  }>();

  const modelValue = defineModel();
  const { collapsed, fieldConfig } = toRefs(props);

  const fieldPayload = computed(() => ({
    collapsed: collapsed.value,
    ...fieldConfig.value.attrs,
  }));

  const components = import.meta.glob(
    "~/components/PlatformComponents/Resume/SideBar/Fields/*.vue",
    { eager: true } // load all at once
  );

  // Normalize keys like "text" from "Text.vue"
  const componentTag = computed(() => {
    const componentName = fieldConfig.value?.component;
    if (!componentName) return null;

    const pascalName = pascalCase(componentName);

    const entry = Object.entries(components).find(([path]) => path.endsWith(`${pascalName}.vue`));

    return entry ? (entry[1] as any).default : null;
  });
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
