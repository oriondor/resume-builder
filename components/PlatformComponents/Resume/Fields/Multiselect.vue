<script setup lang="ts">
  import type { SelectFieldProps } from "~/types/field";
  import type { Tag, TagStyle } from "~/types/tags";

  const props = withDefaults(defineProps<SelectFieldProps>(), {
    variant: "neutral",
  });

  const modelValue = defineModel();

  const { tags: options, createTag, refresh, tagStyles } = useTags(props.name);
  refresh();

  const selectedVariant = ref<TagStyle>("accent");
</script>
<template>
  <div v-if="!collapsed">
    <helper-selector v-model="selectedVariant" :options="tagStyles" label="Select tag style" />
    <taggable-select
      v-model="modelValue"
      :options
      field="id"
      option-name="name"
      :label
      :variant
      @tag="createTag"
    />
  </div>
  <div v-else>
    <helper-tag v-for="tag in modelValue as Tag[]" :key="tag.id" :text="tag.name" :variant />
  </div>
</template>
