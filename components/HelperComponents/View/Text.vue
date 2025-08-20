<script setup lang="ts">
  interface Props {
    type?: "text" | "title" | "subtitle" | "italics";
    size?: "small" | "medium" | "large" | "extra-large";
    uppercase?: boolean;
    icon?: string | null;
  }
  withDefaults(defineProps<Props>(), {
    type: "text",
    size: "medium",
    uppercase: false,
    icon: null,
  });
  const attrs = useAttrs();
  const modelValue = defineModel<string>();
</script>

<template>
  <div :class="[type, size, { uppercase }]" v-bind="attrs">
    <Icon v-if="icon" :name="icon" />
    <slot>
      {{ modelValue }}
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &.uppercase {
      text-transform: uppercase;
    }

    &.text {
      color: #333;
    }
    &.title {
      font-weight: bold;
      color: #111;
    }
    &.subtitle {
      font-weight: semi-bold;
      color: #222;
    }
    &.italics {
      font-style: italic;
      color: #444;
    }

    &.small {
      font-size: 0.75rem;
    }
    &.medium {
      font-size: 0.875rem;
    }
    &.large {
      font-size: 1.25rem;
    }
    &.extra-large {
      font-size: 1.75rem;
    }
  }
</style>
