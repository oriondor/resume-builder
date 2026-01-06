<script setup lang="ts" generic="T extends object">
  import type { TagStyle } from "~/types/tags";
  import type { SelectableOption, SelectProps } from "../HelperComponents/Selector.vue";

  interface Props extends SelectProps {
    variant?: TagStyle;
  }

  const props = defineProps<Props>();

  const { options, optionName } = toRefs(props);

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

  const label = computed(() => optionName.value as Extract<keyof T, string>);

  const exactMatchExists = computed(() =>
    options.value.some((option) =>
      typeof option === "string"
        ? (option as string) === search.value
        : ((option as T)[label.value] as string) === search.value
    )
  );

  function createTag() {
    if (!allowTagging.value) return;
    // Check if exact match already exists - then block tagging
    if (exactMatchExists.value) return;
    emit("tag", search.value);
    search.value = "";
  }
</script>

<template>
  <helper-selector v-model="modelValue" v-bind="props" :options="filteredTags" multiple>
    <template #trigger-label="{ getOptionLabel, getOptionKey, toggle }">
      <helper-tag
        v-for="option in modelValue"
        :key="getOptionKey(option)"
        :text="getOptionLabel(option)"
        :variant
      />
      <helper-input
        v-model="search"
        :placeholder="!modelValue.length ? 'Select options' : ''"
        appearance="minimal"
        @keydown.enter.stop="createTag"
        @keydown="toggle(true)"
      />
    </template>
    <template #option="{ option, selected, getOptionLabel }">
      <div class="option-content">
        <helper-check-box :model-value="selected" @click.prevent />
        <helper-tag :text="getOptionLabel(option)" :variant />
      </div>
    </template>
    <template #options-addon>
      <div v-if="search && !exactMatchExists" class="add-new-tag">
        <helper-button
          icon="material-symbols:add-2"
          type="subdued"
          appearance="minimal"
          @click="createTag"
        >
          Create {{ search }}
        </helper-button>
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
  :deep(.trigger-content .control) {
    flex: 1;
  }
  .add-new-tag {
    border-top: 1px solid var(--color-border);
    padding: 0.5rem;
    background: var(--color-surface);
  }
  .add-new-tag :deep(button) {
    width: 100%;
  }
</style>
