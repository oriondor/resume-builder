<script setup lang="ts">
  const { resume, config } = useResume();
</script>

<template>
  <div class="builder">
    <side-bar :resume :config class="no-print" />
    <preview :resume :config />
  </div>
</template>

<style scoped>
  .builder {
    display: flex;
    gap: 1rem;
    height: 100vh;
    overflow: hidden;
    align-items: stretch;
  }
  .builder > * {
    min-height: 0;
    min-width: 0;
  }
</style>
<style>
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .container {
      overflow: hidden !important;
      height: auto;
    }

    .page {
      box-shadow: none !important;
      margin: 0 !important;
      width: auto;
      min-height: auto;
      break-after: page;
      page-break-after: always;
    }

    .page-source {
      display: none !important;
    }

    .no-print {
      display: none !important;
    }
  }
</style>
