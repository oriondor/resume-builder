<script lang="ts" setup>
  const {
    resume,
    addEducation,
    addExperience,
    addProject,
    addLanguage,
    sortedListByDate,
    removeItem,
  } = useResume();

  const phones = computed({
    get: () => resume.value.contact.phones.join(", "),
    set(value: string) {
      resume.value.contact.phones = value.split(",").map((phone) => phone.trim());
    },
  });

  const availableSkills = [
    "Django",
    "Docker",
    "websocket",
    "Elasticsearch",
    "Celery",
    "Unix",
    "Git",
    "Python",
    "JavaScript",
    "TypeScript",
    "Vue.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "REST API",
  ];

  resume.value.skills = [...availableSkills];

  const availableInterests = ["Traveling", "Cooking", "Scuba diving", "Skiing", "Crypto"];

  resume.value.interests = [...availableInterests];
</script>

<template>
  <client-only>
    <div class="sidebar">
      <select-theme />
      <helper-input v-model="resume.fullName" label="Full name" />
      <helper-input v-model="resume.title" label="Title" />
      <helper-input v-model="resume.shortSentence" label="Short sentence about yourself" />
      <helper-input v-model="resume.contact.email" label="Email" />
      <helper-input v-model="phones" label="Phones" />
      <helper-input v-model="resume.contact.address" label="Address" />
      <helper-textarea v-model="resume.summary" label="Summary" />
      <div class="hr" />
      <view-text type="title" size="extra-large" class="title-item"> Work experience </view-text>
      <experience-item
        v-for="(item, index) in sortedListByDate(resume.experience).value"
        :key="item.index"
        v-model="resume.experience[resume.experience.indexOf(item)] as ExperienceItem"
        @remove="removeItem(resume.experience, item.index)"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add experience"
        size="small"
        @click="addExperience"
      />
      <div class="hr" />
      <view-text type="title" size="extra-large"> Education</view-text>
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
      <div class="hr" />
      <view-text type="title" size="extra-large"> Skills </view-text>
      <taggable-select v-model="resume.skills" :options="availableSkills" />
      <div class="hr" />
      <view-text type="title" size="extra-large"> Personal projects </view-text>
      <personal-projects-item
        v-for="(project, index) in sortedListByDate(resume.personalProjects).value"
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
      <div class="hr" />
      <view-text type="title" size="extra-large"> Languages </view-text>
      <languages-item
        v-for="(language, index) in resume.languages"
        :key="language.index"
        v-model="resume.languages[index]"
      />
      <helper-dashed-container
        icon="material-symbols:add-rounded"
        text="Add language"
        size="small"
        @click="addLanguage"
      />
      <view-text type="title" size="extra-large"> Interests </view-text>
      <taggable-select v-model="resume.interests" :options="availableInterests" />
    </div>
  </client-only>
</template>

<style lang="css" scoped>
  .sidebar {
    overflow: auto;
    max-height: 100vh;
    max-width: 40%;
    padding: 1rem;
  }
  .title-item {
    margin-block: 1rem;
  }
</style>
