<script setup lang="ts">
  const modelValue = defineModel<LanguageItem>({ required: true });
</script>

<template>
  <div class="languages">
    <helper-input v-model="modelValue.name" label="Language" />
    <helper-selector
      v-model="modelValue.level"
      :options="['Conversational', 'Working proficiency', 'Full Professional Proficiency', 'Native or Bilingual Proficiency']"
    />
  </div>
</template>
