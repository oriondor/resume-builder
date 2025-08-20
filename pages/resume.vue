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
  /* Printable rules */
  @media print {
    @page {
      size: A4;
      /* margin: 12mm; */
    } /* You control print margins here */
    html,
    body {
      margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      box-shadow: none;
      margin: 0;
      padding: 0;
    }
    .page > .content {
      padding: 0;
      margin: 0;
    }
    .page-break {
      break-after: page;
      page-break-after: always;
    }
    .no-print {
      display: none;
    }
  }
</style>
