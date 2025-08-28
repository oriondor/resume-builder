<script setup lang="ts">
  const collapsed = ref(false);
  const modelValue = defineModel<EducationItem>({ required: true });
</script>

<template>
  <div class="education-item">
    <div class="collapse-icon" @click="collapsed = !collapsed">
      <Icon :name="collapsed ? 'ic:baseline-expand-more' : 'ic:baseline-expand-less'" />
    </div>

    <div class="info">
      <transition mode="out-in" name="fade-slide">
        <div v-if="!collapsed" class="expanded">
          <helper-input v-model="modelValue.institution" label="Institution name" />
          <helper-input v-model="modelValue.degree" label="Degree" />
          <helper-input v-model="modelValue.location" label="Location" />
          <helper-date-picker v-model:date="modelValue.dateFinished" month />
          <helper-textarea v-model="modelValue.description" label="Description" />
        </div>

        <div v-else class="collapsed">
          <view-text v-if="modelValue.institution" type="title">
            {{ modelValue.institution }}
          </view-text>
          <view-text v-else type="italics">Institution name</view-text>

          <view-text type="subtitle">{{ modelValue.degree }}</view-text>

          <view-text v-if="modelValue.location" type="italics">
            {{ modelValue.location }}
          </view-text>

          <view-dates :dates="{ start: modelValue.dateFinished }" month />
        </div>
      </transition>

      <div class="hr" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .education-item {
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
