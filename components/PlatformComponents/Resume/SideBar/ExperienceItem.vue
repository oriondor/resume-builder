<script setup lang="ts">
  const collapsed = ref(false);
  const modelValue = defineModel<ExperienceItem>({ required: true });

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
  <div class="experience-item">
    <div class="collapse-icon" @click="collapsed = !collapsed">
      <Icon :name="collapsed ? 'ic:baseline-expand-more' : 'ic:baseline-expand-less'" />
    </div>
    <div class="info">
      <transition mode="out-in" name="fade-slide">
        <div v-if="!collapsed" class="expanded">
          <helper-input v-model="modelValue.company" label="Company name" />
          <helper-input v-model="modelValue.role" label="Job title" />
          <helper-input v-model="modelValue.location" label="Location" />
          <helper-date-range-picker v-model:dates="dates" month />
          <helper-input v-model="modelValue.companyDescription" label="What this company does" />
          <helper-textarea v-model="modelValue.description" label="Description" />
        </div>
        <div v-else class="collapsed">
          <view-text v-if="modelValue.company" type="title">{{ modelValue.company }}</view-text>
          <view-text v-else type="italics">Company name</view-text>
          <view-text type="subtitle">{{ modelValue.role }}</view-text>
          <view-dates :dates="dates" month />
        </div>
      </transition>
      <div class="hr" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .experience-item {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    gap: 1rem;
    width: 100%;
  }

  .info {
    flex-grow: 1;
  }
</style>
