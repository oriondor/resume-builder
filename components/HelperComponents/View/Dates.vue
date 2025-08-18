<script setup lang="ts">
  export interface ResumeDate {
    start: string;
    end?: string | null; // undefined - mean single date, null - means "Present"
  }
  interface Props {
    dates: ResumeDate;
    month?: boolean; // Optional prop to indicate if the date should be displayed as month/year
  }

  const props = defineProps<Props>();

  const { dates } = toRefs(props);

  function formatMonthYear(value: string) {
    if (!value) return "";
    if (!props.month)
      return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(value));
    return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
      new Date(value)
    );
  }

  const startDate = computed(() => formatMonthYear(dates.value.start));

  const endDate = computed(() => {
    if (dates.value.end === undefined) return null;
    return dates.value.end !== null ? formatMonthYear(dates.value.end) : "Present";
  });
</script>

<template>
  <span>{{ startDate }} {{ endDate ? `- ${endDate}` : "" }}</span>
</template>

<style scoped>
  span {
    font-style: italic;
  }
</style>
