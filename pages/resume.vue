<script setup lang="ts">
  //   const { resume } = useResume();
</script>

<template>
  <div class="builder">
    <side-bar class="no-print" />
    <preview />
  </div>
</template>

<style scoped>
  .builder {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    max-height: 100vh;
    height: 100vh;
    overflow: hidden;
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
      display: none;
    }
  }
</style>
