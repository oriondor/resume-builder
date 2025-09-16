<script setup lang="ts">
  const modelValue = defineModel<boolean>({ required: true });
</script>

<template>
  <helper-control-element class="checkbox">
    <label class="checkbox-label">
      <input v-model="modelValue" type="checkbox" class="checkbox-input" tabindex="-1" />
      <span class="checkbox-box" />
      <slot />
    </label>
  </helper-control-element>
</template>

<style scoped>
  :root {
    --box-size: 1rem;
  }

  .checkbox-label {
    position: relative;
    user-select: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .checkbox-input {
    position: absolute;
    inset: 0;
    width: var(--box-size);
    height: 1rem;
    margin: 0;
    opacity: 0;
  }

  .checkbox-box {
    width: var(--box-size);
    height: var(--box-size);
    border: 2px solid var(--color-border);
    border-radius: 4px;
    background-color: var(--color-bg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  .checkbox-input:checked + .checkbox-box {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }

  .checkbox-box::after {
    content: "";
    width: 0.3rem;
    height: 0.6rem;
    position: relative;
    bottom: 0.1rem;
  }

  .checkbox-input:checked + .checkbox-box::after {
    border: solid var(--color-accent-ink);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox-label:hover .checkbox-box {
    border-color: var(--color-accent);
  }

  .checkbox-input:focus-visible + .checkbox-box {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
</style>
