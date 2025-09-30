<script setup lang="ts">
  import type { Resume } from "~/types/resume";
  import { pascalCase } from "change-case";
  import type { Template } from "~/types/templates";

  const templates = ref<Template[]>([]);

  const resume = defineModel<Resume>("resume", { required: true });

  const sectionModules = import.meta.glob<() => Promise<{ default: Component }>>(
    "~/components/PlatformComponents/Resume/Preview/Sections/*.vue"
  );
  // Load sections from resume and return components related to every section
  // every section that needs a component will have it
  const availableComponents = computed(() =>
    Object.keys(resume.value)
      .map((sectionName) => {
        const fileName = pascalCase(sectionName);
        const path = `/components/PlatformComponents/Resume/Preview/Sections/${fileName}.vue`;

        // TODO: for sections without corresponding component there should be slightly different approach
        // it will load custom component, but there will be also white list introduced, for personal info and etc.
        if (!sectionModules[path]) return null;

        return {
          name: sectionName,
          component: defineAsyncComponent(sectionModules[path]),
        };
      })
      .filter((componentDefinition) => componentDefinition !== null)
  );
</script>

<template>
  <div class="container">
    <div class="page">
      <div class="content">
        <paginable-block>
          <print-sections-personal-info :resume />
        </paginable-block>
        <paginable-block v-for="entry in availableComponents" :key="entry.name">
          <component :is="entry.component"></component>
        </paginable-block>
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
    height: 100vh;
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
