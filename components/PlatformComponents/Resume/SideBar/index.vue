<script lang="ts" setup>
  const { resume, addEducation, addExperience } = useResume();

  const phones = computed({
    get: () => resume.value.contact.phones.join(", "),
    set(value: string) {
      resume.value.contact.phones = value.split(",").map((phone) => phone.trim());
    },
  });
</script>

<template>
  <div class="sidebar">
    <select-theme />
    <helper-input v-model="resume.fullName" label="Full name" />
    <helper-input v-model="resume.title" label="Title" />
    <helper-input v-model="resume.shortSentence" label="Short sentence about yourself" />
    <helper-input v-model="resume.contact.email" label="Email" />
    <helper-input v-model="phones" label="Phones" />
    <helper-input v-model="resume.contact.address" label="Address" />
    <div class="hr" />
    <view-text type="title" size="extra-large" class="title-item"> Work experience </view-text>
    <client-only>
      <experience-item
        v-for="(item, index) in resume.experience"
        :key="item.index"
        v-model="resume.experience[index] as ExperienceItem"
      />
    </client-only>
    <helper-dashed-container
      icon="material-symbols:add-rounded"
      text="Add experience"
      size="small"
      @click="addExperience"
    />
    <div class="hr" />
    <view-text type="title" size="extra-large"> Education </view-text>
    <div v-for="(item, index) in resume.education" :key="item.index" class="education-item">
      <helper-input v-model="item.institution" label="Institution name" />
      <helper-input v-model="item.degree" label="Degree" />
      <div class="hr" />
    </div>
    <helper-dashed-container
      icon="material-symbols:add-rounded"
      text="Add education"
      size="small"
      @click="addEducation"
    />
  </div>
</template>

<style lang="css" scoped>
  .sidebar {
    overflow: auto;
    max-height: 100vh;
  }
  .title-item {
    margin-block: 1rem;
  }
</style>
