<script setup lang="ts">
  import type { ResumeDate } from "~/components/HelperComponents/View/Dates.vue";
  import type { SkillItem } from "~/types/resume";

  const text = ref("");
  const singleDate = ref("");
  const dateRange = ref<ResumeDate>({
    startDate: "",
    endDate: "",
  });
  const checkboxValue = ref(false);

  const selectedOptions = ref<SkillItem[]>([]);
  const selectedOption = ref<SkillItem | null>(null);

  const { tags: options, createTag, refresh } = useTags("skills");

  async function createNewSkill(name: string) {
    const newSkill = await createTag(name);
    selectedOptions.value.push(newSkill as SkillItem);
    refresh();
  }

  const { modalProps, openModal } = useModal();
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
    <view-dates :dates="dateRange" month />
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
      @tag="createNewSkill"
    />
    <helper-selector
      v-model="selectedOption"
      :options
      field="id"
      option-name="name"
      label="Single select skill"
    />
    <view-separator />
    <div class="flex fancy-check-boxes">
      <helper-check-box checked-icon="noto:goose" />
      <helper-check-box checked-icon="icon-park-outline:elephant" />
      <helper-check-box unchecked-icon="pepicons-pencil:seedling-circle-filled" />
      <helper-check-box unchecked-icon="lucide-lab:elephant" checked-icon="mdi:elephant" />
    </div>
    <view-separator />
    <helper-empty-state
      title="No items found"
      description="Try adjusting your search or filters"
      size="small"
    />
    <view-separator />
    <helper-empty-state
      icon="material-symbols:folder-open-outline"
      title="No projects yet"
      description="Create your first project to get started"
    />
    <view-separator />
    <helper-empty-state
      icon="material-symbols:cloud-off-outline"
      title="Connection lost"
      description="Please check your internet connection and try again"
      size="large"
    >
      <helper-button type="secondary"> Retry </helper-button>
    </helper-empty-state>
    <view-separator />
    <div class="flex justify-between">
      <helper-button @click="openModal()"> Open modal (no animation) </helper-button>
      <helper-button @click="openModal"> Open modal (animation) </helper-button>
    </div>
    <helper-modal v-bind="modalProps">Test modal</helper-modal>
  </div>
</template>

<style scoped>
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
</style>
