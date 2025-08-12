<script setup lang="ts">
  export interface ResumeDate {
    start: string;
    end: string | null;
  }
  interface Props {
    date: ResumeDate;
  }

  const props = defineProps<Props>();

  const { date } = toRefs(props);

  const formatMonthYear = (value: string) =>
    new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(value));

  const startDate = computed(() => formatMonthYear(date.value.start));
  const endDate = computed(() => (date.value.end ? formatMonthYear(date.value.end) : "Present"));
</script>

<template>
  <span>{{ startDate }} - {{ endDate }}</span>
</template>

<style scoped>
  span {
    font-style: italic;
  }
</style>
