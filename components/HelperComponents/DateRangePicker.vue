<script setup lang="ts">
  interface Props {
    month?: boolean;
  }
  defineProps<Props>();

  const dates = defineModel<[string, string | null]>("dates", { required: true });

  const present = ref(false);

  watch(present, (value) => {
    if (value) {
      dates.value[1] = null; // Set end date to null when present is checked
    } else {
      dates.value[1] = ""; // Reset end date when present is unchecked
    }
  });

  const dateIsCorrect = computed(() => {
    // Ensure that the start date is before the end date
    if (dates.value[0] && dates.value[1]) {
      return new Date(dates.value[0]) <= new Date(dates.value[1]);
    }
    return true; // If one of the dates is empty, consider it correct
  });

  defineExpose({ dateIsCorrect });
</script>
<template>
  <helper-control-element>
    <div class="date-range-picker">
      <helper-date-picker v-model:date="dates[0]" :month />
      <helper-date-picker v-model:date="dates[1]" :month />
      <helper-check-box v-model="present"> Present </helper-check-box>
    </div>
  </helper-control-element>
  <div v-if="!dateIsCorrect" class="error-message">
    <p>Start date must be before end date.</p>
  </div>
</template>

<style lang="scss" scoped>
  .date-range-picker {
    display: flex;
    align-items: center;

    & > * {
      min-width: 0;
    }

    .date-picker {
      margin-inline: 0;
    }
    .date-picker:first-child {
      margin-inline-end: 0.5rem;
    }
    .checkbox {
      margin-inline-start: 0.25rem;
    }
  }
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
</style>
