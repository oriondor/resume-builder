<script setup lang="ts">
  const text = ref("");
  const singleDate = ref("");
  const dateRange = ref<["", ""]>(["", ""]);
  const checkboxValue = ref(false);
  const selectedOptions = ref<string[]>([]);
  const selectedOption = ref<string | null>(null);
</script>

<template>
  <div>
    <helper-button> Click Me </helper-button>
    <helper-input v-model="text" placeholder="Enter text" />
    <helper-textarea v-model="text" placeholder="Enter more text" />
    <p>{{ text }}</p>
    <helper-date-picker v-model:date="singleDate" />
    <view-dates :dates="{ start: singleDate }" />
    <helper-date-range-picker v-model:dates="dateRange" month />
    <view-dates :dates="{ start: dateRange[0], end: dateRange[1] }" month />
    <view-text>Some text here</view-text>
    <view-heading text="This is a heading" />
    <helper-check-box v-model="checkboxValue"> Checkbox text </helper-check-box>
    <taggable-select
      v-model="selectedOptions"
      :options="[
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 10',
      ]"
    />
    <select-theme />
    <helper-selector v-model="selectedOption" :options="['Option 1', 'Option 2', 'Option 3']" />
  </div>
</template>
