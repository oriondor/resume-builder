<script setup lang="ts">
  import type { Resume, SkillItem } from "~/types/resume";
  import { type TagStyle } from "~/types/tags";

  const resume = defineModel<Resume>("resume", { required: true });

  const { tags: options, createTag, refresh } = useTags("skills");
  refresh();

  async function createNewSkill(name: string) {
    const newSkill = await createTag(name);
    resume.value.skills.push(newSkill as SkillItem);
    refresh();
  }

  const variant = ref<TagStyle>("neutral");
</script>

<template>
  <Section title="Skills">
    <template #content>
      <helper-selector
        v-model="variant"
        :options="['neutral', 'accent']"
        label="Select tag style"
      />
      <taggable-select
        v-model="resume.skills"
        :options
        field="id"
        option-name="name"
        label="Skills"
        :variant
        @tag="createNewSkill"
      />
    </template>
    <template #content-collapsed>
      <helper-tag v-for="skill in resume.skills" :key="skill.id" :text="skill.name" :variant />
    </template>
  </Section>
</template>
