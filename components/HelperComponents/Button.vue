<script setup lang="ts">
  interface Props {
    type?: "primary" | "secondary" | "subdued";
    icon?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: "primary",
  });

  const attrs = useAttrs();
  const slots = useSlots();

  const isIconOnly = computed(() => {
    const hasIcon = !!props.icon || !!slots.icon;
    const hasDefault = !!slots.default;
    return hasIcon && !hasDefault;
  });

  defineEmits<{
    (e: "click"): void;
  }>();
</script>

<template>
  <helper-control-element>
    <button
      v-bind="attrs"
      :class="[type, 'gradient-hover', { 'icon-only': isIconOnly }]"
      @click="$emit('click')"
    >
      <slot name="icon">
        <Icon v-if="icon" :name="icon" />
      </slot>
      <slot />
    </button>
  </helper-control-element>
</template>

<style lang="scss" scoped>
  button {
    background-color: var(--color-accent);
    color: var(--color-accent-ink);
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    &.icon-only {
      padding: 0;
      border-radius: 50%;
    }

    &:disabled {
      background-color: var(--color-accent-soft);
      color: var(--color-muted);
      border-color: var(--color-accent-border);
      cursor: not-allowed;
    }

    &.primary {
      --gh-color: var(--color-accent);
    }

    &.secondary {
      background-color: transparent;
      border: 1px solid var(--color-accent);
      color: var(--color-accent);
    }

    &.subdued {
      background-color: transparent;
      color: var(--color-accent);
    }
  }
</style>
