<script setup lang="ts"></script>
<template>
  <div class="container">
    <h3>Upload your old resume or create a new one with custom template</h3>
    <file-upload />
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
