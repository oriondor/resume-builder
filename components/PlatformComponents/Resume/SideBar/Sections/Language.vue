<script setup lang="ts">
  import type { LanguageItem, Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const { removeItem } = useResume();

  const defaultLanguage = {
    name: "English",
    level: "Conversational" as LanguageItem["level"],
    index: 0,
  };

  function addLanguage() {
    resume.value.languages.push({
      ...defaultLanguage,
      index: resume.value.languages.length,
    });
  }
</script>

<template>
  <Section title="Languages">
    <template #content>
      <languages-item
        v-for="(language, index) in resume.languages"
        :key="language.index"
        v-model="resume.languages[index]"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add language"
        size="small"
        @click="addLanguage"
      />
    </template>
    <template #content-collapsed>
      <view-text v-for="(item, index) in resume.languages" :key="item.index">
        - {{ item.name }}
      </view-text>
    </template>
  </Section>
</template>
