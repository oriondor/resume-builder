<script setup lang="ts">
  interface Props {
    type?: "primary" | "secondary" | "subdued";
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: "primary",
  });

  const { loading, disabled } = toRefs(props);

  const attrs = useAttrs();
  const slots = useSlots();

  const isIconOnly = computed(() => {
    const hasIcon = !!props.icon || !!slots.icon;
    const hasDefault = !!slots.default;
    return hasIcon && !hasDefault;
  });

  const emit = defineEmits<{
    (e: "click"): void;
  }>();

  function click() {
    if (loading.value || disabled.value) return;
    emit("click");
  }
</script>

<template>
  <helper-control-element>
    <button
      v-bind="attrs"
      :class="[type, 'gradient-hover', { 'icon-only': isIconOnly }]"
      @click="click"
    >
      <slot name="icon">
        <Icon v-if="icon" :name="icon" />
      </slot>
      <template v-if="loading">
        <helper-loading-spinner />
      </template>
      <template v-else>
        <slot />
      </template>
    </button>
  </helper-control-element>
</template>

<style lang="scss" scoped>
  button {
    width: 100%;
    background-color: var(--color-accent);
    color: var(--color-accent-ink);
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

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
