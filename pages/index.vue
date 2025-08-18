<script setup lang="ts"></script>
<template>
  <div>
    <h3>Upload your old resume or create a new one with custom template</h3>
    <helper-dashed-container
      icon="material-symbols-light:upload-file-outline"
      text="Drop your file here"
    />
    <helper-button type="secondary">Upload resume</helper-button>
    <helper-button>Create from scratch</helper-button>
    <helper-button type="subdued" @click="navigateTo('/demo')">Go to demo</helper-button>
  </div>
</template>
