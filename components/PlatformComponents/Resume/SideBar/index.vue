<script lang="ts" setup>
  import type { Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const sections = computed(() => {});
</script>

<template>
  <client-only>
    <div class="sidebar">
      <div class="mode-selector">
        <select-theme />
        <select-mode />
      </div>
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
