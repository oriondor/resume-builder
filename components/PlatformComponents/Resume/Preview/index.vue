<script setup lang="ts">
  import type { Resume } from "~/types/resume";
  import type { Template, TemplateConfig } from "~/types/templates";

  const templates = ref<Template[]>([]);

  const resume = defineModel<Resume>("resume", { required: true });
  const config = defineModel<TemplateConfig>("config", { required: true });

  const { sectionNames } = useFetchSections(config);

  const sections = useTemplateRef("section");

  const { currentPage, totalPages, visibleIndices, allPageAssignments, nextPage, prevPage } =
    useResumePagination(sections);

  const pageWrapper = useTemplateRef<HTMLDivElement>("pageWrapper");
  const page = useTemplateRef<HTMLDivElement>("page");

  const { scale } = useResumeScaling(page, pageWrapper);

  const pdfLoading = ref(false);

  async function downloadPDF() {
    pdfLoading.value = true;
    try {
      const blob = await $fetch("/api/export/resume", {
        method: "POST",
        body: {
          resume: resume.value,
          config: config.value,
        },
        responseType: "blob",
      });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      // TODO: Show error notification to user
    } finally {
      pdfLoading.value = false;
    }
  }
</script>

<template>
  <div class="container">
    <!-- Page Navigation -->
    <div class="navigation">
      <div />
      <div class="page-controls no-print">
        <helper-button
          @click="prevPage"
          :disabled="currentPage === 0"
          icon="material-symbols:chevron-left"
        />
        <view-text>Page {{ currentPage + 1 }} of {{ totalPages }}</view-text>
        <helper-button
          @click="nextPage"
          :disabled="currentPage >= totalPages - 1"
          icon="material-symbols:chevron-right"
        />
      </div>
      <div class="export-buttons">
        <helper-button @click="downloadPDF" :loading="pdfLoading" icon="material-symbols:download">
          Download PDF
        </helper-button>
      </div>
    </div>

    <!-- Hidden sections for measurement - render all items -->
    <ClientOnly>
      <div class="measurement-container">
        <div class="page">
          <div class="content">
            <preview-section
              v-for="(sectionName, index) in sectionNames"
              ref="section"
              :key="`measure-${sectionName}`"
              :title="resume[sectionName].title"
              v-model:content="resume[sectionName]"
              v-model:config="config[sectionName]"
              measure-mode
            />
          </div>
        </div>
      </div>
    </ClientOnly>

    <!-- Screen View: Current page only (hidden when printing) -->
    <ClientOnly>
      <div ref="pageWrapper" class="page-wrapper screen-only">
        <div
          ref="page"
          class="page"
          :style="{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }"
        >
          <div class="content">
            <preview-section
              v-for="(sectionName, index) in sectionNames"
              :key="sectionName"
              :title="resume[sectionName].title"
              v-model:content="resume[sectionName]"
              v-model:config="config[sectionName]"
              :items-to-show="visibleIndices[index] || []"
            />
          </div>
        </div>
      </div>

      <!-- Print View: All pages (hidden on screen, visible when printing) -->
      <teleport to="body">
        <div class="print-container">
          <div
            v-for="(pageItems, pageIndex) in allPageAssignments"
            :key="pageIndex"
            class="page print-page"
          >
            <div class="content">
              <preview-section
                v-for="(sectionName, sectionIndex) in sectionNames"
                :key="`print-${sectionName}-${pageIndex}`"
                :title="resume[sectionName].title"
                v-model:content="resume[sectionName]"
                v-model:config="config[sectionName]"
                :items-to-show="pageItems[sectionIndex] || []"
              />
            </div>
          </div>
        </div>
      </teleport>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }

  .measurement-container {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: hidden;
    width: 210mm;
  }

  :global(.print-container) {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  :global(.print-page) {
    display: none;
  }

  .container {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    overflow: hidden;
    position: relative;
  }

  .navigation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      min-width: 9rem;
    }
  }

  .page-controls {
    display: flex;
    align-items: center;
    align-self: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    background: var(--color-surface, #fff);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .page-wrapper {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    position: relative;
  }

  .page {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    background: var(--color-bg);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
    font: 10pt/1.35 var(--resume-font, "Inter", system-ui, sans-serif);
    transition: transform 0.3s ease;
    overflow: hidden;
  }

  @media print {
    .measurement-container,
    .screen-only,
    .container {
      display: none !important;
    }

    :global(body > .print-container) {
      display: block !important;
      position: static !important;
      z-index: auto !important;
    }

    :global(.print-page) {
      position: relative !important;
      display: block !important;
      width: 210mm !important;
      height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      page-break-after: always !important;
      page-break-inside: avoid !important;
      background: white !important;
      box-sizing: border-box !important;
    }

    :global(.print-page:last-child) {
      page-break-after: auto !important;
    }
  }
</style>
