<script setup lang="ts">
  import type { SectionItem } from "~/types/resume";
  import type { SectionConfig } from "~/types/templates";

  interface Props {
    title?: string;
  }
  withDefaults(defineProps<Props>(), {
    title: "Unnamed section",
  });

  const content = defineModel<SectionItem<any>>("content", { required: true });
  const config = defineModel<SectionConfig>("config", { required: true });

  function isTagItem(config: SectionConfig) {
    return Object.values(config.fields)[0]?.component === "multiselect";
  }

  const firstFieldPayload = computed(() => {
    const [name, fieldConfig] = Object.entries(config.value?.fields ?? {})[0] ?? [];
    return name ? { name, fieldConfig } : null;
  });
</script>

<template>
  <div class="section">
    <div class="section-header">
      <view-text type="title" size="large" class="header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </view-text>
    </div>
    <template v-if="isTagItem(config)">
      <preview-field v-model="content.items" v-bind="firstFieldPayload" />
    </template>
    <template v-else>
      <preview-items v-model:options="content.items" v-slot="{ item, index }">
        <preview-field
          v-for="[name, _] in Object.entries(item)"
          :key="name"
          :name
          v-model="content.items[index][name]"
          :field-config="config.fields[name]"
        />
      </preview-items>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .section {
    padding: 1rem;
    background-color: var(--color-surface);
    border-radius: 4px;
    user-select: none;

    .section-header {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
