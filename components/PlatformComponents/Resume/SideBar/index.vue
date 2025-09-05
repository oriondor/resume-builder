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
  .sidebar {
    overflow: auto;
    max-height: 100vh;
    max-width: 40%;
    padding: 1rem;
  }

  .mode-selector {
    display: flex;
  }

  .title-item {
    margin-block: 1rem;
  }
</style>
