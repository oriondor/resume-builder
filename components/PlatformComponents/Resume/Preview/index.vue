<script setup lang="ts">
  import type { Resume } from "~/types/resume";
  import type { Template, TemplateConfig } from "~/types/templates";

  const templates = ref<Template[]>([]);

  const resume = defineModel<Resume>("resume", { required: true });
  const config = defineModel<TemplateConfig>("config", { required: true });

  const { sectionNames } = useFetchSections(config);
</script>

<template>
  <div class="container">
    <div class="page">
      <div class="content">
        <preview-section
          v-for="(sectionName, index) in sectionNames"
          :key="sectionName"
          :title="resume[sectionName].title"
          v-model:content="resume[sectionName]"
          v-model:config="config[sectionName]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
  .container {
    overflow: auto;
    height: 100%;
    max-height: 100vh;
    flex: 1;
    display: flex;
    justify-content: center;

    .page {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      background: var(--color-bg);
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
      color: #222;
      font: 10pt/1.35 var(--resume-font, "Inter", system-ui, sans-serif);
    }
  }
</style>
