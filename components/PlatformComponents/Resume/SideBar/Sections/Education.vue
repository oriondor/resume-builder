<script setup lang="ts">
  import type { EducationItem, Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const { removeItem } = useResume();

  const defaultEducation = {
    institution: "",
    degree: "",
    year: "",
    dateFinished: "",
    location: "",
    description: "",
    index: 0,
  };

  function addEducation() {
    resume.value.education.push({ ...defaultEducation, index: resume.value.education.length });
  }
</script>

<template>
  <Section title="Education">
    <template #content>
      <education-item
        v-for="(item, index) in resume.education"
        :key="item.index"
        v-model="resume.education[index] as EducationItem"
        @remove="removeItem(resume.education, item.index)"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add education"
        size="small"
        @click="addEducation"
      />
    </template>
    <template #content-collapsed>
      <view-text v-for="(item, index) in resume.education" :key="item.index">
        - {{ item.institution }}
      </view-text>
    </template>
  </Section>
</template>
