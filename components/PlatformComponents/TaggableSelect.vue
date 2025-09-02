<script setup lang="ts">
  import type { SelectableOption, SelectProps } from "../HelperComponents/Selector.vue";

  const props = defineProps<SelectProps>();

  const { options } = toRefs(props);

  const modelValue = defineModel<SelectableOption[]>({ required: true });

  // Can be a model if needed
  const search = defineModel<string>("search", { required: false, default: "" });
  const emit = defineEmits<{
    /**
     * Allow Enter keydown to create new tag using 'search' value
     */
    (event: "tag", search: string): void;
  }>();

  const currentInstance = getCurrentInstance();
  const allowTagging = computed(() => !!currentInstance?.vnode.props?.onTag);

  const filteredTags = useFuzzySearch(options, search, { keys: ["name"] });

  function onEnterPress() {
    if (!allowTagging.value) return;
    emit("tag", search.value);
    search.value = "";
  }
</script>

<template>
  <helper-selector v-model="modelValue" v-bind="props" :options="filteredTags" multiple>
    <template #trigger-label="{ getOptionLabel, getOptionKey }">
      <helper-tag
        v-for="option in modelValue"
        :key="getOptionKey(option)"
        :text="getOptionLabel(option)"
      />
      <helper-input
        v-model="search"
        :placeholder="!modelValue.length ? 'Select options' : ''"
        appearance="minimal"
        @keydown.enter.stop="onEnterPress"
      />
    </template>
    <template #option="{ option, selected, getOptionLabel }">
      <div class="option-content">
        <helper-check-box :model-value="selected" @click.prevent />
        <helper-tag :text="getOptionLabel(option)" />
      </div>
    </template>
  </helper-selector>
</template>

<style scoped>
  .option-content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  :deep(.selector-trigger) {
    padding: 0;
  }
  .checkbox {
    margin: 0;
  }
  :deep(.trigger-content) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
    padding: 0.25rem;
  }
</style>
