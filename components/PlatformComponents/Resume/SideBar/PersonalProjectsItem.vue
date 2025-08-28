<script setup lang="ts">
  const modelValue = defineModel<PersonalProjectsItem>({ required: true });

  const dates = ref<[string, string | null]>([
    modelValue.value.startDate,
    modelValue.value.endDate,
  ]);

  watchEffect(() => {
    modelValue.value.startDate = dates.value[0];
    modelValue.value.endDate = dates.value[1];
  });
</script>

<template>
  <div class="personal-projects">
    <helper-textarea v-model="modelValue.title" />
    <helper-date-range-picker v-model:dates="dates" />
  </div>
</template>
