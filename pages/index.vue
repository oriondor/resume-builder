<script setup lang="ts">
  import type { AIResume } from "~/types/resume";

  const { uploadResume } = useOpenAi();
  const { resume } = useResume();
  const { processResume } = useResumeProcessing();

  const file = ref<File | null>(null);

  const loading = ref(false);

  async function processFile() {
    if (!file.value) return;
    loading.value = true;
    const expectedResume = await uploadResume(file.value);
    loading.value = false;
    if (expectedResume.error) {
      // ideally before it should be marked as non-resume file
      return;
    }
    resume.value = await processResume(expectedResume.data as AIResume);
    navigateTo("/resume");
  }
</script>
<template>
  <div class="container">
    <h3>Upload your old resume or create a new one with custom template</h3>
    <file-upload v-model:file="file" />
    <helper-button v-if="file" :loading icon="ix:maintenance" @click="processFile">
      Process selected file
    </helper-button>
    or
    <helper-button
      :loading
      icon="material-symbols:add-chart-outline"
      @click="navigateTo('/resume')"
    >
      Create from scratch
    </helper-button>
    <helper-button type="subdued" @click="navigateTo('/demo')">Go to demo</helper-button>
  </div>
</template>

<style scoped>
  .container {
    max-width: 40rem;
    margin: auto;
    text-align: center;
  }
  .file-upload {
    width: 100%;
  }
</style>
