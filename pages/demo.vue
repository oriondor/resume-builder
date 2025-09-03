<script setup lang="ts">
  const text = ref("");
  const singleDate = ref("");
  const dateRange = ref<["", ""]>(["", ""]);
  const checkboxValue = ref(false);

  const selectedOptions = ref<SkillItem[]>([]);
  const selectedOption = ref<SkillItem | null>(null);

  const { data: options, refresh } = await useFetch<SkillItem[]>("/api/skills", {
    default: () => [],
  });

  async function createSkill(skillName: string) {
    console.log(skillName);

    const newSkill = await $fetch("/api/skills", {
      method: "POST",
      body: { name: skillName },
    });
    selectedOptions.value.push(newSkill);
    refresh();
  }
</script>

<template>
  <div class="column">
    <view-text type="title" size="extra-large">This is extra-large title</view-text>
    <view-text type="title" size="large">This is large title</view-text>
    <view-text type="title" size="medium">This is medium title</view-text>
    <view-text type="title" size="small">This is small title</view-text>
    <view-text>Medium text is a defualt text size</view-text>
    <view-text type="subtitle">Medium subtitle</view-text>
    <view-text type="italics">Medium italics</view-text>
    <view-separator />
    <select-theme label="Set theme" />
    <select-mode label="Set mode" />
    <div class="flex">
      <helper-button> Click Me Primary </helper-button>
      <helper-button type="secondary"> Click Me Secondary </helper-button>
      <helper-button type="subdued"> Click Me Subdued </helper-button>
    </div>
    <helper-input v-model="text" placeholder="Enter text" />
    <helper-textarea v-model="text" placeholder="Enter more text" />
    <p>{{ text }}</p>
    <view-separator />
    <helper-date-picker v-model:date="singleDate" />
    <view-dates :dates="{ start: singleDate }" />
    <helper-date-range-picker v-model:dates="dateRange" month />
    <view-separator />
    <view-dates :dates="{ start: dateRange[0], end: dateRange[1] }" month />
    <view-separator />
    <view-separator />
    <helper-check-box v-model="checkboxValue"> Checkbox text </helper-check-box>
    <view-separator />
    <taggable-select
      v-model="selectedOptions"
      :options
      field="id"
      option-name="name"
      label="Test skills"
      @tag="createSkill"
    />
    <helper-selector v-model="selectedOption" :options field="id" option-name="name" />
  </div>
</template>

<style scoped>
  /* .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
  .flex {
    display: flex;
  }
</style>
