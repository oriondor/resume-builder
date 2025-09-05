<script setup lang="ts">
  import type { Resume } from "~/types/resume";

  const resume = defineModel<Resume>("resume", { required: true });

  const phones = computed({
    get: () => resume.value.contact.phones.join(", "),
    set(value: string) {
      resume.value.contact.phones = value.split(",").map((phone) => phone.trim());
    },
  });
</script>

<template>
  <Section title="Personal information">
    <template #content>
      <helper-input v-model="resume.fullName" label="Full name" />
      <helper-input v-model="resume.title" label="Title" />
      <helper-input v-model="resume.shortSentence" label="Short sentence about yourself" />
      <helper-input v-model="resume.contact.email" label="Email" />
      <helper-input v-model="phones" label="Phones" />
      <helper-input v-model="resume.contact.address" label="Address" />
      <helper-textarea v-model="resume.summary" label="Summary" />
    </template>
    <template #content-collapsed>
      <view-text>{{ resume.fullName }}</view-text>
      <view-text type="subtitle">{{ resume.title }}</view-text>
      <view-text type="italics" size="small">{{ resume.contact.email }}</view-text>
      <view-text type="italics" size="small">{{ phones }}</view-text>
      <view-text type="italics" size="small">{{ resume.contact.address }}</view-text>
    </template>
  </Section>
</template>
