<script setup lang="ts">
  export interface ResumeDate {
    start: string;
    end?: string | null; // undefined - mean single date, null - means "Present"
  }

  type ResumeDateRange = [string, string | null];

  interface Props {
    dates: ResumeDate | ResumeDateRange;
    month?: boolean; // Optional prop to indicate if the date should be displayed as month/year
    size?: "small" | "medium" | "large";
    type?: "text" | "title" | "subtitle" | "italics";
  }

  const props = withDefaults(defineProps<Props>(), {
    size: "small",
    type: "italics",
  });

  const { dates } = toRefs(props);

  // Ensure dates is always in correct {start: .., end: ..} format
  const correctedDates = computed(() => {
    if (Array.isArray(dates.value)) {
      return {
        start: dates.value[0],
        end: dates.value[1],
      };
    }
    return dates.value;
  });

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

  const startDate = computed(() => formatMonthYear(correctedDates.value.start));

  const endDate = computed(() => {
    if (correctedDates.value.end === undefined) return null;
    return correctedDates.value.end !== null
      ? formatMonthYear(correctedDates.value.end)
      : "Present";
  });
</script>

<template>
  <div class="view-date">
    <view-text :model-value="startDate" :type :size />
    <template v-if="endDate">
      <span> - </span>
      <view-text :model-value="endDate" :type :size />
    </template>
  </div>
</template>

<style scoped>
  .view-date * {
    display: inline;
  }
</style>
