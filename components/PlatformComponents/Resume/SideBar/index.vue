<script lang="ts" setup>
  import type { Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });
</script>

<template>
  <client-only>
    <div class="sidebar">
      <div class="mode-selector">
        <select-theme />
        <select-mode />
      </div>
      <sections-personal-info v-model:resume="resume" />
      <view-separator />
      <sections-work v-model:resume="resume" />
      <view-separator />
      <sections-education v-model:resume="resume" />
      <view-separator />
      <view-text type="title" size="extra-large"> Skills </view-text>
      <sections-skills v-model:resume="resume" />
      <view-separator />
      <sections-projects v-model:resume="resume" />
      <view-separator />
      <sections-language v-model:resume="resume" />
      <view-separator />
      <sections-interests v-model:resume="resume" />
    </div>
  </client-only>
</template>

<style lang="css" scoped>
  /* left column */
  .sidebar {
    height: 100%;
    overflow: auto;
    max-width: 40%;
    padding: 1rem;
    box-sizing: border-box;

    overscroll-behavior: contain; /* stop wheel/trackpad bubbling to root */
    overflow-anchor: none; /* stop Chrome from root “anchoring” jumps */
    scrollbar-gutter: stable both-edges; /* avoid layout shift when bar appears */
  }

  /* right column root container (whatever wraps the pages) */
  .preview-root {
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    overflow-anchor: none;
    scrollbar-gutter: stable both-edges;
  }

  .mode-selector {
    display: flex;
  }

  .title-item {
    margin-block: 1rem;
  }
</style>
