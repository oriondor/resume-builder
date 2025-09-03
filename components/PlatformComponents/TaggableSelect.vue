<script setup lang="ts" generic="T extends object">
  import type { SelectableOption, SelectProps } from "../HelperComponents/Selector.vue";

  const props = defineProps<SelectProps>();

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

  const exactMatchExists = computed(() => options.value.some((option) =>
      typeof option === "string"
        ? (option as string) === search.value
        : ((option as T)[label.value] as string) === search.value
    ) )

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
        <helper-tag :text="getOptionLabel(option)" />
      </div>
    </template>
    <template v-if="search && !exactMatchExists" #options-addon>
      <div class="add-new-tag">
        <helper-button icon="material-symbols:add-2" type="subdued" appearance="minimal" @click="createTag">
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
  .add-new-tag :deep(.control) {
    flex: 1;
  }
</style>
