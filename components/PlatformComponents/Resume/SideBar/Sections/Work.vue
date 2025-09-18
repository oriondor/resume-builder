<script setup lang="ts">
  import type { ExperienceItem, Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const { removeItem } = useResume();

  const defaultExperience = {
    company: "",
    role: "",
    companyDescription: undefined,
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    index: 0,
  };

  function addExperience() {
    resume.value.experience.push({ ...defaultExperience, index: resume.value.experience.length });
  }
</script>

<template>
  <Section title="Work experience">
    <template #content>
      <experience-item
        v-for="(item, index) in resume.experience"
        :key="item.index"
        v-model="resume.experience[index] as ExperienceItem"
        @remove="removeItem(resume.experience, item.index)"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add experience"
        size="small"
        @click="addExperience"
      />
    </template>
    <template #content-collapsed>
      <view-text v-for="(item, index) in resume.experience" :key="item.index">
        - {{ item.company }}
      </view-text>
    </template>
  </Section>
</template>
