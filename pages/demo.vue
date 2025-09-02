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
  <div>
    <select-theme label="Set theme" />
    <select-mode label="Set mode" />
    <helper-button> Click Me </helper-button>
    <helper-input v-model="text" placeholder="Enter text" />
    <helper-textarea v-model="text" placeholder="Enter more text" />
    <p>{{ text }}</p>
    <hr />
    <helper-date-picker v-model:date="singleDate" />
    <view-dates :dates="{ start: singleDate }" />
    <helper-date-range-picker v-model:dates="dateRange" month />
    <hr />
    <view-dates :dates="{ start: dateRange[0], end: dateRange[1] }" month />
    <hr />
    <view-text>Some text here</view-text>
    <hr />
    <view-text type="title" size="large">This is a heading</view-text>
    <hr />
    <helper-check-box v-model="checkboxValue"> Checkbox text </helper-check-box>
    <hr />
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
