<script setup lang="ts">
  interface Props {
    month?: boolean;
  }
  defineProps<Props>();

  const date = defineModel<string | null | undefined>("date", { required: true });
</script>

<template>
  <helper-control-element class="date-picker">
    <label class="date-picker-label">
      <input v-model="date" :type="month ? 'month' : 'date'" class="date-input" >
      <slot />
    </label>
  </helper-control-element>
</template>

<style scoped>
  .date-picker * {
    cursor: pointer;
  }

  .date-picker-label {
    display: inline-flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.9rem;
    color: var(--color-text);
  }

  /* Input base */
  .date-input {
    appearance: none;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    color: var(--color-text);
    font-size: 0.95rem;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  /* Hover + focus */
  .date-input:hover {
    border-color: var(--color-accent);
  }
  .date-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-soft);
    outline: none;
  }

  /* Disabled */
  .date-input:disabled {
    background-color: var(--color-surface);
    color: var(--color-muted);
    cursor: not-allowed;
  }

  /* Calendar icon (WebKit browsers like Chrome/Safari) */
  .date-input::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(36%) sepia(65%) saturate(325%) hue-rotate(180deg);
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  .date-input::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }
</style>
