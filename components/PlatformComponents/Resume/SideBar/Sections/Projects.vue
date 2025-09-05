<script setup lang="ts">
  import type { PersonalProjectsItem, Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const { removeItem } = useResume();

  const defaultProject = {
    title: "",
    startDate: "",
    endDate: "",
    index: 0,
  };

  function addProject() {
    resume.value.personalProjects.push({
      ...defaultProject,
      index: resume.value.personalProjects.length,
    });
  }
</script>

<template>
  <Section title="Personal projects">
    <template #content>
      <personal-projects-item
        v-for="(project, index) in resume.personalProjects"
        :key="project.index"
        v-model="resume.personalProjects[resume.personalProjects.indexOf(project)]"
        @remove="removeItem(resume.personalProjects, project.index)"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add project"
        size="small"
        @click="addProject"
      />
    </template>
    <template #content-collapsed>
      <view-text v-for="(item, index) in resume.personalProjects" :key="item.index">
        - {{ item.title }}
      </view-text>
    </template>
  </Section>
</template>
