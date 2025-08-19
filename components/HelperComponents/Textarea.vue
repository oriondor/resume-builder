<script setup lang="ts">
  const attrs = useAttrs();
  defineEmits<{
    (e: "input", value: string): void;
  }>();

  const text = defineModel<string>({ default: "" });
</script>

<template>
  <helper-control-element>
    <textarea v-bind="attrs" v-model="text" rows="4" class="textarea" />
  </helper-control-element>
</template>

<style lang="scss" scoped>
  .textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-size: 1rem;
    line-height: 1.4;
    color: var(--color-text);
    background-color: var(--color-bg);
    box-sizing: border-box;
    resize: vertical; /* Let user resize vertically only */
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: var(--color-muted);
    }

    &:hover {
      border-color: var(--color-accent);
    }

    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px var(--color-accent-soft);
      outline: none;
    }

    &:disabled {
      background-color: var(--color-surface);
      color: var(--color-muted);
      cursor: not-allowed;
    }
  }
</style>
