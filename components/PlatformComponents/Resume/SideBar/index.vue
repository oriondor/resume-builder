<script lang="ts" setup>
  import type { Resume } from "~/types/resume";
  import type { TemplateConfig } from "~/types/templates";

  const resume = defineModel<Resume>("resume", { required: true });
  const config = defineModel<TemplateConfig>("config", { required: true });

  const { sectionNames } = useFetchSections(config);
</script>

<template>
  <client-only>
    <div class="sidebar">
      <div class="mode-selector">
        <select-theme />
        <select-mode />
      </div>
      <transition-group name="animate-fade-slide" appear>
        <side-bar-section
          v-for="(sectionName, index) in sectionNames"
          :key="sectionName"
          :title="resume[sectionName].title"
          v-model:content="resume[sectionName]"
          v-model:config="config[sectionName]"
        />
      </transition-group>
    </div>
  </client-only>
</template>

<style lang="css" scoped>
  /* left column */
  .sidebar {
    height: 100%;
    overflow: auto;
    max-width: 30rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    overscroll-behavior: contain; /* stop wheel/trackpad bubbling to root */
    overflow-anchor: none; /* stop Chrome from root “anchoring” jumps */
    scrollbar-gutter: stable both-edges; /* avoid layout shift when bar appears */
  }

  .mode-selector {
    display: flex;
  }
</style>
