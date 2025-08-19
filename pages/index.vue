<script setup lang="ts">
  import { useOpenAi } from "~/composables/useOpenAi";

  const { uploadResume } = useOpenAi();
  const file = ref<File | null>(null);

  function processFile() {
    if (!file.value) return;
    uploadResume(file.value);
  }
</script>
<template>
  <div class="container">
    <h3>Upload your old resume or create a new one with custom template</h3>
    <file-upload v-model:file="file" />
    <helper-button v-if="file" @click="processFile">Process selected file</helper-button>
    or
    <helper-button>Create from scratch</helper-button>
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
