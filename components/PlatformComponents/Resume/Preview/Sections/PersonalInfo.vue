<script setup lang="ts">
  import type { Resume } from "~/types/resume";

  interface Props {
    resume: Resume;
  }

  const props = defineProps<Props>();
  const { resume } = toRefs(props);
</script>
<template>
  <div class="section main-info">
    <view-text v-model="resume.fullName" type="subtitle" size="extra-large" />
    <view-text v-model="resume.title" type="subtitle" />
    <view-text v-if="resume.shortSentence" v-model="resume.shortSentence" type="text" />
  </div>
  <div class="section contact">
    <a v-if="resume?.contact?.email" :href="`mailto:${resume.contact.email}`">
      <view-text v-model="resume.contact.email" type="text" icon="ic:baseline-email" />
    </a>
    <a v-for="(phone, index) in resume.contact.phones" :key="phone" :href="`tel:${phone}`">
      <view-text
        v-model="resume.contact.phones[index]"
        type="text"
        icon="material-symbols:call-outline-sharp"
      />
    </a>
    <view-text v-model="resume.contact.address" type="text" icon="material-symbols:pin-drop" />
  </div>
  <div class="summary">
    <view-text v-model="resume.summary" type="italics" size="small" />
  </div>
</template>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
  .main-info {
    padding: 9mm;
    padding-block-end: 5mm;
  }
  .contact {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-accent);
    .text {
      color: var(--color-accent-soft);
    }
  }
  .summary {
    padding: 4mm;
    padding-block-end: 0;
  }
</style>
