<script setup lang="ts">
  import type { SelectProps } from "../HelperComponents/Selector.vue";

  defineProps<SelectProps>();
  const modelValue = defineModel<string[]>({ required: true });
</script>

<template>
  <helper-selector v-model="modelValue" :options multiple>
    <template #trigger-label>
      <div v-if="!modelValue.length">Select options</div>
      <helper-tag v-for="option in modelValue" v-else :key="option" :text="option" />
    </template>
    <template #option="{ option, selected }">
      <div class="option-content">
        <helper-check-box :model-value="selected" @click.prevent />
        <helper-tag :text="option" />
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
  .checkbox {
    margin: 0;
  }
  :deep(.trigger-content) {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
</style>
