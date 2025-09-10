<script setup lang="ts">
  import type { InterestItem, Resume } from "~/types/resume";
  import { type TagStyle } from "~/types/tags";

  const resume = defineModel<Resume>("resume", { required: true });

  const { tags: options, createTag, refresh } = useTags("interests");
  refresh();

  async function createNewInterest(name: string) {
    const newInterest = await createTag(name);
    resume.value.interests.push(newInterest as InterestItem);
    refresh();
  }

  const variant = ref<TagStyle>("neutral");
</script>

<template>
  <Section title="Interests">
    <template #content>
      <helper-selector
        v-model="variant"
        :options="['neutral', 'accent']"
        label="Select tag style"
      />
      <taggable-select
        v-model="resume.interests"
        :options
        field="id"
        option-name="name"
        label="Interests"
        :variant
        @tag="createNewInterest"
      />
    </template>
    <template #content-collapsed>
      <helper-tag
        v-for="interest in resume.interests"
        :key="interest.id"
        :text="interest.name"
        :variant
      />
    </template>
  </Section>
</template>
